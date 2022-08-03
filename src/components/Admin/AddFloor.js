import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../../axios";
import { URL } from "../../constants";

function AddFloor() {
  const [floorNo, setFloorNo] = useState("");
  const [capacity, setCapacity] = useState("");

  const addVehicle = () => {
    if (floorNo === "" || capacity === "") {
      Swal.fire({
        icon: "error",
        title: "Fill all the rquired Inputs",
      });
    } else {
      axios
        .post(`${URL}/floor/create`, {
          floorNo: floorNo,
          capacity: capacity,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Floor has been added",
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
        });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mx-0">
          <div className="col-md-6">
            <form>
              <h1>Add Floor</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Floor No
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder=""
                  required={true}
                  onChange={(event) => setFloorNo(event.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Capacity
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder=""
                  required={true}
                  onChange={(event) => {
                    setCapacity(event.target.value);
                  }}
                />
              </div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => addVehicle()}
              >
                {" "}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFloor;
