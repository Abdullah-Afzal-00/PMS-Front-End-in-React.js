import React, { useEffect } from "react";
//import useAuth from "./hooks/useAuth";
import { useState } from "react";
import axios from "../axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { URL } from "../constants";

function Login({ setIsAuth, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibilty, setVisibility] = useState(false);

  const navigate = useNavigate();

  const checkCredentials = (e) => {
    console.log(username, password);
    axios
      .post(`${URL}/user/login`, {
        email: username,
        password: password,
      })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("email", res.data.email);
        window.localStorage.setItem("username", res.data.username);
        window.localStorage.setItem("name", res.data.name);

        // console.log(res.data);
        //setAuth({ role: res.data.role, token: res.data.token });
        setIsAuth(true);
        setUser(res.data);

        if (res.data.role === 1) return navigate("mainofUser/adminPage");
        navigate("mainofUser");
      })
      .catch((e) => {
        console.log(e);
        console.log("Erorr Found");
        Swal.fire({
          icon: "error",
          title: "Invalid User ID or Password",
        });
      });
  };
  const goToSignUp = () => {
    navigate("/signUp");
  };

  const changeVisibility = () => {
    setVisibility(!visibilty);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Login</h1>
      </div>
      <form onKeyPress={(e) => e.key === "Enter" && checkCredentials()}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => setUsername(event.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <div className="position-relative">
            <input
              type={visibilty ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
            />
            <i
              className={visibilty ? "fas fa-eye-slash" : "fas fa-eye"}
              onClick={changeVisibility}
            ></i>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-dark"
          onClick={() => checkCredentials()}
        >
          Login
        </button>
      </form>
      <div className="d-flex justify-content-center">
        <button type="button" class="btn btn-dark" onClick={() => goToSignUp()}>
          Sign Up
        </button>
      </div>
    </>
  );
}

export default Login;
