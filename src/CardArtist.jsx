import React, { useState } from "react";
import PosterArtist from "./PosterArtist";

const CardArtist = ({ artist, showModal, setShowModal }) => {
  return (
    <div className="listArtist">
      {artist.map((artist) => (
        <PosterArtist
          artist={artist}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ))}
    </div>
  );
};

export default CardArtist;
