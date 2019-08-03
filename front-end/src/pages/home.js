import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Login from "../components/Login";
import PostsList from "../components/PostsList";
import "./pages.css";

var bg = require("../img/gw.jpg");

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div
          className="wrapper"
          style={{
            // backgroundImage: "url(" + bg + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <header>
            <h2>Welcome to React RBAC Tutorial.</h2>
          </header>
          <main>
            <Login />
            <PostsList />
          </main>
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;
