import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { URL } from "../../constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URL}/user/allUsers`)
      .then((res) => {
        //console.log(res.data);
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteUser = (email) => {
    Swal.fire({
      title: "Do you really want to delete the Booking?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire("Saved!", "", "success");
        //console.log(numPlate);
        axios
          .delete(`${URL}/user/deleteUser/${email}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "User is Deleted from the record",
            });
          })
          .catch((e) => {
            console.log(e);
            Swal.fire({
              icon: "error",
              title: `${e.response.data.message}`,
            });
            // console.log(e);
            // console.log("Can't Delete");
          });
      } else if (result.isDenied) {
        Swal.fire("User is not deleted", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="px-4 pt-5">
        <h1 className="text-center mb-4">All Users</h1>
        <div>
          {users.length !== 0 ? (
            users.map((key, index) => {
              return (
                <>
                  <div className="articleDiv">
                    <h2>Username : {key.username}</h2>
                    <h4 className="authorName">Email : {key.email}</h4>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => {
                        deleteUser(key.email);
                        //console.log(key.numberPlate);
                      }}
                      //={() => goToViewArticlePage(key.slug)}
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                </>
              );
            })
          ) : (
            <h2 className="text-center">No User Found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
