import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./AdminBookings.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  GetBookings,
  GetCar,
  GetRental,
  GetUser,
} from "../../../utils/ApiCalls";
import Spinner from "../../loading/Spinner";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [car, setCar] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
  async function getAllBookings() {
    try {
      const response = await GetBookings("admin");
      setMessageSuccess("Bookings fetched successfully");
      setTimeout(() => setMessageSuccess(""), 3000);
      setBookings(response.data.rentals.rentals);
      setIsLoading(false);
    } catch (err) {
      setMessageFailed("Something Wrong in fetching bookings");
      throw new Error("Error in getAllBookings : ",err);
    }
  }
  const handleCheckInfo = async ({ _id, userid, carid }) => {
    try {
      setIsLoading(true);
      const bookingFetch = await GetRental(_id);
      const userFetch = await GetUser(userid);
      const carFetch = await GetCar(carid);
      setBooking(bookingFetch.data.rental.rental);
      setUser(userFetch.data.user);
      setCar(carFetch.data.Car.car);
      setIsLoading(false);
    } catch (err) {
      setMessageFailed("Something Wrong in fetching data of user and car");
      setIsLoading(false);
      throw new Error("Error in adminbookings : ",err);
    }
    setIsOpen(true);
  };

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
        <h1>Booking Details</h1>
      </div>
      {!isOpen ? (
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
                <Th className="checkInfo">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings.length==0?<Tr><Td colSpan={8}>You don't have any bookings</Td></Tr>:bookings.map((booking, index) => (
                <Tr key={booking._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    {new Date(booking.createdAt).toLocaleString(
                      "en-US",
                      DATE_OPTIONS
                    )}
                  </Td>
                  <Td className=" overflow-clip">{booking._id}</Td>
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
                  <Td className="checkInfoBtn">
                    <button
                      className="checkBtn"
                      onClick={() => handleCheckInfo(booking)}
                    >
                      View Details
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {isLoading ? <Spinner /> : ""}
          {messageSuccess && (
            <span className="text-green-500">{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className="text-red-500">{messageFailed}</span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-5 px-10 md:px-16 pt-10  bg-slate-100  rounded-xl ">
          Rental ID : {booking._id}
          <span className="border-b-2 border-dashed border-gray-800 w-full"></span>
          <div className="flex flex-row gap-5 p-5 justify-between items-center">
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Booking Date</label>
              </div>
              <div className="pt-4">
                <label>
                  {new Date(booking.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </label>
              </div>
            </div>
            <div>
              <div>
                <label className="text-gray-500">Status</label>
              </div>
              <div className="pt-4">
                <label>{booking.rentalstatus}</label>
              </div>
            </div>
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Start from</label>
              </div>
              <div className="pt-4">
                <label>
                  {new Date(booking.startdate).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </label>
              </div>
            </div>
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">End at</label>
              </div>
              <div className="pt-4">
                <label>
                  {new Date(booking.returndate).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </label>
              </div>
            </div>
            <div>
              <div>
                <label className="text-gray-500">Amount</label>
              </div>
              <div className="pt-4">
                <label>Rs. {booking.amount}</label>
              </div>
            </div>
          </div>
          <span className="border-b-2 border-dashed border-gray-800 w-full"></span>
          <div className="flex flex-row gap-5 p-5 justify-between items-center">
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Username</label>
              </div>
              <div className="pt-4">
                <label>{user.name}</label>
              </div>
            </div>
            <div>
              <div>
                <label className="text-gray-500">Email</label>
              </div>
              <div className="pt-4">
                <label>{user.email}</label>
              </div>
            </div>
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Contact</label>
              </div>
              <div className="pt-4">
                <label>{user.contact}</label>
              </div>
            </div>
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">License No</label>
              </div>
              <div className="pt-4">
                <label>{user.licensenumber}</label>
              </div>
            </div>
            <div>
              <div>
                <label className="text-gray-500">Expiry Date</label>
              </div>
              <div className="pt-4">
                <label>{user.expirydate}</label>
              </div>
            </div>
          </div>
          <span className="border-b-2 border-dashed border-gray-800 w-full"></span>
          <div className="flex flex-row gap-5 p-5 justify-between items-center">
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Car Name</label>
              </div>
              <div className="pt-4">
                <label>
                  {car.brand} {car.name}
                </label>
              </div>
            </div>
            <div>
              <div>
                <label className="text-gray-500">Car Type</label>
              </div>
              <div className="pt-4">
                <label>{car.type}</label>
              </div>
            </div>
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Car Rent</label>
              </div>
              <div className="pt-4">
                <label>Rs. {car.rateperday}/day</label>
              </div>
            </div>
            <div className="flex-flex-col">
              <div>
                <label className="text-gray-500">Car Gear Type</label>
              </div>
              <div className="pt-4">
                <label>{car.gear}</label>
              </div>
            </div>
            <div>
              <div>
                <label className="text-gray-500">Car Seats</label>
              </div>
              <div className="pt-4">
                <label>{car.capacity}</label>
              </div>
            </div>
          </div>
          <span className="border-b-2 border-dashed border-gray-800 w-full"></span>
          <button className="rounded-[50px] w-24 border-2 border-solid border-blue-700 min-w-fit p-3 font-bold hover:bg-gray-300 hover:text-black text-white bg-black" onClick={() => setIsOpen(false)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
