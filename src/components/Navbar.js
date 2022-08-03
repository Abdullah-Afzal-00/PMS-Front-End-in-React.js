import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar({ user, setIsAuth, setUser }) {
  const navigate = useNavigate();

  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A52A2A",
      cancelButtonColor: "#088F8F",
      confirmButtonText: "Yes, Log out",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Loged Out", "success");

        localStorage.clear();
        setIsAuth(false);
        setUser(null);
        navigate("/");
      }
    });
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Parking Managment System
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to={user?.role === 1 ? "adminVehicle" : "vehicles"}
                >
                  Vehicles
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to={user?.role === 1 ? "adminBooking" : "bookings"}
                >
                  Bookings
                </Link>
              </li>
              {user?.role === 1 && (
                <li class="nav-item">
                  <Link class="nav-link" to="floors">
                    Floors
                  </Link>
                </li>
              )}
              {user?.role === 1 && (
                <li class="nav-item">
                  <Link class="nav-link" to="users">
                    Users
                  </Link>
                </li>
              )}
              <li class="nav-item">
                <Link class="nav-link" to="#" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
