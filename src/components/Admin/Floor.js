import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { URL } from "../../constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Floor = () => {
  const [floors, setFloors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URL}/floor/showAll`)
      .then((res) => {
        //console.log(res.data);
        setFloors(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const bookSlot = (slotNo, floorNo) => {
    Swal.fire({
      title: "Do you really want to Book that Slot?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Book it",
      denyButtonText: `Don't Book it`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire("Saved!", "", "success");
        axios
          .put(`${URL}/floor/update`, {
            floorNo: floorNo,
            slotNo: slotNo,
            isFree: false,
          })
          .then(() => {
            Swal.fire({
              //position: 'top-end',
              icon: "success",
              title: "Floor deatils are Updated",
            });
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Some error Happened",
            });
            // console.log(e);
            // console.log("Can't Delete");
          });
      } else if (result.isDenied) {
        Swal.fire("No changes made to Floor", "", "info");
      }
    });
  };

  const deleteFloor = (floorNo) => {
    Swal.fire({
      title: "Do you really want to delete the article?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire("Saved!", "", "success");
        axios
          .delete(`${URL}/floor/delete/${floorNo}`)
          .then(() => {
            Swal.fire({
              //position: 'top-end',
              icon: "success",
              title: "Floor is Deleted from the record",
            });
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Some error Happened",
            });
            // console.log(e);
            // console.log("Can't Delete");
          });
      } else if (result.isDenied) {
        Swal.fire("Floor is not deleted", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="px-4 pt-5">
        <h1 className="text-center mb-4">All Floors</h1>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("../addFloor")}
          >
            Add Floor
          </button>
        </div>
        <div>
          {floors.length !== 0 ? (
            floors.map((key, index) => {
              return (
                <>
                  <div className="articleDiv">
                    <h2>Floor No : {key.floorNo}</h2>
                    <h6 className="my-3">Capacity : {key.capacity}</h6>
                    <h4>
                      <span className="lightFont">Slots</span>{" "}
                      <div className="authorName">
                        {key.slots.map((val, index) => {
                          return (
                            <button
                              className={
                                val.isFree
                                  ? "btn btn-primary px-2 py-1 mx-1"
                                  : "btn btn-danger px-2 py-1 mx-1"
                              }
                              disabled={!val.isFree}
                              onClick={() => {
                                bookSlot(val.slotNo, key.floorNo);
                              }}
                            >
                              {val.slotNo + 1}
                            </button>
                          );
                        })}
                      </div>
                    </h4>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => deleteFloor(key.floorNo)}
                      //={() => goToViewArticlePage(key.slug)}
                    >
                      Delete Floor
                    </button>
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => UpdateVehicle(key.numberPlate)}
                      //={() => goToViewArticlePage(key.slug)}
                    >
                      Update
                    </button> */}
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

export default Floor;
