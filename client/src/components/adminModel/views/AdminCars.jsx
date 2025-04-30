import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./AdminCars.css";
import { ConfirmActionsPopup } from "../../authModel/ConfirmActionsPopup";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isPopupDeleteVisible, setIsPopupDeleteVisible] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [messageFailed, setMessageFailed] = useState("");

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const getCars = async () => {
    try {
      const url = "http://localhost:3030/api/car/all";
      const response = await axios.get(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );

  if (!isUserAuthenticated) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    getAllCars();
  }, []);
  async function getAllCars() {
    const response = await getCars();
    console.log(response);
    if(response.data.Cars.cars.length<1){
        setMessageFailed(response.data.message);
          setTimeout(() => setMessageFailed(""), 3000);
    }
    
    setCars(response.data.Cars.cars);
    setMessageSuccess("Your Cars fetched sucessfully");
          setTimeout(() => setMessageSuccess(""), 3000);

  }
  const deleteMessage = carToDelete && (
    <p>
      Do you want to permanently delete car?
      <br />
      <span>
        (id: <strong>{carToDelete._id}</strong>)
      </span>
    </p>
  );
  const handleDelete = async (car) => {
    setCarToDelete(car);
    setIsPopupDeleteVisible(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const url =
        "http://localhost:3030/api/car/delete/" + carToDelete._id;
      await axios.delete(url, { withCredentials: true });
      setCars((prevCars) =>
        prevCars.filter((car) => car._id !== carToDelete._id)
      );
      setIsPopupDeleteVisible(false);
      setMessageSuccess("Your Car deleted sucessfully");
                        setTimeout(() => setMessageSuccess(""), 3000);
    } catch (error) {
      setMessageFailed("Something Wrong");
      setTimeout(()=>setMessageFailed(""),3000);
      console.error(error);
    }
  };
  const handleButtonCancel = () => {
    setIsPopupDeleteVisible(false);
  };
  return (
    <div className="shadow-lg rounded-2xl w-full dark:text-white p-5">
      <div>
        <h1>Your Cars</h1>
      </div>
      <div className="wrapper">
        <table className="table-auto border-collapse border border-gray-400 userTable">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Created At</th>
              <th>Car ID</th>
              <th>Name</th>
              <th>Status</th>
              <th className="deleteCell">Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car._id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(car.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </td>
                <td>{car._id}</td>
                <td>{car.brand +" "+car.name}</td>
                <td>{car.status}</td>
                <td className="deleteData">
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(car)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isPopupDeleteVisible && carToDelete && (
          <ConfirmActionsPopup
            message={deleteMessage}
            onConfirm={handleConfirmDelete}
            onCancel={() => handleButtonCancel("delete")}
          />
        )}
        {messageSuccess && (
            <span className="text-green-500">{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className="text-red-500">{messageFailed}</span>
          )}
      </div>
    </div>
  );
}

export default AdminCars;
