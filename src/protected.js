import React from "react";
import { Outlet } from "react-router-dom";

function Protected() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Protected;
