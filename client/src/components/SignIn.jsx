import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailed,
  loginStart,
  loginSuccessful,
} from "../redux/slices/userSlice";
import { userLogin } from "../utils/ApiCalls";
import {useNavigate } from "react-router-dom";
 
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");
  const navigate = useNavigate();
 

  const dispatch = useDispatch();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  
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
// set configurations
dispatch(loginStart());
try{
  await new Promise(resolve => setTimeout(resolve, 1000))
  const response =await userLogin(email,password)

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
    if(roles.includes("admin")){
      navigate("/adminpage")
    }else if(roles.includes("dealer")){
      navigate("/userpage")
    }else{
      navigate("/home");
    }}, 500);
 
}
} catch (error) {
  // throw new Error(error);
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
              name="email"
              value={email}              onChange={(e) => setEmail(e.target.value)}
              className=" py-3 px-2 placeholder-gray-500  rounded-md focus:border-blue-600 text-black p-1"
              required
            ></input></div>
            
            <div className="flex flex-col text-white">
              <label>Password</label>
              <input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="
                    border-2 py-3 px-2 rounded-md placeholder-gray-500 p-1 text-black"
            ></input></div>
           

            <button
              className="w-full bg-green-500 py-2 text-xl rounded-md hover:bg-green-700 text-white mb-10"
              onSubmit={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
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
