import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../axios";
import { URL } from "../constants";

function AddVehicle() {
  const [category, setCategory] = useState("");
  const [modelName, setModelAName] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [numberCode, setNumberCode] = useState("");
  let startYear = 1950;
  let endYear = Date.now();
  endYear = new Date(endYear);
  endYear = endYear.getFullYear();
  let years = [];
  while (startYear <= endYear) {
    years.push(startYear);
    startYear += 1;
  }

  const addVehicle = () => {
    if (
      category === "" ||
      year === "" ||
      modelName === "" ||
      color === "" ||
      regionCode === "" ||
      numberCode === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Fill all the rquired Inputs",
      });
    } else {
      console.log(typeof category);
      console.log(typeof modelName);
      console.log(typeof Number(year));
      console.log(typeof color);
      console.log(typeof regionCode + " " + numberCode);
      console.log(regionCode + " " + numberCode);
      axios
        .post(`${URL}/vehicle/add`, {
          category: category,
          modelName: modelName,
          model: Number(year),
          color: color,
          numberPlate: regionCode + " " + numberCode,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Your Vehicle has been registered",
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
              <h1>Add Your Vehicle</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Category
                </label>
                <select
                  required={true}
                  id="select"
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option selected>Vehicle Catogery</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="Truck">Truck</option>
                  <option value="Bike">Bike</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Model name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder=""
                  required={true}
                  onChange={(event) => setModelAName(event.target.value)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Manufacturing Year
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Color
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder=""
                  required={true}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Number Plate
                </label>
                <div className="row mx-0">
                  <div className="col-3 ps-0">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="Region Code"
                      pattern="[A-Z]{3}"
                      maxLength={3}
                      minLength="3"
                      onChange={(event) => {
                        setRegionCode(event.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  __
                  <div className="col-5 mx-0">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="Number Code"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      minLength="4"
                      required={true}
                      onChange={(event) => setNumberCode(event.target.value)}
                    />
                  </div>
                </div>
                <h6>
                  Region code must be 3 Capital Letters and Number Code must be
                  of 4 digits
                </h6>
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

export default AddVehicle;
