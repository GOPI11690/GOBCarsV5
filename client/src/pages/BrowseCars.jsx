import React from 'react'
import ListViewCars from "../components/ListViewCars";
import { useSelector } from "react-redux";


function BrowseCars() {
  
  let category=["SUV","Sedan","Hatchback","Van","4-Seater","7-Seater","10-Seater"];
  const search = useSelector((state) => state.search.search);
  if(search!==null) {
    if(search.model!==null||search.seater!==null)
    category=[search.model,search.seater];
  }
  

  return (
    <div id='browseCars' className="py-20 px-10 md:px-40 min-h-screen bg-slate-100 dark:bg-gray-900">
      <div>
        <h1 className='text-3xl sm:text-3xl w-2/6 font-extrabold txt-color pb-5 pt-10 px-10 dark:text-sky-500'>Browse Cars</h1>
      </div>
      <div className='px-10 py-2'>
        <p  className="text-gray-900 text-lg dark:text-white pb-5 md:text-xl">
        Discover convenience at your doorstep. Our Cars service ensures a prompt and accessible rental experience. Find the perfect vehicle right in your neighborhood for a seamless journey.
        </p></div>
        <div className=''>
            <ListViewCars fillCategory={category}/>
        </div>
    </div>
  )
}

export default BrowseCars