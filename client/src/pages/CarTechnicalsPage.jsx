import React, { useEffect, useState } from "react";
import { FaAirFreshener, FaGasPump, FaRegSnowflake } from "react-icons/fa";
import { FaArrowLeft, FaCircleLeft } from "react-icons/fa6";
import { GiGearStickPattern } from "react-icons/gi";
import { MdEventSeat, MdGpsFixed, MdOutlineAir } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import { GetCar } from "../utils/ApiCalls";
import ReviewComponent from "../components/ReviewComponent";
import { useSelector } from "react-redux";
import Spinner from "../components/loading/Spinner";

const CarTechnicalsPage = () => {
    const search = useSelector((state) => state.search.search);
    const navigate = useNavigate();
    const [car,setCar]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const isUserAuthenticated = useSelector(
        state => state.user.isUserAuthenticated
      )
      
     
    const getCarDetails=async()=>{
        const carData=await GetCar(search.carid);
        setCar(carData.data.Car.car);
        setIsLoading(false);
    }
    const handleBookNow=()=>{
      navigate("/bookingpage")
    }
    
    useEffect(() => {
      if (!isUserAuthenticated) {
        navigate("/login")
      }
      else{
        getCarDetails();
      }
      
        
       
    },[isUserAuthenticated,search.carid]) 
  return (
    <div className="md:px-40 md:py-32 pt-28 bg-white min-h-screen dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-row w-40 px-5 ">
            <div className="text-[16px] font-medium border-2 border-solid border-orange-500 rounded-[50px] gap-2 p-2 flex flex-row items-center justi" onClick={()=>navigate("/cars")}>
            <FaCircleLeft size={30} color="orange"/><span className="flex flex-row">Go Back</span></div>
            </div>

        {isLoading?<Spinner/>:
      <div className="border-solid shadow-xl flex flex-col md:flex-row justify-center gap-5">
      
        <div className="md:w-1/2 flex flex-col p-5 ">
            <div className="name p-5">
                <h1 className="font-extrabold text-4xl">{car.brand} {car.name}</h1>
            </div>
            <div className="price p-5">
                <h1 className="font-extrabold text-4xl">₹ {car.rateperday} / day</h1>
            </div>
            <div className="img p-2">
                <img src={car.thumbnail} className="rounded-lg md:w-full"></img>
            </div>
        </div>
        <div className="md:w-1/2 flex flex-col p-5 justify-center items-center">
        <div className="p-2 items-start">
        <h1 className="font-extrabold text-4xl underline text-orange-800">Technical Specifications</h1>
        </div>
        <div className="grid grid-cols-3 p-3 gap-8 justify-items-center">
        <div className="md:p-5 md:w-[115px] text-lg text-orange-600 p-2">
            <dd><GiGearStickPattern size={40}/></dd>
            <dt className="text-xl font-medium">GearBox</dt>
            <dd className="text-lg">{car.gear}</dd>
            
        </div>
        <div className="md:p-5 md:w-[115px] text-lg text-orange-600 p-2">
            <dd><FaGasPump size={40}/></dd>
            <dt className="text-xl font-medium">Fuel</dt>
            <dd className="text-lg">{car.fuel}</dd>
            
        </div>
        <div className="md:p-5 md:w-[115px] text-lg text-orange-600 p-2">
            <dd><MdGpsFixed size={40}/></dd>
            <dt className="text-xl font-medium">GPS</dt>
            <dd className="text-lg">Track Car</dd>
            
        </div>
        <div className="md:p-5 md:w-[115px] text-lg text-orange-600 p-2">
            <dd><MdEventSeat size={40}/></dd>
            <dt className="text-xl font-medium">Seats</dt>
            <dd className="text-lg">{car.capacity}</dd>
            
        </div>
        <div className="md:p-5 md:w-[115px] text-lg text-orange-600 p-2">
            <dd><MdOutlineAir size={40}/></dd>
            <dt className="text-xl font-medium">Air Bags</dt>
            <dd className="text-lg">2</dd>
            
        </div>
        <div className="md:p-5 md:w-[115px] text-lg text-orange-600 p-2">
            <dd><FaRegSnowflake size={40}/></dd>
            <dt className="text-xl font-medium">AC</dt>
            <dd className="text-lg">Yes</dd>
            
        </div>
       
        
        </div>
        <div className=" p-2 pt-10">
        <button onClick={()=>handleBookNow()} className="w-[350px] rounded-lg p-5 bg-orange-500 text-2xl md:text-4xl text-white"
        >
          Book Now
        </button>
        </div>
        </div>
      </div>}
      <div className="border-solid shadow-xl bg-white p-5" >
      <ReviewComponent/>
      </div>
      
    </div>
  );
};

export default CarTechnicalsPage;
