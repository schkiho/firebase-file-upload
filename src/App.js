import React, { useState } from "react";
import "./App.css";
import firebase from "./fbConfig";
import Gallery from "./Gallery";

const App = () => {
  const db = firebase.firestore();
  const storage = firebase.storage();

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

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
        setProgress(progress);
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
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="my-4">
              <progress value={progress} max="100" className="my-4" />
              <br />
              <input
                type="file"
                onChange={handleFlyerChange}
                className="my-4"
              />
              <br />
              <button
                type="button"
                onClick={handleFlyerUpload}
                className="my-4"
              >
                Upload
              </button>
            </div>
            <img
              src={url || "http://via.placeholder.com/300x200"}
              alt="flyer"
              style={{ width: "300px", height: "200px" }}
              className="my-4"
            />
          </div>
          <div className="col">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
