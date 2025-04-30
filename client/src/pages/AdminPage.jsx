import React,{ useState }  from 'react'
import { useSelector } from "react-redux"
import {Link, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from '../components/adminModel/views/AdminDashboard';
import AdminCars from '../components/adminModel/views/AdminCars';
import AdminReviews from '../components/adminModel/views/AdminReviews';
import AdminBookings from '../components/adminModel/views/AdminBookings';
function AdminPage() {
  const user = useSelector((state) => state.user.user);

  const [isDashActive, setDashActive] = useState("showDiv ")
  const [isTranActive, setTranActive] = useState("")
  const [isReviewActive, setReviewActive] = useState("")
  const [isCarsActive, setCarsActive] = useState("")
  
  const isUserAuthenticated = useSelector(
    state => state.user.isUserAuthenticated
  )
  if (!isUserAuthenticated) {
    return <Navigate to="/" />
  }
  const toggleClass = (e,type) => {
    e.preventDefault();
    if(type=="review"){
      setDashActive("")
      setTranActive("")
      setCarsActive("")
      setReviewActive("showDiv ")
    }else if(type=="transaction"){
      setDashActive("")
      setTranActive("showDiv ")
      setCarsActive("")
      setReviewActive("")
    }
    else if(type=="cars"){
      setDashActive("")
      setTranActive("")
      setCarsActive("showDiv ")
      setReviewActive("")
    }
    else {
      setDashActive("showDiv ")
      setTranActive("")
      setCarsActive("")
      setReviewActive("")
    }
    }

  return (

    <div className="p-20 md:px-40 bg-slate-100 dark:bg-gray-900 dark:text-white border-solid min-h-screen shadow-xl grid grid-flow-col grid-rows-10 gap-10">
      <div className='sidebar shadow-xl dark:shadow-slate-300 row-span-full rounded-2xl col-span-1 pt-5'>
      <div className='p-3 text-xl'>
        <h3 className='text-lg font-bold'>Home</h3>
        <div onClick={(e)=>toggleClass(e,"dashboard")} className={isDashActive+"hover:bg-[#0EA5E9] p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link  to="admindashboard">Dashboard</Link>
        </div>
        
      </div>
      {(user.roles.includes("admin"))?
        <div className='p-3 text-xl'>
        <h3 className='text-lg font-bold'>Cars</h3>
        <div onClick={(e)=>toggleClass(e,"cars")} className={isCarsActive+"hover:bg-[#0EA5E9] p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link  to="admincars">Cars Details</Link>
        </div>
        
      </div>
      :""}
      <div className='p-3 text-xl py-2'>
        <h3 className='text-lg font-bold'>Transactions</h3>
        <div onClick={(e)=>toggleClass(e,"transaction")} className={isTranActive+"hover:bg-[#0EA5E9] p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link  to="adminbookings">Bookings Details</Link>
        </div>
        <div onClick={(e)=>toggleClass(e,"review")} className={isReviewActive+"hover:bg-[#0EA5E9] p-3 hover:text-white hover:font-bold shadow-sm"}>
        <Link to="adminreviews">Reviews</Link>
        </div>
        
      </div>
     
      </div>
      
        <div className='main shadow-xl rounded-2xl row-span-full col-span-10 p-5 dark:shadow-slate-300'>
       <Routes>
       <Route path='adminpage' element={<AdminPage/>}/>
       <Route index element={<AdminDashboard />} />
       <Route path='admindashboard' element={<AdminDashboard />} />
        <Route path='adminbookings' element={<AdminBookings/>}/>     
        <Route path='adminreviews' element={<AdminReviews/>}/>
        <Route path="admincars" element={<AdminCars />}/> 
        <Route path='adminpage/*' element={<AdminPage/>}/>
         {/* </Route> */}
        </Routes>
    
      
      </div>
      
    
      </div>
  
  )
}

export default AdminPage
