import React from "react";
import CarModelDropDown from "../components/CarModelDropDown";
import CarSeaterDropDown from "../components/CarSeaterDropDown";
import DatePicker from "../components/DatePicker";

function LandingPage() {
  return (
    <div id="landingpage" className="bg-[url(./src/assets/images/homepage.jpg)] contrast-125 pt-20 min-w-max min-h-screen bg-cover bg-repeat-x dark:bg-gray-900 ">
      <section className="relative py-10">
        <div className="absolute top-16 left-24">
          <p className="text-sky-950 homeTitle text-2xl font-extrabold md:text-5xl">
            FAST AND EASY
            <br /> WAY TO RENT A CAR
          </p>
          <div className="absolute top-40 left-0 flex flex-col sm:flex-row" >
          <button className="homeBtn"> <span>Booking Now</span>
          </button>
          <div className="p-1"></div>
            <button className="homeBtn"><span>See All Cars</span></button>
          </div> 
          
        </div>
        <div className='absolute w-4/5 top-96 left-24 outline-white outline-2 rounded-lg'>
            <div className="p-2 h-60 sm:h-24 grid grid-cols-2 sm:grid-cols-max sm:grid-flow-col gap-4 items-center border-2 border-solid border-white rounded-lg dark:bg-sky-950 bg-slate-100 ">
             <CarModelDropDown/>
             <CarSeaterDropDown/>   
             <DatePicker inputid="pickupDateId" name="Pickup Date"/>
             <DatePicker inputid="returnDateId" name="Return Date"/>
             
             <button className="searchBtn"><span>Search</span></button>
            </div>
          
          </div>
      </section>
    </div>
  );
}

export default LandingPage;
