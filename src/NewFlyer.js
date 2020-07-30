import React, { Fragment, useState } from "react";
import firebase from "./fbConfig";

const db = firebase.firestore();
const storage = firebase.storage();

const NewPhoto = ({ currentAlbum }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const storageRef = storage.ref("flyer");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const flyer = {
      name: file.name,
      url: await fileRef.getDownloadURL(),
      added: new Date(),
    };
    db.collection("flyer").add(flyer);
  };

  return (
    <Fragment>
      <input type="file" onChange={onFileChange} />
      <button className="btn btn-success" onClick={onUpload}>
        Upload image
      </button>
    </Fragment>
  );
};

export default NewPhoto;
