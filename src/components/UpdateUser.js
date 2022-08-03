import React from "react";
import { useState } from "react";
//import { useEffect } from "react";
import { URL } from "../constants";
import axios from "../axios";
import Swal from "sweetalert2";

function UpdateUser() {
  const [name, setName] = useState("");
  const updateUser = () => {
    console.log(name);
    axios
      .put(`${URL}/user/updateUser`, {
        name: name,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Information Updated",
        });
        localStorage.setItem("name", name);
      })
      .catch((e) => {
        console.log(e);
        console.log("Error Found!!");

        Swal.fire({
          icon: "error",
          title: `${e.response.data.message}`,
        });
      });
  };
  return (
    <>
      {" "}
      <div className="d-flex justify-content-center">
        <h1>Update Name</h1>
      </div>
      {/* onKeyPress={(e) => e.key === "Enter" && updateUser()} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="d-flex justify-content-center">
          <div className="d-inline-flex p-4">
            {" "}
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">
                Name{" "}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                aria-label="Username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => updateUser()}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateUser;
