import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
function LeftLayout({className,setSwitchAuth}){
    return (
        <div className={className}>
            <div className="flex flex-col justify-center items-center p-10">
    <h1 className="font-extrabold m-0 text-4xl">Welcome Back</h1>
    <p className="font-medium text-lg leading-7 mx-5 my-7">To keep connected with us please login with your personal info</p>
    <p className='text-center mb-10 dark:text-white'>Don't have an account yet?  
                    </p>
                    <div><span className='text-blue-500 underline cursor-pointer signBtn mx-5' onClick={()=>setSwitchAuth((value)=>!value)}> 
                    Sign Up</span></div>
    </div>
        </div>    )
}
function RightLayout({className,setSwitchAuth}){
    return (<div className={className}>
        <div className="flex flex-col justify-center items-center p-10 ">
        <h1 className="font-extrabold m-0 text-4xl">Hello, Friend!</h1>
        <p className="font-medium text-lg leading-7 mx-5 my-7">Enter your personal details and start journey with us</p>
        <p className='text-center mb-10 dark:text-white'>Already have an account?
                    </p>
                    <div><span className='text-blue-500 underline mx-5 cursor-pointer signBtn'
                    onClick={()=>setSwitchAuth((value)=>!value)}> 
                    Sign In</span></div>
        </div>
    </div>)
}
function SigninSignup() {
  const [switchAuth, setSwitchAuth] = useState(false);
  return (
    <div className="pt-15 bg-slate-100 min-h-screen dark:bg-gray-900">
      <div className="dark:bg-gray-900 bg-slate-100 w-full flex justify-center items-center flex-col">

  
        <div className="flex w-full">
          
          <div className="whitespace-nowrap w-1/2 overflow-hidden">
            <SignIn
              className={`inline-block w-full justify-center transition-all items-center duration-1000 
            ${switchAuth ? "-translate-x-full" : "translate-x-0"}`}
              setSwitchAuth={setSwitchAuth}
            />
            <SignUp
              className={`inline-block w-full justify-center transition-all items-center duration-1000 
            ${switchAuth ? "-translate-x-full" : "translate-x-0"}`}
              setSwitchAuth={setSwitchAuth}
            />
          </div>
          <div className="w-1/2 bg-sky-500 justify-center items-center flex">
          {switchAuth ? <RightLayout className={`justify-center transition-all duration-1000 
            ${switchAuth ? "translate-x-0" : "translate-x-0"}`}
              setSwitchAuth={setSwitchAuth}/> 
              : 
              <LeftLayout className={`justify-center transition-all duration-1000 
                ${switchAuth ? "translate-x-0" : "translate-x-0"}`}
                  setSwitchAuth={setSwitchAuth}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninSignup;
