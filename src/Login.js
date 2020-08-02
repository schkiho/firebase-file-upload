import React, { useCallback, Fragment } from "react";
import firebase from "./fbConfig";

const auth = firebase.auth();

const Login = () => {
  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
    } catch (err) {
      console.log("error", err.message);
    }
  }, []);

  return (
    <Fragment>
      <h1 className="text-center text-primary">Login</h1>
      <form className="form-group" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email address"
        />
        <br />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
        />
        <button type="submit" className="btn btn-success btn-block mt-4">
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
