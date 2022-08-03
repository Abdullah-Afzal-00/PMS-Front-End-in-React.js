import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { URL } from "../../constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AdminVehicle = () => {
  const [allVehicles, setAllVehicles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URL}/vehicle/showAll`)
      .then((res) => {
        //console.log(res.data);
        setAllVehicles(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //   const UpdateVehicle = (numPlate) => {
  //     navigate("../updateVehicle/" + numPlate);
  //   };

  const deleteVehicle = (numPlate) => {
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
          .delete(`${URL}/vehicle/delete/${numPlate}`)
          .then(() => {
            Swal.fire({
              //position: 'top-end',
              icon: "success",
              title: "Your Vehicle is Deleted from the record",
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
        Swal.fire("Vehicle is not deleted", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="px-4 pt-5">
        <h1 className="text-center mb-4">Your Registered Vehicles</h1>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("../addVehicle")}
          >
            Register Vehicle
          </button>
        </div>
        <div>
          {allVehicles.length !== 0 ? (
            allVehicles.map((key, index) => {
              return (
                <>
                  <div className="articleDiv">
                    <h2>Model : {key.modelName}</h2>
                    <h6 className="my-3">category : {key.category}</h6>
                    <h4>
                      <span className="lightFont">Make :</span>{" "}
                      <span className="authorName">{key.model}</span>
                    </h4>
                    <h4 className="authorName">
                      Number Plate : {key.numberPlate}
                    </h4>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => deleteVehicle(key.numberPlate)}
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

export default AdminVehicle;
