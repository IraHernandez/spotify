import React from "react";
import "./modal.css";

const Modal = ({ artist, showModal, setShowModal }) => {
  console.log(artist);

  return (
    <div className="containerModal">
      <h1 className="text-center">{artist.name}</h1>
      <hr />
      <div className="infoModal ">
        <ul>
          <li>Seguidores: {artist.followers.total}</li>
          <li>
            Géneros:
            <ul>
              {artist.genres.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </li>
          <li className="mb-4">Puntos de popularidad: {artist.popularity}</li>
        </ul>
        <a
          className="btn-primary"
          href={artist.external_urls.spotify}
          target="_blank"
        >
          Ir a su página de spotify
        </a>
        <button
          className="btn-green mt-4"
          onClick={() => setShowModal(!showModal)}
        >
          Cerrar &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
