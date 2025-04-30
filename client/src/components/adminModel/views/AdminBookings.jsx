import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./AdminBookings.css";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { getBookings } from "../../../utils/ApiCalls";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
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
  async function getAllBookings() {
    try{
      const response = await getBookings("admin");
    setMessageSuccess("Bookings fetched successfully");
    setTimeout(() => setMessageSuccess(""), 3000);
    setBookings(response.data.rentals.rentals);

    }catch(err){
      setMessageFailed("Something Wrong in fetching bookings");
      console.log(err);
    }
    
  }

  

  useEffect(() => {
    if (!isUserAuthenticated) {
      return <Navigate to="/" />;
    } else {
      getAllBookings();
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
                
              </Tr>
            ))}
          </Tbody>
        </Table>
        {messageSuccess && (
          <span className="text-green-500">{messageSuccess}</span>
        )}
        {messageFailed && <span className="text-red-500">{messageFailed}</span>}
        
      </div>

        
  
    </div>
  );
}

export default AdminBookings;
