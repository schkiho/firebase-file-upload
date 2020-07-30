import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import NewAlbumForm from "./NewAlbumForm";

const Home = ({ albums }) => {
  return (
    <Fragment>
      <h1 className="text-center text-primary">Album Upload</h1>
      <section>
        {albums.map((album) => (
          <Link key={album.name} to={`/${album.id}`}>
            <aside>
              <img
                src={album.images ? album.images[0].url : ""}
                alt="album"
                style={{ width: "200px", height: "200px" }}
              />
              <h3>{album.name}</h3>
            </aside>
          </Link>
        ))}
      </section>
      <footer>
        <NewAlbumForm />
      </footer>
    </Fragment>
  );
};

export default Home;
