import React from 'react'
import CarModelDropDown from '../components/CarModelDropDown'
import CarSeaterDropDown from '../components/CarSeaterDropDown'
import FilterCars from '../components/FilterCars'

function BrowseCars() {
  return (
    <div id='browseCars' className="pt-15 bg-slate-100 min-h-screen dark:bg-gray-900">
      <div>
        <h1 className='text-3xl sm:text-3xl w-2/6 font-extrabold txt-color pt-24 dark:text-sky-500'>Browse Cars</h1>
      </div>
      <div className='p-10'>
        <p  className="text-gray-900 text-lg dark:text-white md:text-xl">
        Discover convenience at your doorstep. Our Cars service ensures a prompt and accessible rental experience. Find the perfect vehicle right in your neighborhood for a seamless journey.
        </p></div>
        <div>
            <FilterCars/>
        </div>
    </div>
  )
}

export default BrowseCars