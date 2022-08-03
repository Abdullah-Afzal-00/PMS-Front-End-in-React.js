import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect, useNavigate } from "react";
import { URL } from "./constants";
import NotFound from "./notFound";
import Login from "./components/login";
import SignUp from "./components/SignUp";
import Protected from "./protected";
import Main from "./components/Main";
import UserPage from "./components/UserPage";
import UpdateUser from "./components/UpdateUser";
import Vehicle from "./components/Vehicle";
import AddVehicle from "./components/AddVehicle";
import UpdateVehicle from "./components/UpdateVehicle";
import Booking from "./components/Booking";
import AddBooking from "./components/AddBooking";
import AdminPage from "./components/Admin/AdminPage";
import Floor from "./components/Admin/Floor";
import AddFloor from "./components/Admin/AddFloor";
import AdminVehicle from "./components/Admin/AdminVehicle";
import UnAuthorized from "./UnAuthorized";
import axios from "./axios";
import AdminBooking from "./components/Admin/AdminBooking";
import User from "./components/Admin/User";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  //const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      axios
        .get(`${URL}/user/getUser`)
        .then((res) => {
          setUser({
            username: res.data.username,
            role: res.data.role,
          });
          setIsAuth(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Routes>
        {!isAuth && (
          <>
            <Route
              path="/"
              element={<Login setIsAuth={setIsAuth} setUser={setUser} />}
            ></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
          </>
        )}
        {isAuth && (
          <Route element={<Protected />}>
            <Route
              path="/mainofUser"
              element={
                <Main user={user} setIsAuth={setIsAuth} setUser={setUser} />
              }
            >
              <Route path="" element={<UserPage />}></Route>
              <Route path="updateUser" element={<UpdateUser />}></Route>
              <Route path="vehicles" element={<Vehicle />}></Route>
              <Route path="addVehicle" element={<AddVehicle />}></Route>
              <Route
                path="updateVehicle/:id"
                element={<UpdateVehicle />}
              ></Route>
              <Route path="bookings" element={<Booking />}></Route>
              <Route path="addbooking" element={<AddBooking />}></Route>
              {isAuth && user?.role === 1 ? (
                <Route element={<Protected />}>
                  <Route path="adminPage" element={<AdminPage />}></Route>
                  <Route path="floors" element={<Floor />}></Route>
                  <Route path="addFloor" element={<AddFloor />}></Route>
                  <Route path="adminVehicle" element={<AdminVehicle />}></Route>
                  <Route path="adminBooking" element={<AdminBooking />}></Route>
                  <Route path="users" element={<User />}></Route>
                </Route>
              ) : (
                <Route path="unAuthorized" element={<UnAuthorized />}></Route>
              )}
            </Route>
          </Route>
        )}
        {/* {user?.role === 1 && (
          <Navigate to="mainofUser" replace={true} />
        )}
        {user?.role === 2 && <Navigate to="mainofUser" replace={true} />} */}
        {<Route path="*" element={<NotFound />} />}
      </Routes>
    </>
  );
}

export default App;
