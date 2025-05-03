import React from 'react'
import banner from "../../assets/images/hostBanner.jpg";
import { FaLaugh,FaMoneyBill,FaMapMarkerAlt  } from "react-icons/fa";

import { Link } from 'react-router-dom';
import Faqs from '../Faqs';

const HostPage = () => {
 
  return (
    <div className=' flex flex-col min-h-screen dark:bg-gray-900 dark:text-white bg-slate-200 pb-24'>
    <div className='flex lg:flex-row flex-col justify-center items-top gap-10 py-32 px-16'>
    <div className='leftLayout md:w-1/2 pt-10 flex flex-col gap-y-5 justify-center items-center'>
        <h1 className='font-extrabold text-4xl'>Own a Car?</h1>
        <h1 className='font-extrabold md:text-4xl'>Host it on GOB Cars!</h1>
        <p className='font-medium text-xl'>Join as a host for earning from India's largest car-sharing marketplace.</p>
      <div className='rounded-[50px] flex justify-center items-center text-center homeBtn w-40 '>
        <Link type='submit' to={"login"}><span>Join Now</span></Link></div>
      
      <div className="pt-10">
       <table className='table-fixed w-full text-center'>
        
            <tbody>
                <tr>
                <th className="text-center pr-16 justify-items-center"><FaLaugh size={70} color='#043774'/></th>
                <th className="text-center justify-items-center" ><FaMoneyBill size={70} color='#043774'/> </th>
                <th className="text-center justify-items-center"><FaMapMarkerAlt size={70} color='#043774'/></th>
                </tr>
               
            <tr>
                <td className='pr-16 pt-3'><h1>35K+</h1></td>
                <td><h1 className='pt-3' >₹1Cr+</h1></td>
                <td><h1 className='px-16 pt-3'>90+</h1></td>
            </tr>
            <tr>
                <td className='text-wrap text-xl font-semibold align-top pr-16 text-center'>Live Hosts</td>
                <td className='text-wrap text-xl font-semibold align-top w-4 text-center'>Earned by Hosts last year</td>
                <td className='text-wrap text-xl font-semibold px-16 align-top text-center'>Cities</td>
            </tr>
        </tbody>
       </table>
      </div>
      </div>
      <div className='rightLayout md:w-1/2 flex-col' >
        <div className=''>
            <img src={banner} className='object-contain rounded-[50px] '/>
        </div>
      </div>
    </div>.
<div className='flex-flex-col justify-center items-center'>
<Faqs data="hostfaqs"/>
</div>

      
      </div>
  )
}

export default HostPage