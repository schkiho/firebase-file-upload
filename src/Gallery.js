import React, { useState } from "react";
import firebase from "./fbConfig";

const Gallery = () => {
  const db = firebase.firestore();
  const storage = firebase.storage();

  // const gName = "HoHo";
  // const imgArr = [
  //   {
  //     name: "imgArr.png",
  //     url: "img-url",
  //   },
  //   {
  //     name: "imgArr.png",
  //     url: "img-url",
  //   },
  //   {
  //     name: "imgArr.png",
  //     url: "img-url",
  //   },
  // ];

  const [files, setFiles] = useState([]);
  const [galleryName, setGalleryName] = useState("");

  const handleGalleryName = (e) => {
    e.preventDefault();
    const name = e.target.value;
    setGalleryName(name);
  };

  const handleGalleryChange = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      setFiles((prevState) => [...prevState, newFile]);
    }
  };

  console.log(files);
  console.log(galleryName);

  const handleGalleryUpload = () => {
    for (let i = 0; i < files.length; i++) {
      const uploadTask = storage
        .ref(`${galleryName}/${files[i].name}`)
        .put(files[i]);
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
          let pics = [];

          storage
            .ref(`${galleryName}`)
            .child(files[i].name)
            .getDownloadURL()
            .then((url) => {
              // files.map((file) => {
              //   let photo = {
              //     name: file.name,
              //     url: url,
              //   };
              //   console.log("photo", photo);
              //   pics.push(photo);
              //   console.log("pic", pics);
              // });
              // const hla = pics;
              const gallery = {
                name: galleryName,
                images: [
                  {
                    name: files[i].name,
                    url: url,
                  },
                ],
                added: new Date(),
              };
              db.collection("galleries").add(gallery);
              //console.log(url);
            });
        }
      );
    }
  };

  return (
    <div className="col">
      <div className="gallery-upload my-4">
        <input type="text" id="gallery-name" onChange={handleGalleryName} />
        <input type="file" multiple onChange={handleGalleryChange} />
        <button type="button" onClick={handleGalleryUpload}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Gallery;

// let test = {
//   name: gName,
//   arr: imgArr,
// };
// db.collection("hoho").add(test);
