import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailed,
  loginStart,
  loginSuccessful,
} from "../redux/slices/userSlice";

import { Link, useNavigate, Navigate } from "react-router-dom";
const LOGIN_URL = "/auth";
function SignIn({ className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFailed, setMessageFailed] = useState("");

  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isUserAuthenticated) {
    return <Navigate to="/user" />;
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const userLogin = async (email, password) => {
   
      const response = await axios.post(`http://localhost:3030/api/user/login`,
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )
  
      return response
    
  }
  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    dispatch(loginStart());
    // const configuration = {
    //   method: "post",
    //   url: "http://localhost:3030/api/user/login",
    //   data: {
    //     email,
    //     password,
    //   },
    // };
    // make the API call
    // await axios(configuration)
    try{
      const response =await userLogin(email,password)
        if(response.data.user){
        const {_id,
        name,
        email,
        roles,
        contact,
        userstatus,
        isVerified,
        lastLogin,
      } = response.data.user;
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
        })
      )}
    
      setMessageSuccess(response.data.message)
      setTimeout(() => setMessageSuccess(""), 3000)
      resetForm()

      navigate("/home")
    } catch (error) {
      // throw new Error(error);
      dispatch(loginFailed(error.response.data.message))

      setMessageFailed(error.response.data.message)
      setTimeout(() => setMessageFailed(""), 3000)
    }
      
  }
  return (
    <div className={className}>
      <div className="bg-slate-100 min-h-screen dark:bg-gray-900 items-center">
        <div className="flex flex-col h-screen justify-center items-center">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="email" className="dark:text-white">
              Email
            </label>
            <input
              id="email"
              placeholder="example@mail.com"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden caret-gray-500 p-1"
              required
            ></input>
            <label htmlFor="password" className="dark:text-white">
              Password
            </label>
            <input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="
                    border-2 py-3 px-2 rounded-md focus:border-indigo-600 focus:outline-hidden caret-gray-500 p-1"
            ></input>

            <button
              className="w-full bg-sky-500 py-2 rounded-md text-lg text-white mb-10"
              onSubmit={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
          </form>
          {/* display success message */}
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

export default SignIn;
