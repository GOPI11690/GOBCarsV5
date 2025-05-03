import React, { useEffect, useState } from "react";
import { FaGasPump, FaCar } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { MdEventSeat } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {searchStart} from "../redux/slices/searchSlice";
import { useNavigate} from 'react-router-dom';
import { GetAllCars } from "../utils/ApiCalls";
import Spinner from "./loading/Spinner";

const ListViewCars = ({ fillCategory }) => {
  const search = useSelector((state) => state.search.search);
  const [carList, setCarList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCarList, setFilteredCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const category = [
    "SUV",
    "Sedan",
    "Hatchback",
    "Van",
    "4-Seater",
    "7-Seater",
    "10-Seater",
  ];
  const [carToShow, setCarToShow] = useState(5);
  const loadMoreProducts = () => {
    if (carToShow >= filteredCarList.length) {
      alert("No more cars to show");
      return;
    } else {
      setCarToShow((prevCarToShow) => prevCarToShow + 5);
    }
  };
  const addCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const removeCategory = (category) => {
    if (selectedCategories.includes(category)) {
      const removedList = selectedCategories.filter(
        (item) => item !== category
      );
      setSelectedCategories(removedList);
    }
  };

  const resetCategory = () => {
    setCategories(category);
    setSelectedCategories([]);
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredCarList(carList);
    } else {
      setFilteredCarList(
        carList.filter(
          (item) =>
            selectedCategories.includes(item.type) ||
            selectedCategories.includes(item.capacity)
        )
      );
    }
  }, [selectedCategories, carList]);

  const getCategories = () => {
      setCategories(fillCategory);    
    }
 
  const getCars = async () => {
    setLoading(true);
    const response=await GetAllCars()
        setCarList(response.data.Cars.cars);
        setFilteredCarList(response.data.Cars.cars);
        getCategories(); // get the categories list
        setLoading(false);
      ;
  };

  useEffect(() => {
    getCars();
    setLoading(false);
  }, []);

const handleSelect=async (car)=>{
  if(search!==null){
    await dispatch(
      searchStart({
        model:search.model,
        seater:search.seater,
        pickupdate:search.pickupdate,
        returndate:search.returndate,
        carid:car._id,
        carimg:car.thumbnail,
        carrent:car.rateperday,
        carname:car.brand+" "+car.name,
        cartype:car.type
      }))
  }
  else{
    await dispatch(
      searchStart({
        model:null,
        seater:null,
        carid:car._id,
        carimg:car.thumbnail,
        carrent:car.rateperday,
        carname:car.brand+" "+car.name, 
        cartype:car.type,
      }))
     
         
      
    }
    navigate("/cartechnicals");  
        
}



  return (
    <div>{loading?<Spinner/>:<div className="px-10 bg-slate-100 dark:bg-gray-900 dark:text-white border-solid grid grid-rows-5 gap-5">
      <div className="leftLayout lg:grid shadow-md dark:shadow-slate-300 row-span-full rounded-2xl col-span-1 pt-5 ">
        <div className="p-3 text-xl">
          <h3 className="text-lg font-bold">Filter Category</h3>
        {/* </div>
        <div> */}
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  removeCategory(category);
                } else {
                  addCategory(category);
                }
              }}
              className={`sm:text-2xl w-fit p-2 h-8 mx-2 md:px-5 md:py-8 flex flex-col justify-center items-center break-keep rounded-3xl cursor-pointer transition-all duration-300 ${
                selectedCategories.includes(category)
                  ? "border-blue-500 bg-blue-500 text-white"
                  : " border-gray-500 bg-slate-100 text-gray-900 dark:text-white dark:bg-gray-900"
              } `}
            >
              {category.split("*").join(" ")}
            </div>
          ))}
          <div
            onClick={() => resetCategory()}
            className={`${
              selectedCategories.length > 0
                ? "opacity-100"
                : "opacity-0 pointer-events-none "
            } sticky right-0 w-[50%] h-fit mx-2 p-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer text-sm text-bold hover:text-blue-700 transition-all duration-300 dark:bg-gray-900 dark:text-white`}
          >
            CLEAR
          </div>
        </div>
      </div>
      <div className="rightLayout h-fit  rounded-2xl flex flex-col md:row-span-full md:col-span-5 p-5 dark:shadow-slate-300">
        <div className="listView">
          {loading}
          {filteredCarList.slice(0, carToShow).map((car, index) => (
            
            <div
              key={index} onClick={()=>handleSelect(car)}
              className="relative w-full flex flex-col my-2 lg:grid lg:grid-cols-[repeat(3,1fr)] lg:grid-rows-[repeat(1,1fr)] sm:gap-2 shadow-md rounded-xl bg-slate-100 dark:bg-gray-900 border-gray-100 border-2 border-solid p-3 transition-hover ease-in duration-300 hover:bg-sky-200 hover:scale-105"
            >
              <div className=" flex-col flex md:flex-row md:items-center md:justify-start ">
                <img
                  src={car.thumbnail}
                  alt="product"
                  className="h-[250px] w-[350px] md:h-[200px] object-contain"
                /> </div>
                <div className="h-full  dark:text-white ">
                  <div className="px-5 sm:px-10 py-5 text-xl text-wrap lg:text-2xl font-semibold h-1/2">
                    {car.brand}{" "}
                    {car.name.length > 25
                      ? car.name.substring(0, 22) + "..."
                      : car.name}{" "}
                    2024
                  </div>
                  <div className="lg:p-5 flex flex-row">
                    <div className="lg:p-5 p-1 text-sm lg:text-xl text-sky-600 ">
                      <FaGasPump />
                      {car.fuel}
                    </div>
                    <div className="lg:p-5 p-1 text-sm lg:text-xl text-sky-600 ">
                      <GiGearStickPattern />
                      {car.gear}
                    </div>
                    <div className="lg:p-5 p-1 text-sm lg:text-xl text-sky-600 ">
                      <MdEventSeat />
                      {car.capacity}
                    </div>
                    <div className="lg:p-5 p-1 text-sm lg:text-xl text-sky-600 ">
                      <FaCar />
                      {car.type}
                    </div>
                  </div>
                </div>

               
             
              <div className="  flex flex-col items-center justify-center">
                  <p className="text-xl lg:text-3xl font-bold">
                    ₹ {car.rateperday}/day{" "}
                  </p>
                </div>
              <div className="absolute rounded-bl-lg rounded-tr-lg right-0 top-0 px-4 h-8 bg-sky-500 text-white">
                  {" "}
                  Brand New Car
                </div>
             
            </div>
          ))}
        </div>
        <button
          className="p-5 bg-sky-500 text-white"
          onClick={loadMoreProducts}
        >
          Load More
        </button>
      </div>
    </div>}</div>
    
  );
};

export default ListViewCars;
