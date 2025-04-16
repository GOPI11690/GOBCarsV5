import React, { useEffect, useState } from 'react'
import CarList from './CarList';

const FilterCars = () => {
  
  const [loading, setLoading] = useState(false);
  const [carAvailable,setCarAvailable]=useState([])
  const [carList, setCarList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCarList, setFilteredCarList] = useState([]);

  const addCategory = (category) => {
    if(!selectedCategories.includes(category)){
        setSelectedCategories(prev => ([...prev, category]))
       
    }     
  }

  const removeCategory = (category) => {
    if(selectedCategories.includes(category)){
        console.log(selectedCategories)
        const removedList = selectedCategories.filter((item) => (item !== category));
        setSelectedCategories(removedList);
    }
  }

  const resetCategory = () => {
    setSelectedCategories([]);
  }

  useEffect(() => {
    if(selectedCategories.length === 0){
        setFilteredCarList(carList);
    } else{
        setFilteredCarList(carList.filter((item)=>(selectedCategories.includes(item.type))));
    }
  }, [selectedCategories, carList])

  const getCategories =  () => {
    try{
        setLoading(true);
        const categories=["SUV","Sedan","Hatchback","Van"];
        setCategories(categories);
    }
    finally{
        setLoading(false)
    }
    
}
  const getCars = async () => {
    setLoading(true);
    
    await fetch('http://localhost:3030/api/car/all')
    .then(res => res.json())
    .then(data => {
        setCarList(data);
        setFilteredCarList(data);
        getCategories(); // get the categories list
    })
    .catch(err => alert(err))
    .finally(()=>{
        setLoading(false);
    })
  }

  useEffect(() => {
    getCars();
  },[carAvailable])
  return (
    <div className='w-screen h-screen px-5 bg-gray-100 flex justify-center items-center dark:bg-gray-900'>
        <div className='w-full h-[90%] rounded-md bg-white dark:bg-gray-900 dark:text-white'> 
            <div className='relative w-full h-[15%] flex items-center overflow-x-auto'>
                <span className='mx-3 ml-5 text-xl font-semibold dark:bg-gray-900 dark:text-white'> Categories: </span>
                {
                    categories.map((category,index) => (
                        < div key={index}
                            onClick={() => {
                                if(selectedCategories.includes(category)){
                                    removeCategory(category);
                                } else{
                                    addCategory(category);
                                }
                            }} 
                            className={`text-xl w-fit min-w-fit h-8 mx-2 px-5 py-2 flex flex-row justify-center items-center border break-keep rounded-3xl cursor-pointer transition-all duration-300 ${(selectedCategories.includes(category))?'border-blue-500 bg-blue-500 text-white':' border-gray-500 bg-white text-gray-900'} `}>
                            {category.split("-").join(" ")}
                        </div>
                    ))
                }
                <div
                    onClick={() => resetCategory()} 
                    className={`${(selectedCategories.length>0)?'opacity-100':'opacity-0 pointer-events-none'} sticky right-0 w-fit h-full px-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer text-base text-bold hover:text-blue-700 transition-all duration-300 dark:bg-gray-900 ml-10 dark:text-white`}
                >
                    CLEAR
                </div>
            </div>
            <CarList filteredProductList={filteredCarList} loading={loading} />
        </div>
    </div>
  )
}

export default FilterCars