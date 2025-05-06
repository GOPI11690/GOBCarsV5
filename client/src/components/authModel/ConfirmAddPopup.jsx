import React, { useState } from "react";
import "./ConfirmAddPopup.css";
import DropDownMenu from "./DropDownMenu";
import { useSelector } from "react-redux";
import ProgressBar from "../loading/ProgressBar";

export const ConfirmAddPopup = ({ onConfirm, onCancel }) => {
  const user = useSelector((state) => state.user.user);
  const [carDetail, setCarDetail] = useState({
    brand: "",
    model: "",
    type: "",
    fuel: "",
    capacity: "",
    gear: "",
    rateperday: "",
    thumbnail: "",
    status: "Available",
    userid: user._id,
  });
  const type = ["Select","SUV", "Sedan", "Hatchback", "Van"];
  const fuel = ["Select","Petrol", "Diesel", "CNG", "Electric"];
  const gear = ["Select","Auto", "Manual"];
  const capacity = ["Select","4-Seater", "7-Seater", "10-Seater"];
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendDataToParent = () => {
    if(carDetail.brand===""||carDetail.model===""||carDetail.type==="Select"||carDetail.type===""||carDetail.fuel===""||carDetail.capacity===""||carDetail.gear===""||carDetail.fuel==="Select"||carDetail.capacity==="Select"||carDetail.gear==="Select"||carDetail.rateperday===""||carDetail.thumbnail===""){  
    setMessageFailed("Please fill all the fields");
    setTimeout(() => setMessageFailed(""), 3000);
      return;
    }
    setIsLoading(true);
    setMessageSuccess("Car Added Successfully");
    setTimeout(() => {
      setIsLoading(false);
      onConfirm(carDetail);
    }, 2000);
  };

  return (
    <div className="fixed top-0 left-0 z-50 backdrop-blur-sm w-full h-full justify-center items-center flex">
      <div className=" flex flex-col justify-center p-5 bg-sky-300 rounded-2xl">
        <h1>Enter the Car Details...</h1>
        <table className="table-auto">
          <tbody className="">
            <tr>
              <td>
                <div className="flex flex-col items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg">Brand</label>
                  <input
                    type="text"
                    placeholder="Enter Brand Name"
                    value={carDetail.brand}
                    required
                    onChange={(e) =>
                      setCarDetail({ ...carDetail, brand: e.target.value })
                    }
                    className="border-2 py-3 px-2 w-full rounded-md placeholder-gray-500 p-1 text-black"
                  ></input>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg">Model</label>
                  <input
                    type="text"
                    placeholder="Enter Model Name"
                    value={carDetail.model}
                    required
                    onChange={(e) =>
                      setCarDetail({ ...carDetail, model: e.target.value })
                    }
                    className="border-2 py-3 px-2 rounded-md w-full placeholder-gray-500 p-1 text-black"
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-row gap-5 items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg text-nowrap">
                    Car Type{" "}
                  </label>
                  <DropDownMenu
                    options={type}
                    getValue={(value) => {
                      setCarDetail({ ...carDetail, type: value });
                    }}
                  ></DropDownMenu>
                </div>
              </td>
              <td>
                <div className="flex flex-row gap-5 items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg text-nowrap">
                    Fuel Type
                  </label>
                  <DropDownMenu
                    options={fuel}
                    getValue={(value) => {
                      setCarDetail({ ...carDetail, fuel: value });
                    }}
                  ></DropDownMenu>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-row gap-3 items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg text-nowrap">
                    Seat Capacity
                  </label>
                  <DropDownMenu
                    options={capacity}
                    getValue={(value) => {
                      setCarDetail({ ...carDetail, capacity: value });
                    }}
                  ></DropDownMenu>
                </div>
              </td>
              <td>
                <div className="flex flex-row gap-3 items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg">Gear</label>
                  <DropDownMenu
                    options={gear}
                    getValue={(value) => {
                      setCarDetail({ ...carDetail, gear: value });
                    }}
                  ></DropDownMenu>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-col items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg">Rate Per Day</label>
                  <input
                    type="text"
                    placeholder="Enter Rate per Day"
                    value={carDetail.rateperday}
                    onChange={(e) =>
                      setCarDetail({ ...carDetail, rateperday: e.target.value })
                    }
                    className="border-2 py-3 px-2 w-full rounded-md placeholder-gray-500 p-1 text-black"
                  ></input>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start p-5 py-5 text-black">
                  <label className="font-semibold text-lg">Car Image </label>
                  <input
                    type="text"
                    placeholder="Paste the Image URL"
                    value={carDetail.thumbnail}
                    onChange={(e) =>
                      setCarDetail({ ...carDetail, thumbnail: e.target.value })
                    }
                    className="border-2 py-3 px-2 rounded-md w-full placeholder-gray-500 p-1 text-black"
                  ></input>
                </div>
              </td>
            </tr>
            <tr>
              <td className="mt-5 p-3">
                <button
                  className="bg-slate-400 text-white rounded-[50px] w-44 h-16 text-xl hover:bg-slate-600"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </td>
              <td className="mt-5 p-3">
                <button type="button"
                  className="bg-green-500 text-white rounded-[50px] w-44 h-16 text-xl hover:bg-green-700"
                  onClick={sendDataToParent}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {isLoading ? <ProgressBar /> : ""}
        {messageFailed ? (
          <span className="text-red-500">{messageFailed}</span>
        ):""}{messageSuccess ? (
          <span className="text-green-500">{messageSuccess}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
