import React, { useState, Fragment, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import NewPhoto from "./NewPhoto";
import firebase from "./fbConfig";

const db = firebase.firestore();

const Album = () => {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");

  const match = useRouteMatch("/:album");
  const { album } = match.params;

  useEffect(() => {
    const unmount = db
      .collection("albums")
      .doc(album)
      .onSnapshot((doc) => {
        setImages(doc.data().images || []);
        setAlbumName(doc.data().name);
      });
    return unmount;
  }, [album]);

  return (
    <Fragment>
      <div className="container d-flex  justify-content-center">
        <section>
          <header className="text-center">
            <h1>{albumName}</h1>
            <p>
              Go to the <Link to="/">Homepage</Link>{" "}
            </p>
          </header>
          {images.map((image) => (
            <aside key={image.name}>
              <img
                src={image.url}
                alt="album"
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{image.name}</h3>
            </aside>
          ))}
          <NewPhoto currentAlbum={album} />
        </section>
      </div>
    </Fragment>
  );
};

export default Album;
