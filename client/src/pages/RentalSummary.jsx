import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from 'react-redux';
import { getRental } from '../utils/ApiCalls';
import { useNavigate } from 'react-router-dom';
import {  FaCircleArrowRight ,FaCircleArrowLeft     } from "react-icons/fa6";

const RentalSummary = () => {
    const search = useSelector((state) => state.search.search);
    const [rental,setRental]=useState({});
    const navigate=useNavigate();
    const DATE_OPTIONS = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    const getRentalDetail=async()=>{
        try{
            const response=await getRental(search.rentalid);
            setRental(response.data.rental);
            console.log(rental)
        }
        catch(e){
            throw new Error("Error in get rental summary",e);
        }
    }
    useEffect(() => {
        getRentalDetail()
    },[])
  return (
    <div className='flex flex-col min-w-screen justify-center md:py-20 md:px-10 items-center bg-white'>
     
            <div className='flex flex-col gap-5 w-3/4 px-10 md:px-16  bg-slate-100  rounded-xl'>
              <div className='heading flex flex-row items-center justify-center '>
                <h3 className='text-2xl font-bold p-10'>Rental Summary</h3>
              </div>          
            <div className='text-xl '>
                Your rental details summary given below.
                
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div className='flex-flex-col'>
                    <div>
                        <label className='text-gray-500'>Booking Date</label>
                    </div>
                    <div className='pt-4'>
                    <label>{new Date(rental.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}</label>
                    </div>                  
                </div>
                <div>
                    <div>
                        <label className='text-gray-500'>Rental ID</label>
                    </div>
                    <div className='pt-4'>
                        <label>{rental._id}</label>
                    </div>
                </div>
                <div className='flex-flex-col'>
                    <div>
                        <label className='text-gray-500'>Start from</label>
                    </div>
                    <div className='pt-4'>
                    <label>{new Date(rental.startdate).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}</label>
                    </div>                  
                </div>
                <div className='flex-flex-col'>
                    <div>
                        <label className='text-gray-500'>End at</label>
                    </div>
                    <div className='pt-4'>
                    <label>{new Date(rental.returndate).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}</label>
                    </div>                  
                </div>
                <div>
                    <div>
                        <label className='text-gray-500'>Payment Type</label>
                    </div>
                    <div className='pt-4'>
                        <label>Card Payment</label>
                    </div>
                </div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div className='flex-flex-col'>
                    
                <div className='image px-10 py-3'>
          <img src={search.carimg} className='h-20'></img>
        </div>                  
                </div>
                <div>
                    <div>
                        <label className='text-black'>{search.carname}</label>
                    </div>
                    <div className='pt-4'>
                        <label>{search.cartype}</label>
                    </div>
                </div>
                <div>
                    
                    <div className=''>
                        <label>Total Days : {search.totrentdays}</label>
                    </div>
                </div>
                <div>
                    
                    <div className=''>
                        <label>Rs. {search.carrent}/day</label>
                    </div>
                </div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div>Sub Total</div><div>Rs. {search.totrentdays*search.carrent}</div>
            </div>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div>Taxes :</div><div>{search.totrentdays*search.carrent*0.18}</div>
            </div>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div>Security Deposit</div><div>Rs. 10000</div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div>Total</div><div>{(search.totrentdays*search.carrent)+(search.totrentdays*search.carrent*0.18)+10000}</div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div>
                <div className='pt-5'>We'll send the rental confirmation before rental start. We appreciate your business, and hope you enjoy your purchase.</div>
                <div className='py-10'>Thank you!</div>
            </div>
            <div>
            <div className='py-5 flex flex-row gap-5'>
        <button className="w-full flex text-center cursor-pointer items-center text-black rounded-[50px] border-2 border-sky-900 border-solid hover:border-sky-600 px-3"
              type="button" onClick={() =>navigate("/home") }><FaCircleArrowLeft  size={25} color="blue" className="hidden md:flex"/>
                        <span className="text-xs md:text-[18px] font-bold px-2 text-blue-900">Go to Homepage</span></button> 
        
        
                        <button onClick={handlePrint}>Print this page</button>
        
        <button onClick={()=>navigate("/userpage")} className="w-full flex text-center cursor-pointer items-center text-black  rounded-[50px] border-2 border-sky-900 border-solid hover:border-sky-600 px-3"
              type="button"><FaCircleArrowRight  size={25} color="blue" className="hidden md:flex"/>
                        <span className="text-xs md:text-[18px] font-bold px-2 text-blue-900">Go to Dashboard</span></button>
              
          </div>
            </div>




            </div>
            
    
            </div>
  )
}

export default RentalSummary