import React, { useState } from "react";
import "./App.css";
import firebase from "./fbConfig";

function App() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage({ image: file });
  };

  const handleUpload = () => {
    let bucketName = "images";
    let file = image;
    let storageRef = firebase.storage().ref(`${bucketName}/${file.image.name}`);
    let uploadTask = storageRef.put(file.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(file.image.name)
          .getDownloadURL()
          .then((url) => {
            const flyer = {
              name: file.image.name,
              url: url,
              added: new Date(),
            };
            firebase.firestore().collection("parties").add(flyer);
          });
      }
    );
    if (image && url) {
      const db = firebase.firestore();
      db.collection("parties").add({ name: image.image.name, url: url });
    }
  };
  if (image) {
    console.log(image.image.name);
  }

  console.log(url);

  return (
    <div className="App">
      <h1>Upload</h1>
      <div className="upload-container my-4">
        <input type="file" onChange={handleChange} />
        <button type="button" onClick={handleUpload}>
          Submit
        </button>
      </div>
      <img src={url} alt="Hallo" style={{ width: "400px", height: "300px" }} />
    </div>
  );
}

export default App;
