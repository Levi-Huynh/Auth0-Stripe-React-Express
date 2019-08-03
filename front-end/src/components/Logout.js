import React from "react";
import "../App.css";

import { AuthConsumer } from "../authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <button
        style={{
          border: "1px solid #0069D9",
          borderRadius: "5px",
          height: "40px",
          backgroundColor: "#0069D9",
          color: "white"
        }}
        className="btn btn-sm btn-default"
        onClick={logout}
      >
        Logout
      </button>
    )}
  </AuthConsumer>
);

export default Logout;
