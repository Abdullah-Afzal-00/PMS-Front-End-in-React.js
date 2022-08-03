import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      {" "}
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
