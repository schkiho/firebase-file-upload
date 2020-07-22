import React, { useState } from "react";
import "./App.css";
import firebase from "./fbConfig";
import Gallery from "./Gallery";

function App() {
  const db = firebase.firestore();
  const storage = firebase.storage();

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleFlyerChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage({ image: file });
  };

  const handleFlyerUpload = () => {
    let bucketName = "flyer";
    let file = image;
    let storageRef = storage.ref(`${bucketName}/${file.image.name}`);
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
        storage
          .ref(`${bucketName}`)
          .child(file.image.name)
          .getDownloadURL()
          .then((url) => {
            const flyer = {
              name: file.image.name,
              url: url,
              added: new Date(),
            };
            db.collection("flyer").add(flyer);
            setUrl(url);
          });
      }
    );
  };

  return (
    <div className="App">
      <h1>Upload</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="flyer-upload my-4">
              <input type="file" onChange={handleFlyerChange} />
              <button type="button" onClick={handleFlyerUpload}>
                Submit
              </button>
            </div>
            <img
              src={url}
              alt="Hallo"
              style={{ width: "300px", height: "200px" }}
            />
          </div>
          <Gallery />
        </div>
      </div>
    </div>
  );
}

export default App;
