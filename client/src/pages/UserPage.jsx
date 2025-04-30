import React,{ useState }  from 'react'
import { useSelector } from "react-redux"
import {Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import "./UserPage.css"

import UserDashboard from '../views/UserDashboard';
import UserBookings from '../views/UserBookings';
import UserReviews from '../views/UserReviews';
import DealerCars from "../views/DealerCars";

function UserPage() {
  
    const user = useSelector((state) => state.user.user);
  
  const [isDashActive, setDashActive] = useState("showDiv ")
  const [isTranActive, setTranActive] = useState("")
  const [isReviewActive, setReviewActive] = useState("")
  const [isDealerActive, setDealerActive] = useState("")
  
  const toggleClass = (e,type) => {
    e.preventDefault();
    if(type=="review"){
      setDashActive("")
      setTranActive("")
      setDealerActive("")
      setReviewActive("showDiv ")
    }else if(type=="transaction"){
      setDashActive("")
      setTranActive("showDiv ")
      setDealerActive("")
      setReviewActive("")
    }
    else if(type=="dealer"){
      setDashActive("")
      setTranActive(" ")
      setDealerActive("showDiv ")
      setReviewActive("")
    }
    else {
      setDashActive("showDiv ")
      setTranActive("")
      setDealerActive("")
      setReviewActive("")
    }
    }
  
  const isUserAuthenticated = useSelector(
    state => state.user.isUserAuthenticated
  )
  if (!isUserAuthenticated) {
    return <Navigate to="/" />
  }

  return (

    <div className="p-20 md:px-40 bg-slate-100 dark:bg-gray-900 dark:text-white border-solid min-h-screen shadow-xl md:grid  md:grid-rows-10 gap-10">
      <div className='sidebar shadow-xl dark:shadow-slate-300 md:row-span-full rounded-2xl md:col-span-1 pt-5'>
      <div className='p-3 text-xl'>
        <h3 className='text-lg font-bold'>Home</h3>
        <div onClick={(e)=>toggleClass(e,"dashboard")} className={isDashActive+"hover:bg-[#0EA5E9] p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link  to="userdashboard">Dashboard</Link>
        </div>
        
      </div>
      {(user.roles.includes("dealer"))?
        <div className='p-3 text-xl'>
        <h3 className='text-lg font-bold'>Cars</h3>
        <div onClick={(e)=>toggleClass(e,"dealer")} className={isDealerActive+"hover:bg-[#0EA5E9] p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link  to="dealercars">Cars Details</Link>
        </div>
        
      </div>
      :""}
      <div className='p-3 text-xl py-2'>
        <h3 className='text-lg font-bold'>Transactions</h3>
        <div onClick={(e)=>toggleClass(e,"transaction")} className={isTranActive+"hover:bg-[#0EA5E9] relative cursor-pointer h-16 p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link  to="userbookings" className='absolute top-0 left-0 w-full h-full'>Bookings Details</Link>
        </div>
        <div onClick={(e)=>toggleClass(e,"review")} className={isReviewActive+"hover:bg-[#0EA5E9] p-3 relative cursor-pointer h-10 hover:text-white hover:font-bold shadow-sm"}>
        <Link to="userreviews" className='absolute top-0 left-0 w-full h-full'>Reviews</Link>
        </div>
        
      </div>
     
      </div>
      
        <div className='main shadow-xl rounded-2xl md:row-span-full md:col-span-10 p-5 dark:shadow-slate-300'>
       <Routes>
       <Route path='userpage' element={<UserPage/>}/>
       <Route index element={<UserDashboard />} />
       <Route path='userdashboard' element={<UserDashboard />} />
        <Route path='userbookings' element={<UserBookings/>}/>     
        <Route path='userreviews' element={<UserReviews/>}/>
        <Route path="dealercars" element={<DealerCars />}/> 
        <Route path='userpage/*' element={<UserPage/>}/>
         {/* </Route> */}
        </Routes>
    
      
      </div>
      
    
    
      </div>
  
  )
}

export default UserPage