import React, { useState } from "react";
import Modal from "./Modal";

const PosterArtist = ({ artist }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="posterContainer">
        <div className="posterImage">
          <img src={artist.images[0]?.url} alt="" />
        </div>
        <p>{artist.name}</p>
        <button
          className="btn-primary"
          onClick={() => setShowModal(!showModal)}
        >
          ver más...
        </button>
        {showModal && (
          <Modal
            artist={artist}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  );
};

export default PosterArtist;
