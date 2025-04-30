import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserBookings.css";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { addReview, getBookings } from "../utils/ApiCalls";
import { AddReviewPopup } from "../components/authModel/AddReviewPopup";
import { useNavigate } from "react-router-dom";

function UserBookings() {
  const user = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
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
  async function getUserBookings() {
    const response = await getBookings(user._id);
    setMessageSuccess("Bookings fetched successfully");
    setTimeout(() => setMessageSuccess(""), 3000);
    setBookings(response.data.rentals.rentals);
  }

  const handleAddReview = async (review) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addReview(
        review.review,
        review.rating,
        review.reviewername,
        review.userid
      );
      setIsPopupVisible(false);
      setMessageSuccess("Your Review Added");
      setTimeout(() => {
        setMessageSuccess("");
        navigate("/userpage/userreviews");
      }, 1000);
    } catch (e) {
      setMessageFailed("Something Wrong in add review section");
      throw new Error(e);
    }
  };

  useEffect(() => {
    if (!isUserAuthenticated) {
      return <Navigate to="/" />;
    } else {
      getUserBookings();
    }
  }, [isUserAuthenticated]);

  return (
    <div className="shadow-lg rounded-2xl w-full dark:text-white p-5">
      <div>
        <h1>Your Booking Details</h1>
      </div>
      <div className="wrapper">
        <Table className="table-auto border-collapse border border-gray-400 userTable">
          <Thead>
            <Tr>
              <Th>Sl.No</Th>
              <Th>Booking Date</Th>
              <Th>Booking ID</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Status</Th>
              <Th>Amount</Th>
              <Th className="addReview">Add Review</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking, index) => (
              <Tr key={booking._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {new Date(booking.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Td>
                <Td className="text-wrap overflow-clip">{booking._id}</Td>
                <Td>
                  {new Date(booking.startdate).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Td>
                <Td>
                  {new Date(booking.returndate).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Td>
                <Td>{booking.rentalstatus}</Td>
                <Td>Rs. {booking.amount}</Td>
                <Td className="addReviewData">
                  <button
                    className="addReviewButton"
                    onClick={() => setIsPopupVisible(true)}
                  >
                    Add Review
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {messageSuccess && (
          <span className="text-green-500">{messageSuccess}</span>
        )}
        {messageFailed && <span className="text-red-500">{messageFailed}</span>}
        {isPopupVisible && (
          <AddReviewPopup
            onConfirm={handleAddReview}
            onCancel={() => setIsPopupVisible(false)}
          />
        )}
      </div>

        
  
    </div>
  );
}

export default UserBookings;
