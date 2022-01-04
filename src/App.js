import React, { useState, useEffect } from "react";

import { Credentials } from "./Credentials";
import axios from "axios";
import CardArtist from "./CardArtist";
import "./index.css";
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const spotify = Credentials();
  console.log("RENDERING APP.JS");

  const [artist, setArtist] = useState("");
  const [searchArtist, setSearchArtist] = useState([]);

  const data = [
    { value: 1, name: "A" },
    { value: 2, name: "B" },
    { value: 3, name: "C" },
  ];

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });
  const [trackDetail, setTrackDetail] = useState(null);

  const newLocal = "https://accounts.spotify.com/api/token";
  useEffect(() => {
    axios(newLocal, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items,
        });
      });
    });
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  const genreChanged = (val) => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });

    axios(
      `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });
    });

    console.log(val);
  };

  const playlistChanged = (val) => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
    });
  };

  const buttonClicked = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: artist,
        type: "artist",
      },
    });
    setSearchArtist(data.artists.items);
    console.log(data.artists.items);
    if (data.artists.items.length === 0) {
      setNewMessage(true);
      return;
    }
    setNewMessage(false);
  };

  const listboxClicked = (val) => {
    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter((t) => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
  };

  return (
    <div className="container">
      <h1>SpotifyApp</h1>
      <form onSubmit={buttonClicked} className="">
        <input
          type="text"
          className="form-control "
          placeholder="Busca algo"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        ></input>
        <button type="submit" className="btn btn-success col-sm-12">
          Search
        </button>
      </form>
      <div className="row ">
        {searchArtist.length > 0 && (
          <CardArtist
            artist={searchArtist}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        {newMessage && <h3>No Existe el artista</h3>}
      </div>
    </div>
  );
};

export default App;
