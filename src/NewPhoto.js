import React, { Fragment, useState } from "react";
import firebase from "./fbConfig";
import fb from "firebase/app";

const db = firebase.firestore();
const storage = firebase.storage();

const NewPhoto = ({ currentAlbum }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    db.collection("albums")
      .doc(currentAlbum)
      .update({
        images: fb.firestore.FieldValue.arrayUnion({
          name: file.name,
          url: await fileRef.getDownloadURL(),
        }),
      });
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
