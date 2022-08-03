import React from "react";
import { useNavigate } from "react-router-dom";

function UserPage() {
  let navigate = useNavigate();

  let usr = localStorage.getItem("name");
  let emailaddress = localStorage.getItem("email");
  const goToUpdatePage = () => {
    navigate("updateUser");
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Hello {usr}!</h1>
      </div>
      <div className="card">
        <ul className="list-group list-group-flush">
          <div className="d-flex justify-content-center">
            <li className="list-group-item">Personal Information</li>
          </div>
          <li className="list-group-item">User Name = {usr}</li>
          <li className="list-group-item">Email = {emailaddress}</li>
        </ul>
      </div>
      <div
        className="d-flex justify-content-center
      "
      >
        <div className="d-inline-flex p-4">
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => goToUpdatePage()}
          >
            Update User
          </button>
        </div>
      </div>
    </>
  );
}

export default UserPage;
