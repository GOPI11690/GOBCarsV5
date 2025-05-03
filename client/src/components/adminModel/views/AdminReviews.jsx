import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./AdminReviews.css";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { ConfirmActionsPopup } from "../../../components/authModel/ConfirmActionsPopup";
import { DeleteReview, GetReviews } from "../../../utils/ApiCalls";
import Spinner from "../../loading/Spinner";


function AdminReviews() {
  useSelector((state) => state.user.user);
  const [reviews, setReviews] = useState([]);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isPopupDeleteVisible, setIsPopupDeleteVisible] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    const response = await GetReviews("admin");
    setReviews(response.data.reviews.reviews);
    setIsLoading(false);
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
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await DeleteReview(reviewToDelete._id);
      setMessageSuccess("Review deleted successfully");
      setTimeout(() => setMessageSuccess(""), 3000);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewToDelete._id)
      );
      setIsLoading(false);
      setIsPopupDeleteVisible(false);
    } catch (error) {
      setMessageFailed("Something went wrong while deleting the review");
      setIsLoading(false);
      setTimeout(() => setMessageFailed(""), 3000);
      throw new Error("Error in AdminReviews",error);
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
        <Table className="table-auto border-collapse border border-gray-400 userTable">
          <Thead>
            <Tr>
              <Th>Sl.No</Th>
              <Th>Created At</Th>
              <Th>Reviewer Name</Th>
              <Th>Review</Th>
              <Th>Rating(1 to 5)</Th>
              <Th className="deleteCell">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
          {reviews.length==0?<Tr><Td colSpan={6}>You don't have any reviews</Td></Tr>:reviews.map((review, index) => (
              <Tr key={review._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {new Date(review.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Td>
                <Td>{review.reviewername}</Td>
                <Td>{review.review}</Td>
                <Td>{review.rating}</Td>
                <Td className="deleteData">
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(review)}
                  >
                    Delete
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {isLoading?<Spinner /> : ""}
        {messageSuccess && (
          <span className="text-green-500">{messageSuccess}</span>
        )}
        {messageFailed && <span className="text-red-500">{messageFailed}</span>}
        {isPopupDeleteVisible && reviewToDelete && (
          <ConfirmActionsPopup
          btnName={"Delete"}
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
