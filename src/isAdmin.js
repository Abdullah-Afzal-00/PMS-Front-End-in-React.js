import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAdmin = ({ role }) => {
  //const auth = localStorage.getItem("token");
  return <>{role === 1 ? <Outlet /> : <Navigate to="/unAuthorized" />}</>;
};

export default isAdmin;
