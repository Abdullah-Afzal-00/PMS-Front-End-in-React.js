import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "../axios";
import { URL } from "../constants";

function AddBooking() {
  const [numberPlate, setNumberPlate] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [slotNo, setSlotNo] = useState("");
  const [fare, setFare] = useState("");
  const [userVehicle, setUserVehicle] = useState([]);
  const [floors, setFloors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
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
    setEndDate(currentDate);
    getFare(currentDate);
    axios
      .get(`${URL}/vehicle/showUserVehicles`)
      .then((res) => {
        setUserVehicle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${URL}/floor/showAll`)
      .then((res) => {
        //console.log(res.data);
        setFloors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getFare = (date) => {
    axios
      .post(`${URL}/booking/calculateFare`, { time: date })
      .then((res) => {
        //console.log(res.data.fare);
        setFare(res.data.fare);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addVehicle = () => {
    if (
      numberPlate === "" ||
      floorNo === "" ||
      slotNo === "" ||
      endDate === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Fill all the rquired Inputs",
      });
    } else {
      axios
        .post(`${URL}/booking/register`, {
          numberPlate: numberPlate,
          floorNo: Number(floorNo),
          slotNo: Number(slotNo),
          endTime: endDate,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Your Booking is Done",
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
              <h1>Add Your Booking</h1>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Your Vehicles
                </label>
                <select
                  required={true}
                  id="select"
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setNumberPlate(e.target.value)}
                >
                  <option selected>Pick Your Vehicle</option>
                  {userVehicle.map((val, index) => {
                    return (
                      <option value={val.numberPlate}>
                        {val.modelName} - {val.numberPlate}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Floor No
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setFloorNo(e.target.value);
                    setSlots(floors[e.target.options.selectedIndex - 1].slots);
                  }}
                >
                  <option selected>Pick the Floor</option>
                  {floors.map((val, index) => {
                    //console.log(val.floorNo);
                    return (
                      <option key={index} value={val.floorNo}>
                        {val.floorNo}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Free Slots
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setSlotNo(e.target.value)}
                >
                  <option selected>Pick the slot</option>
                  {slots.map((val, index) => {
                    return (
                      <>
                        {val.isFree && (
                          <option key={index} value={val.slotNo}>
                            {val.slotNo + 1}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
              </div>
              <div class="mb-3">
                <>Pick the End date</>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    getFare(date);
                  }}
                  minDate={currentDate}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </div>
              <h4 className="mb-3">Fare : {Math.round(fare)} PKR</h4>
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

export default AddBooking;
