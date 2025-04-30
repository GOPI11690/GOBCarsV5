import React from 'react'
import whychoose from "../assets/images/cityImg2sm.png";
import Statistics from '../components/Statistics';


function Whychooseus() {
  return (
  <div className='pt-15 md:px-40 bg-white min-h-screen dark:bg-gray-900'>
<div className='flex flex-wrap pt-15 lg:justify-center'>
        <h2 className='text-3xl sm:text-4xl font-extrabold txt-color pt-24 dark:text-sky-500'>Why Choose Us</h2></div>
        <section className="relative z-0 py-10">
        
    <div className="grid container mx-auto pt-10 p-8 grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
      <div className="mx-auto max-w-lg">
        <img className='rounded-lg' src={whychoose} />
       
        </div>

    <Statistics/>

        </div>
              
   
    </section>
  </div>
    
    
    

  )
}

export default Whychooseus