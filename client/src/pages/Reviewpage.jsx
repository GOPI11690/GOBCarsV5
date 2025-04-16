import React from "react";
import reviewImage from "../assets/images/reviewImage.png";
import ReviewComponent from "../components/ReviewComponent";

function Reviewpage() {
  return (
    <div id="retrospects" className="pt-15 bg-slate-100 min-h-screen dark:bg-gray-900">
      <div>
        <h1 className='text-3xl sm:text-3xl w-2/6 font-extrabold txt-color pt-24 dark:text-sky-500'>TRUSTED BY THOUSANDS OF HAPPY CUSTOMERS</h1>
      </div>
      <div className="grid container mx-auto pt-5 p-8 grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-8">
        <div className="align-top">
        <p className="text-gray-900 text-xs dark:text-white md:text-sm pb-5">
          Here, you'll find honest feedback from our valued customers, sharing
          their experiences with GOB Cars. Their reviews, insights, and ratings
          provide valuable perspectives to help guide your decisions.
        </p>
        <p className="text-gray-900 text-xs dark:text-white md:text-sm pb-5">
          We believe in transparency and encourage you to read through the
          reviews to make an informed decision. If you've already experienced
          our offerings, feel free to add your own review and help others in
          their journey!
        </p>
        </div>
        <div className="mx-auto max-w-xs">
            <img src={reviewImage}/>
        </div>
        
      </div>
      <div>
        <h1 className='text-xl sm:text-2xl w-2/6 font-bold txt-color pt-5 dark:text-sky-500'>Why do our customers love us?</h1>

      </div>
      <div><ReviewComponent/></div>
      
    </div>
  );
}

export default Reviewpage;
