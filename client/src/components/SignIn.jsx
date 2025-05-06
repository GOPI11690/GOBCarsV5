import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailed,
  loginStart,
  loginSuccessful,
} from "../redux/slices/userSlice";
import { UserLogin } from "../utils/ApiCalls";
import {useNavigate } from "react-router-dom";
import ProgressBar from "./loading/ProgressBar";
 
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 

  const dispatch = useDispatch();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);}
  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    if (!email.includes('@')) {
      setMessageFailed("Invalid email format");
    }
    else if (!password) {
      setMessageFailed("Please enter the Password");
    }
    else{
      setIsLoading(true);
// set configurations
dispatch(loginStart());
try{
  await new Promise(resolve => setTimeout(resolve, 1000))
  const response =await UserLogin(email,password)

    if(response.data.user){
    const {_id,
    name,
    email,
    roles,
    contact,
    userstatus,
    isVerified,
    lastLogin,createdAt
  } = response.data.user;

  setMessageSuccess(response.data.message)
  dispatch(
    loginSuccessful({
      _id,
      name,
      email,
      roles,
      contact,
      userstatus,
      isVerified,
      lastLogin,
      createdAt
    })
  )

  
  setTimeout(() =>{
    setMessageSuccess("");
    resetForm()
    setIsLoading(false);
    if(roles.includes("admin")){
      navigate("/adminpage")
    }else if(roles.includes("dealer")){
      navigate("/userpage")
    }else{
      navigate("/home");
    }}, 500);
 
}
} catch (error) {
  setIsLoading(false);
  dispatch(loginFailed(error.response.data.message))

  setMessageFailed(error.response.data.message)
  setTimeout(() => setMessageFailed(""), 2000)
}
    }

    
      
  }
  return (
    
      <div className=" pt-10 items-center">
        <div className="bg-transparent flex flex-col justify-center items-center">
          <form
            className="flex flex-col gap-5 text-white"
            onSubmit={(e) => handleSubmit(e)}
          ><h1>Please login to your account</h1>
            <div className="flex flex-col text-white ">
            <label>Email</label>
              <input
              id="email"
              placeholder="e.g. abc@mail.com"
              type="email"
              name="email" tabIndex={1}
              value={email}              onChange={(e) => setEmail(e.target.value)}
              className=" py-3 px-2 placeholder-gray-500  rounded-md focus:border-blue-600 text-black p-1"
              required
            ></input></div>
            
            <div className=" flex flex-col text-white ">
              <label className="txt-shadow">Password</label>
              <div className="relative">
                <input
                placeholder="password"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={password} tabIndex={2}
                className="
                      py-3 px-2 w-full rounded-md focus:border-indigo-600 text-black"
                required
                onChange={(e) => setPassword(e.target.value)}
              /> 
              <button
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
              onClick={(e)=>togglePasswordVisibility(e)}
          >
              {isPasswordVisible ? (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                  </svg>
              ) : (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                  </svg>
              )}
          </button>
          </div>
              


            </div>
           

            <button tabIndex={3}
              className="w-full bg-green-500 py-2 text-xl rounded-md hover:bg-green-700 text-white mb-10"
              onSubmit={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
            {isLoading?<ProgressBar/>:""}
             <p className="text-center">{messageSuccess && (
            <span className="text-green-500">{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className="text-red-500">{messageFailed}</span>
          )}</p>
          
          </form>
         
        </div>
      </div>
    
  );
}

export default SignIn;
