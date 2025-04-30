import React, { useState } from "react";
import "./ConfirmAddPopup.css";
import DropDownMenu from "./DropDownMenu";
import { useSelector } from "react-redux";

export const AddReviewPopup = ({ onConfirm, onCancel }) => {
  const user = useSelector((state) => state.user.user);
  const [review, setReview] = useState({
    review: "",
    rating: "",
    reviewername: user.name,
    userid: user._id,
  });
  const stars = ["1", "2", "3", "4", "5"];

  const sendDataToParent = () => {
    onConfirm(review);
  };
  return (
    <div className="fixed top-0 left-0 z-50 backdrop-blur-sm w-full h-full justify-center items-center flex">
      <div className=" flex flex-col min-w-fit justify-center p-5 bg-sky-300 rounded-2xl">
        <table className="table-fixed">
          <tbody className="max-w-fit">
            <tr>
              <td colSpan={2}>
                <div className="flex flex-col items-start p-3 py-5 text-black">
                  <label className="font-semibold text-lg pb-2">
                    Type your Opinion...
                  </label>
                  <input
                    type="text"
                    placeholder="Type your opinion here..."
                    value={review.review}
                    required
                    onChange={(e) =>
                      setReview({ ...review, review: e.target.value })
                    }
                    className="border-2 py-3 px-2 rounded-md h-10 w-full placeholder-gray-500 p-1 text-black"
                  ></input>
                </div>
              </td></tr>
            <tr>
              <td>
                <div className="flex flex-col  items-start p-3 py-5 text-black">
                  <label className="font-semibold text-lg pb-2">Rating </label>
                  <DropDownMenu
                    options={stars}
                    getValue={(value) => {
                      setReview({ ...review, rating: value });
                    }}
                  ></DropDownMenu>
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
                <button
                  className="bg-green-500 text-white rounded-[50px] w-44 h-16 text-xl hover:bg-green-700"
                  onClick={sendDataToParent}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
