import React, { useEffect, useState } from "react";
import axios from "../axios";
import { URL } from "../constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URL}/booking/show`)
      .then((res) => {
        //console.log(res.data);
        setBookings(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteBooking = (numPlate) => {
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
          .delete(`${URL}/booking/delete/${numPlate}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Your Booking is Deleted from the record",
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
        Swal.fire("Vehicle is not deleted", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="px-4 pt-5">
        <h1 className="text-center mb-4">All Bookings</h1>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("../addBooking")}
          >
            Add Booking
          </button>
        </div>
        <div>
          {bookings.length !== 0 ? (
            bookings.map((key, index) => {
              return (
                <>
                  <div className="articleDiv">
                    <h2>Floor No: {key.floors}</h2>
                    <h6 className="my-3">Slot No: {key.slotNo}</h6>
                    <h4>
                      <span className="lightFont">Vehicle :</span>{" "}
                      <span className="authorName">
                        {key.vehicles.modelName}-{key.vehicles.numberPlate}
                      </span>
                    </h4>
                    <h4 className="authorName">
                      Rented to : {key.user.username}
                    </h4>
                    <h6>Start Time :</h6>
                    <p>{key.startTime}</p>
                    <h6>End Time :</h6>
                    <p> {key.endTime}</p>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => {
                        deleteBooking(key.vehicles.numberPlate);
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
            <h2 className="text-center">No Vehicle Registerd</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
