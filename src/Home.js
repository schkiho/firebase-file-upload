import React from "react";
import { Link } from "react-router-dom";
import NewAlbumForm from "./NewAlbumForm";
import NewFlyer from "./NewFlyer";

const Home = ({ albums, flyer }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="text-center text-primary">Flyer Upload</h1>
          <section className="d-flex justify-content-around my-4">
            {flyer.map((item) => (
              <aside key={item.name}>
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
            {albums.map((album) => (
              <Link key={album.name} to={`/${album.id}`}>
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
    </div>
  );
};

export default Home;
