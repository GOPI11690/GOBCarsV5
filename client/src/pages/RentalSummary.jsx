import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GetRental } from '../utils/ApiCalls';
import { useNavigate } from 'react-router-dom';
import {  FaCircleArrowRight ,FaCircleArrowLeft     } from "react-icons/fa6";
import { ToWords } from 'to-words';
import Spinner from '../components/loading/Spinner';

const RentalSummary = () => {
    const search = useSelector((state) => state.search.search);
    const [rental,setRental]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const toWords = new ToWords();
    const navigate=useNavigate();
    const DATE_OPTIONS = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
    
    const getRentalDetail=async()=>{
        try{
            const response=await GetRental(search.rentalid);
            setRental(response.data.rental.rental);
            setIsLoading(false);
        }
        catch(e){
            throw new Error("Error in get rental summary",e);
        }
    }
    useEffect(() => {
        getRentalDetail()
    },[search.rentalid])
  return (
    <div className='flex flex-col min-w-screen justify-center md:py-20 md:px-10 items-center bg-white'>
     {isLoading?<Spinner/>:
            <div className='flex flex-col gap-5 w-3/4 px-10 md:px-16  bg-slate-100  rounded-xl'>
              <div className='heading flex flex-row items-center justify-center '>
                <h3 className='text-2xl font-bold px-10 pt-10 pb-5'>Rental Summary</h3>
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
                        <label className='text-black font-bold  '>{search.carname}</label>
                    </div>
                    <div className='font-bold  pt-4'>
                        <label>{search.cartype}</label>
                    </div>
                </div>
                <div>
                    
                    <div className='font-bold'>
                        <label>Total Days : {search.totrentdays}</label>
                    </div>
                </div>
                <div>
                    
                    <div className='font-bold'>
                        <label>Rs. {search.carrent}/day</label>
                    </div>
                </div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div className='font-medium'>Sub Total</div><div className='font-medium'>{search.calculatedata.taxableValue}.00</div>
            </div>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div className='font-medium'>Taxes :</div><div className='font-medium'>{search.calculatedata.sgstValue*2}.00</div>
            </div>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div className='font-medium'>Security Deposit</div><div className='font-medium'>{search.calculatedata.advance}</div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div className='font-bold text-medium'>Total</div><div className='font-bold text-medium'>Rs. {search.calculatedata.totalValue}.00</div>
            </div>
            <span className='border-b-2 border-dashed border-gray-800 w-full'></span>
            {toWords.convert(search.calculatedata.totalValue)} only.
            <div>
                <div className='pt-5'>We'll send the rental confirmation before rental start. We appreciate your business, and hope you enjoy your purchase.</div>
                <div className='py-5'>Thank you!</div>
            </div>
            <div>
            <div className='py-5 flex flex-row gap-5'>
        <button className="w-1/2 flex text-center cursor-pointer items-center hover:bg-sky-400 justify-center text-black rounded-[50px] border-2 border-sky-900 border-solid hover:border-sky-600 px-3"
              type="button" onClick={() =>navigate("/home") }><FaCircleArrowLeft  size={25} color="blue" className="hidden md:flex"/>
                        <span className="text-xs md:text-[18px] font-bold px-2  text-blue-900">Go to Homepage</span></button> 
        
        
                        <button onClick={handlePrint} className='w-1/2 p-3 border-2 border-dashed rounded-[50px] border-gray-500 text-xl font-medium hover:bg-gray-600 hover:text-white'>Print this page</button>
        
        <button onClick={()=>navigate("/userpage")} className="w-1/2 flex text-center hover:bg-sky-400 cursor-pointer justify-center items-center text-black  rounded-[50px] border-2 border-sky-900 border-solid hover:border-sky-600 px-3"
              type="button">
                        <span className="text-xs md:text-[18px] font-bold px-2 text-blue-900">Go to Dashboard</span><FaCircleArrowRight  size={25} color="blue" className="hidden md:flex"/></button>
              
          </div>
            </div>




            </div>}
            
    
            </div>
  )
}

export default RentalSummary