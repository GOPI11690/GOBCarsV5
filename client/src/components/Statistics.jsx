import React from 'react'

function Statistics() {
  return (
    <div className='grid grid-cols-2 gap-4 px-36 sm:grid-cols-2'>
    <div className="flex flex-col rounded-lg border border-sky-600 hover:bg-gray-200 hover:border-gray-200 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">
        Trips
      </dt>
      <dd className="text-4xl font-extrabold mb-4 text-sky-950 md:text-5xl dark:text-sky-500 dark:hover:text-sky-950">
        3k+
      </dd>
    </div>
    
    <div className="flex flex-col rounded-lg border border-sky-600 hover:bg-gray-200 hover:border-gray-200 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">
        Happy Customers
      </dt>
      <dd className="text-4xl font-extrabold mb-4 text-sky-950 md:text-5xl dark:text-sky-500 dark:hover:text-sky-950">
        1.5k+
      </dd>
    </div>
    
    <div className="flex flex-col rounded-lg border border-sky-600 hover:bg-gray-200 hover:border-gray-200 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">
        Cars
      </dt>
      <dd className="text-4xl font-extrabold mb-4 text-sky-950 md:text-5xl dark:text-sky-500 dark:hover:text-sky-950">
        30+
      </dd>
    </div>
    
    <div className="flex flex-col rounded-lg border border-sky-600 dark:hover:text-sky-950 hover:bg-gray-200 hover:border-gray-200 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">
        Years of Experience
      </dt>
      <dd className="text-4xl font-extrabold mb-4 text-sky-950 md:text-5xl dark:text-sky-500 dark:hover:text-sky-950">
        10+
      </dd>
    </div>
  </div>
  )
}

export default Statistics