import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./AdminReviews.css";
import { ConfirmActionsPopup } from "../../../components/authModel/ConfirmActionsPopup";
import { deleteReview, getReviews } from "../../../utils/ApiCalls";

function AdminReviews() {
  useSelector((state) => state.user.user);
  const [reviews, setReviews] = useState([]);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isPopupDeleteVisible, setIsPopupDeleteVisible] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );

  async function getAllReviews() {
    const response = await getReviews("admin");
    setReviews(response.data.reviews.reviews);
    setMessageSuccess("Review fetched successfully");
      setTimeout(() => setMessageSuccess(""), 3000);
  }
  const deleteMessage = reviewToDelete && (
    <p>
      Do you want to permanently delete review?
      <br />
      <span>
        (id: <strong>{reviewToDelete._id}</strong>)
      </span>
    </p>
  );
  const handleDelete = async (review) => {
    setReviewToDelete(review);
    setIsPopupDeleteVisible(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await deleteReview(reviewToDelete._id);
      setMessageSuccess("Review deleted successfully");
      setTimeout(() => setMessageSuccess(""), 3000);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewToDelete._id)
      );
      setIsPopupDeleteVisible(false);
    } catch (error) {
      setMessageFailed("Something went wrong while deleting the review");
      setTimeout(() => setMessageFailed(""), 3000);
      console.error(error);
    }
  };
  const handleButtonCancel = () => {
    setIsPopupDeleteVisible(false);
  };
  useEffect(() => {
    if (!isUserAuthenticated) {
      return <Navigate to="/" />;
    } else {
      getAllReviews();
    }
  }, [isUserAuthenticated]);
  return (
    <div className="shadow-lg rounded-2xl w-full dark:text-white p-5">
      <div>
        <h1>All Reviews</h1>
      </div>
      <div className="wrapper">
        <table className="table-auto border-collapse border border-gray-400 userTable">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Created At</th>
              <th>Reviewer Name</th>
              <th>Review</th>
              <th>Rating(1 to 5)</th>
              <th className="deleteCell">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(review.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </td>
                <td>{review.reviewername}</td>
                <td>{review.review}</td>
                <td>{review.rating}</td>
                <td className="deleteData">
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(review)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messageSuccess && (
          <span className="text-green-500">{messageSuccess}</span>
        )}
        {messageFailed && <span className="text-red-500">{messageFailed}</span>}
        {isPopupDeleteVisible && reviewToDelete && (
          <ConfirmActionsPopup
            message={deleteMessage}
            onConfirm={handleConfirmDelete}
            onCancel={() => handleButtonCancel("delete")}
          />
        )}
      </div>
    </div>
  );
}

export default AdminReviews;
