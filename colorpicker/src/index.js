import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

import "../assets/stylesheets/application.scss";

const container = document.getElementById("root");
if (container) {
  ReactDOM.render(<App />, container);
}
