import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function CheckInCheckOut() {
 
    const [switchAuth, setSwitchAuth] = useState(true);
  return (
    <div className="pt-20 md:px-40 md:min-h-screen flex items-center justify-center bg-[url(./src/assets/images/loginimg.jpg)] bg-cover bg-repeat-x ">
      <div className="min-w-fit  sm:h-[70%] flex justify-center items-center flex-col glassbg shadow-xl ">
        {switchAuth?<div className="rightLayout flex flex-row ">
        <div className="flex flex-col w-1/2 gap-5 justify-center items-center p-10">
    <h1 className="font-extrabold text-2xl md:text-4xl text-white txt-shadow">Welcome Back</h1>
    <p className="font-medium text-center md:text-lg text-sm md:leading-7  text-white txt-shadow ">To keep connected with us please login with your personal info</p>
    <p className='text-center mb-10 font-medium text-white txt-shadow '>Don't have an account yet?  
                    </p>
                    <div className="flex items-center justify-center"><span className='text-blue-500 underline cursor-pointer signBtn' 
                    onClick={()=>setSwitchAuth((value)=>!value)}> 
                    Sign Up</span></div>
    </div>
    <div className="w-1/2"><SignIn/></div>
    
        </div>:
        
        <div className="leftLayout flex flex-row">
          <div className="w-1/2 flex items-center justify-center flex-shrink-1 pt-8"><SignUp/></div>
          <div className="w-1/2 flex flex-col justify-center items-center p-10 text-white ">
            <h1 className="font-extrabold m-0 text-4xl txt-shadow">Hello, Friend!</h1>
            <p className="font-medium text-lg text-center leading-7 mx-4 my-7 txt-shadow ">
              Enter your personal details and start journey with us
            </p>
            <p className="text-center mb-5 pt-12 font-medium dark:text-white">
              Already have an account?
            </p>
            <div>
              <span
                className="text-blue-500 underline mx-5 cursor-pointer signBtn"
                onClick={() => setSwitchAuth((value) => !value)}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default CheckInCheckOut;
