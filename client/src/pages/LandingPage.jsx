import React, { useState } from "react";
import CarModelDropDown from "../components/CarModelDropDown";
import CarSeaterDropDown from "../components/CarSeaterDropDown";
import Datepicker from "react-tailwindcss-datepicker";
// import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import {searchStart} from "../redux/slices/searchSlice";
import { Link,useNavigate} from 'react-router-dom';

function LandingPage() {

  const [selectedModel,setSelectedModel]=useState("");
  const [selectedSeater,setSelectedSeater]=useState("");
  const [pickupDate,setPickupDate]=useState("");
  const [returnDate,setReturnDate]=useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const MIN_DATE = new Date();
  MIN_DATE.setDate(MIN_DATE.getDate() - 0);
const handleClick=()=>{
   dispatch(
      searchStart({
        model:selectedModel,
        seater:selectedSeater,
        pickupdate:pickupDate.startDate,
        returndate:returnDate.startDate,
 
      }))
      navigate("/cars");
}
  return (
    <div
      id="landingpage"
      className="bg-[url(./src/assets/images/homepage.jpg)] dark:bg-[url(./src/assets/images/homepage_nightmode2.jpg)] transition-bg ease-in duration-700 contrast-125 pt-20 min-w-screen min-h-screen px-10 md:px-40 bg-cover dark:bg-gray-900 "
    >
     

      <div className="largeHeading p-16 md:pt-32 w-[75%] h-[50%] ">
        <p className="text-sky-950 homeTitle  text-2xl font-extrabold md:text-5xl">
          FAST AND EASY
          <br /> WAY TO RENT A CAR
        </p>
      </div>
      <div className="intBtns sm:py-20 p-16 justify-start flex flex-col sm:flex-row">
       
        <div className="p-1"></div>
        <div className='rounded-[50px] flex justify-center items-center text-center homeBtn min-w-fit '>
        <Link to="cars" ><span>BOOK NOW</span></Link></div>
      </div>
      
        <div className="searchLayout glassbg m-16 p-5 md:mx-20 md:grid-cols-1 bg-slate-100 grid grid-cols-1 md:max-w-fit md:flex md:flex-row gap-5 items-center border-2 border-solid border-white rounded-lg dark:bg-sky-950  ">
        <div className="min-w-40">
        <CarModelDropDown selectedModel={selectedModel} setSelectedModel={setSelectedModel}/>
        </div>
          
          <div className="min-w-40">
          <CarSeaterDropDown selectedSeater={selectedSeater} setSelectedSeater={setSelectedSeater} />
          </div>
    
          <div className="flex flex-col">
        <label htmlFor="pickupid" className="block font-medium text-slate-200 text-xl txt-shadow">PickUp Date</label>
            <Datepicker 
        asSingle={true}   minDate={MIN_DATE} useRange={false} inputId="pickupid" placeholder="DD-MM-YYYY" popoverDirection="down"
            inputName="datepicker" inputClassName=" rounded-md min-h-10 w-full text-xl focus:ring-0 p-1 placeholder:text-gray-400 text-black dark:placeholder:text-gray-600"
            value={pickupDate} displayFormat="DD-MMM-YYYY" containerClassName="relative mt-2  flex flex-row border-2 border-solid border-black rounded-lg"
            onChange={(newValue)=>setPickupDate(newValue)}
        /> 
    </div>
    <div className="flex flex-col">
        <label htmlFor="returnid" className="block font-medium text-slate-200 text-xl txt-shadow">Return Date</label>
            <Datepicker 
        asSingle={true}   minDate={MIN_DATE} useRange={false} inputId="returnid" placeholder="DD-MM-YYYY" popoverDirection="down"
            inputName="datepicker" inputClassName=" rounded-md min-h-10 w-full text-xl p-1 placeholder:text-gray-400 text-black dark:placeholder:text-gray-600"
            value={returnDate} displayFormat="DD-MMM-YYYY" containerClassName="relative mt-2 flex flex-row border-2 border-solid border-black rounded-lg"
            onChange={newValue => setReturnDate(newValue)}
        /> 
    </div>
          
          <button className="searchBtn" onClick={handleClick}>
            <span>Search</span>
          </button> 
        
        </div>
     
    </div>
  );
}

export default LandingPage;
