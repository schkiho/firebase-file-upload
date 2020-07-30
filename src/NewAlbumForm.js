import React, { useState, Fragment } from "react";
import firebase from "./fbConfig";

const db = firebase.firestore();

const NewAlbumForm = () => {
  const [albumName, setAlbumName] = useState("");

  const onAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const onAlbumCreate = () => {
    if (!albumName) {
      return;
    }
    db.collection("albums").doc(albumName).set({
      name: albumName,
    });
    setAlbumName("");
  };

  return (
    <Fragment>
      <input
        value={albumName}
        type="text"
        className="mr-2"
        onChange={onAlbumNameChange}
      />
      <button className="btn btn-success" onClick={onAlbumCreate}>
        Create album
      </button>
    </Fragment>
  );
};

export default NewAlbumForm;
