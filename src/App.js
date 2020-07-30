import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import firebase from "./fbConfig";
import Album from "./Album";
import Home from "./Home";

const db = firebase.firestore();

const App = () => {
  const [flyer, setFlyer] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unmount = db.collection("albums").onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        tempAlbums.push({ ...doc.data(), id: doc.id });
      });
      setAlbums(tempAlbums);
    });
    return unmount;
  }, []);

  useEffect(() => {
    db.collection("flyer")
    .onSnapshot((snapshot) => {
      const tempFlyer = [];
      snapshot.forEach((doc) => {
        tempFlyer.push({ ...doc.data(), id: doc.id });
      });
      setFlyer(tempFlyer);
    });
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home albums={albums} flyer={flyer} />}
        />
        <Route path="/:album" component={Album} />
      </Switch>
    </Fragment>
  );
};

export default App;
