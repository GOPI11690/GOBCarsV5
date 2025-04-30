import React from "react";
import reviewImage from "../assets/images/reviewImage.png";
import ReviewComponent from "../components/ReviewComponent";

function Reviewpage() {
  return (
    <div id="retrospects" className="py-10 md:px-40 bg-slate-100 dark:bg-gray-900">
      <div className="md:px-28">
        <h1 className='text-3xl sm:text-2xl font-extrabold txt-color pt-24 p-5 dark:text-sky-500'>TRUSTED BY THOUSANDS OF HAPPY CUSTOMERS</h1>
      </div>
      <div className="p-10 flex flex-col md:flex-row md:justify-around md:min-h-fit">
        <div className="align-top md:w-[40%]">
        <p className="text-gray-900 text-xs dark:text-white md:text-xl pb-5">
          Here, you'll find honest feedback from our valued customers, sharing
          their experiences with GOB Cars. Their reviews, insights, and ratings
          provide valuable perspectives to help guide your decisions.
        </p>
        <p className="text-gray-900 text-xs dark:text-white md:text-xl pb-5">
          We believe in transparency and encourage you to read through the
          reviews to make an informed decision. If you've already experienced
          our offerings, feel free to add your own review and help others in
          their journey!
        </p>
        </div>
        <div className=" max-w-xs flex flex-col md:flex-row md:w-[60%] ">
            <img src={reviewImage}/>
        </div>
        
      </div>
    
      <div><ReviewComponent/></div>
      
    </div>
  );
}

export default Reviewpage;
