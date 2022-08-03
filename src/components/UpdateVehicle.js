import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "../axios";
import { URL } from "../constants";
import { Routes, Route, useParams } from "react-router-dom";

function UpdateVehicle() {
  const [category, setCategory] = useState(undefined);
  const [modelName, setModelAName] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const [vehicleData, setVehicleData] = useState({});

  const { id } = useParams();

  console.log(id);
  let startYear = 1950;
  let endYear = Date.now();
  endYear = new Date(endYear);
  endYear = endYear.getFullYear();
  let years = [];
  while (startYear <= endYear) {
    years.push(startYear);
    startYear += 1;
  }

  useEffect(() => {
    axios
      .get(`${URL}/vehicle/showVehicle/${id}`)
      .then((res) => {
        //console.log(res);
        setVehicleData(res.data);
        setCategory(res.data.category);
        setYear(res.data.model);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateVehicle = () => {
    axios
      .put(`${URL}/vehicle/update/${id}`, {
        category: category,
        modelName: modelName,
        year: Number(year),
        color: color,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Your Vehicle Details has been updated",
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Some Error Happened",
        });
      });
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mx-0">
          <div className="col-md-6">
            <form>
              <h1>Update Vehicle Details</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Category
                </label>
                <select
                  required={true}
                  id="select"
                  class="form-select"
                  aria-label="Default select example"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
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
                  defaultValue={vehicleData.modelName}
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
                  value={year}
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
                  defaultValue={vehicleData.color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateVehicle()}
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

export default UpdateVehicle;
