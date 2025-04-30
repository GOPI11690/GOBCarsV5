import React from "react"

const CarList = ({filteredProductList, loading}) => {
  
    if(loading)
      return <>Loading</> // use your loading state or component
  
    return (
      <div className="w-full px-5 dark:bg-gray-900">
          
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 justify-between items-start overflow-y-auto">
              {
                  filteredProductList.map((car,index) => (
                      <div key={index} className='h-fit my-3 rounded-xl overflow-hidden border-gray-200 border-2 border-solid p-3'>
                          <img
                              src={car.thumbnail}
                              alt='product'
                              className='w-full h-28 object-contain'
                          />
                          <div className="mt-2 mb-2 px-3 dark:text-white" >
                              <div className="font-semibold">
                              {car.brand} {(car.name.length > 25)? car.name.substring(0,22) + '...': car.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                  {car.type}
                              </div>
                              <div className="font-semibold flex flex-row justify-between">
                                <div className="w-1/2 flex flex-row items-center justify-start">
                                    <p>Rs. {car.rateperday}/day </p>
                                </div>
                                <div className="w-1/2 flex flex-row items-center justify-end">
                                <button className="min-w-fit bg-green-500 py-2 text-center items-center text-xl rounded-md hover:bg-green-700 text-white">Book Now</button>
                                </div>
                                 
                              </div>
                          </div>
                      </div>
                  ))
              }
              
          </div>
      </div>
    )
  }
  
  export default CarList