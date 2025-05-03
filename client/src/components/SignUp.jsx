import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./loading/ProgressBar";
import { AddUser } from "../utils/ApiCalls";

function SignUp({ className }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userType, setUserType] = useState(["user"]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const resetForm = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setContact("");
    setMessageFailed("");
  };
  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
}
  const handleRadioChange = (value) => {
    setUserType([value]);
};
  const handleChange = (e) => {
    if (e.target.checked) {
      setAgreedToTerms(true);
      setMessageFailed("");
    } else {
      setAgreedToTerms(false);
    }
  };
  const handleSubmit = async (e) => {
    try{
    // prevent the form from refreshing the whole page
    e.preventDefault();
    if (username.length < 3) {
      setMessageFailed("Username must be at least 3 characters");
    } else if (!contact) {
      setMessageFailed("Mobile number must be needed");
    } else if (!email.includes("@")) {
      setMessageFailed("Invalid email format");
    } else if (password.length < 8) {
      setMessageFailed("Password must be at least 8 characters");
    } else if (!agreedToTerms) {
      setMessageFailed("Please agree to terms and conditions");
      return;
    } else {
      setIsLoading(true);
       // make the API call
      const response=await AddUser(username,contact,email,password,userType,"Available",true)
      setMessageSuccess(response.data.message);
      setTimeout(() => setMessageSuccess(""), 2000);
      resetForm();
      navigate("/login");
       setIsLoading(false);
      }
    }catch(e){
      setIsLoading(false);
      setMessageFailed(e.message);
      setTimeout(() => setMessageFailed(""), 2000);
     
     
    }
  };

  return (
    <div className={className}>
      <div className=" items-center ">
        <div className=" bg-transparent flex flex-col justify-center items-center">
          {" "}
          <h1 className="text-center text-white text-xl ">
            Please Enter Your Details{" "}
          </h1>
          <form
            className="flex flex-col text-white gap-5 my-5 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col text-white text-shadow-lg/30 ">
              <label className="txt-shadow">Name</label>
              <input
                placeholder="Your Name"
                name="username"
                value={username}
                className="
                    py-3 px-2 rounded-md text-black "
                required
                onChange={(e) => setUserName((e.target.value).charAt(0).toUpperCase() +
                  (e.target.value).slice(1).toLowerCase())}
              ></input>
            </div>
            <div className="flex flex-col text-white ">
              <label className="txt-shadow">Mobile</label>
              <input
                placeholder="Mobile Number"
                name="contact"
                value={contact}
                className="
                    py-3 px-2 rounded-md focus:border-indigo-600 text-black"
                required
                onChange={(e) => setContact(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col text-white ">
              <label className="txt-shadow">Email</label>
              <input
                placeholder="example@mail.com"
                type="email"
                name="email"
                value={email}
                className="
                    py-3 px-2 rounded-md focus:border-indigo-600 text-black"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className=" flex flex-col text-white ">
              <label className="txt-shadow">Password</label>
              <div className="relative">
                <input
                placeholder="password"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={password}
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

            <div className="flex flex-row gap-4 text-white ">
              <label className="txt-shadow text-xl">Are you a Dealer</label>            
            {/* </div>
            <div className="flex flex-row gap-x-4 text-white ">               */}
            <label className="txt-shadow text-xl">
                <input className="mr-2 w-4 h-4" type="radio" name="radio" value="dealer" checked={userType=="dealer"}  onChange={() => handleRadioChange("dealer")}/>
                Yes
              </label>
              <label className="txt-shadow text-xl">
                <input className="mr-2 w-4 h-4" type="radio" name="radio" value="user" checked={userType=="user"} onChange={() => handleRadioChange("user")} />
                No
              </label>
            </div>

            <div className="flex flex-col text-white">
              <label className="txt-shadow font-bold">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  value={userType}
                  onChange={handleChange} className="accent-sky-900 text-xl w-4 h-4 mr-3" 
                />
                Agree to the terms and conditions
              </label>
            </div>

            <button
              className="w-full bg-green-500 py-2 text-2xl rounded-md hover:bg-green-700 text-white mb-10"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Sign Up
            </button>
            {isloading?<ProgressBar/>:''}
          </form>
          {messageSuccess && (
            <span className="text-green-500">{messageSuccess}</span>
          )}
          {messageFailed && (
            <span className="text-red-500">{messageFailed}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
