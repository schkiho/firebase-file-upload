import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewAlbumForm from "./NewAlbumForm";
import NewFlyer from "./NewFlyer";
import Login from "./Login";
import firebase from "./fbConfig";

const auth = firebase.auth();

const Home = ({ albums, flyer }) => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.email);
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            {currentUser ? (
              <h3 className="text-center text-primary my-4">
                Logged in as {currentUser}
              </h3>
            ) : (
              <Login />
            )}

            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h1 className="text-center text-primary">Flyer Upload</h1>
            <section className="d-flex justify-content-around my-4">
              {flyer.map((item, index) => (
                <aside key={index}>
                  <img
                    src={item.url ? item.url : ""}
                    alt="item"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <h3 className="text-center text-primary">{item.name}</h3>
                </aside>
              ))}
            </section>
            <footer className="d-flex justify-content-center">
              <NewFlyer />
            </footer>
          </div>
          <div className="col-6">
            <h1 className="text-center text-primary">Album Upload</h1>
            <section className="d-flex justify-content-around my-4">
              {albums.map((album, index) => (
                <Link key={index} to={`/${album.id}`}>
                  <aside>
                    <img
                      src={album.images ? album.images[0].url : ""}
                      alt="album"
                      style={{ width: "200px", height: "200px" }}
                    />
                    <h3 className="text-center">{album.name}</h3>
                  </aside>
                </Link>
              ))}
            </section>
            <footer className="d-flex justify-content-center">
              <NewAlbumForm />
            </footer>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr />
            {currentUser !== "" ? (
              <Fragment>
                <h3 className="text-center text-primary mt-4 mb-2">Log out</h3>
                <br />
                <button
                  className="btn btn-warning btn-block"
                  onClick={() =>
                    auth.signOut().then(() => {
                      setCurrentUser("");
                    })
                  }
                >
                  Logout
                </button>{" "}
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
