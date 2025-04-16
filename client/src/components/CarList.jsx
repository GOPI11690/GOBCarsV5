const CarList = ({filteredProductList, loading}) => {
  
    if(loading)
      return <>Loading</> // use your loading state or component
  
    return (
      <div className="w-full h-[85%] px-5 dark:bg-gray-900">
          
          <div className="w-full h-full flex flex-wrap gap-1 justify-between items-start overflow-y-auto">
              {
                  filteredProductList.map((car,index) => (
                      <div key={index} className='w-[25%] h-fit my-3 rounded-xl overflow-hidden border-gray-200 border-2 border-solid p-3'>
                          <img
                              src={car.thumbnail}
                              alt='product'
                              className='w-full h-28 object-cover'
                          />
                          <div className="mt-2 mb-2 px-3 dark:text-white" >
                              <div className="font-semibold">
                              {car.brand} {(car.name.length > 25)? car.name.substring(0,22) + '...': car.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                  {car.type}
                              </div>
                              <div className="font-semibold">
                                 <p>Rs. {car.rateperday} per/day </p>
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