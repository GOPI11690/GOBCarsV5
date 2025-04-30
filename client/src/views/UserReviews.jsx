import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./UserReviews.css";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { ConfirmActionsPopup } from "../components/authModel/ConfirmActionsPopup";
import {getReviews} from "../utils/ApiCalls";

function UserReviews() {
  const user = useSelector((state) => state.user.user);
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

  
  useEffect(() => {
    if (!isUserAuthenticated) {
      return <Navigate to="/" />;
    }
    else{
      getUserReviews();
    }
    
  }, [isUserAuthenticated]);
  async function getUserReviews() {
    const response = await getReviews(user._id);
    setReviews(response.data.reviews.reviews);
    setMessageSuccess("Reviews fetched successfully");
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
      const url =
        "http://localhost:3030/api/review/delete/" + reviewToDelete._id;
      await axios.delete(url, { withCredentials: true });
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewToDelete._id)
      );
      setIsPopupDeleteVisible(false);
      setMessageSuccess("Review deleted successfully");
    setTimeout(() => setMessageSuccess(""), 3000);  
    } catch (error) {
      setMessageSuccess("Review fetch error");
    setTimeout(() => setMessageSuccess(""), 3000);  
      console.error(error);
    }
  };
  const handleButtonCancel = () => {
    setIsPopupDeleteVisible(false);
  };
  return (
    <div className="shadow-lg rounded-2xl w-full dark:text-white p-5">
      <div>
        <h1>Your Reviews</h1>
      </div>
      <div className="wrapper">
        <Table className="table-auto border-collapse border border-gray-400 userTable">
          <Thead>
            <Tr>
              <Th>Sl.No</Th>
              <Th>Created At</Th>
              <Th>Review ID</Th>
              <Th>Review</Th>
              <Th>Rating(1 to 5)</Th>
              <Th className="deleteCell">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reviews.map((review, index) => (
              <Tr key={review._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {new Date(review.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Td>
                <Td>{review._id}</Td>
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
       {messageSuccess && (
            <span className="text-green-500">{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className="text-red-500">{messageFailed}</span>
          )}
     
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

export default UserReviews;
