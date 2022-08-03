import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

function Main({ user, setIsAuth, setUser }) {
  return (
    <>
      <Navbar setIsAuth={setIsAuth} setUser={setUser} user={user} />
      <Outlet />
    </>
  );
}

export default Main;
