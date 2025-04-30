import React, { useState } from "react";
import logoImg from "../assets/images/Gob Cars Logo Sm.png";
import ClickAwayListener from 'react-click-away-listener';

import { ThemeToggle } from "../theme/ThemeToggle";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import {  FaPerson ,FaArrowRightToBracket,FaChessKnight    } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import axios from "axios";


const userLogout = async () => {
  const response = await axios.post(
    "http://localhost:3030/api/user/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response;
};

function Navigation() {
  const [nav, setNav] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfile=(e)=>{
    e.preventDefault();
    setShowProfileMenu(false)
    if(user.roles.includes("admin")){
      navigate("/adminpage");
    }else{
      navigate("/userpage")
    
    }}
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await userLogout();
      dispatch(logout());
      setShowProfileMenu(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => setNav(!nav);

  const handleClose = () => {
    setNav(false);
  };

  return (
    // Navigation bar on large screen
    <div className="w-screen bg-gray-100 h-[100px] z-10 md:px-10 fixed drop-shadow-lg ">
      <div className="w-screen px-2 flex justify-between items-center h-full relative">
        <div className="logoDiv w-40 hover:scale-110 "><Link to='/'>
        <img className="logoImg  object-cover pl-10" src={logoImg}></img>
          <p className="text-center pl-10 font-extrabold text-sky-600 animate-pulse">
            Drive Yourself
          </p></Link>
          
        </div>
        <div className="flex justify-between text-xl">
          <ul
            className="hidden justify-between text-black md:flex poppins-medium "
            onClick={() => setShowProfileMenu(false)}
          >
            <Link to="/">
              <li className="cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2">
                Home
              </li>
            </Link>
            <Link to="howitworks">
              <li className="cursor-pointer linkNav relative group hover:bg-white txt-color text-color hover:rounded-lg px-2">
                How it works
              </li>
            </Link>
            <Link to="cars">
              <li className="cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2">
                Browse Cars
              </li>
            </Link>
            <Link to="retrospects">
              <li className="cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2">
                Retrospects
              </li>
            </Link>
            <Link to="aboutus">
              <li className="cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2">
                About Us
              </li>
            </Link>
          </ul>
        </div>
        <div className="">
       
        {!user ? (
          <div className="ml-5 flex flex-row gap-5">
            <div className="rounded-[50px] border-2 border-solid hover:border-sky-600 border-orange-500 px-3">
            <Link
            className="flex text-center cursor-pointer items-center md:mx-4 hover:scale-110 hover:text-sky-600"
            type="submit"
            to={"hostpage"}
          >
            <FaChessKnight size={50} color="orange" className="hidden md:flex"/>
            <span className="text-xs md:text-[16px] font-medium px-2 text-orange-500">Become a Dealer</span>
          </Link>
          </div>
          <div className="flex flex-row rounded-[50px] border-2 border-sky-900 border-solid hover:border-sky-600 px-3">
            <Link
          className="flex text-center cursor-pointer items-center hover:scale-110 text-black hover:text-sky-600"
          type="submit"
          to={"login"}
        >
          <FaArrowRightToBracket size={25} color="blue" className="hidden md:flex"/>
          <span className="text-xs md:text-[18px] font-bold px-2 text-blue-900">SignIn/SignUp</span>
        </Link></div>
        <div className="pl-5 pr-20">
          <ThemeToggle />
        </div></div>
          
        ) : (<div className="relative md:pr-40 ">
          
          <button className="  rounder-lg h-[50px] sm:w-40 bg-sky-100 rounded-[50px] border-4 border-solid hover:border-sky-600 border-black p-2"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {/* <FaPerson   className="md:w-5 md:h-5 p-3" /> */}
           <span className="hover:font-bold font-semibold flex flex-row  justify-around" >Hi!{" "}{user.name.charAt(0).toUpperCase() +
              user.name.slice(1).toLowerCase()} <MenuIcon className="w-5 text-black" /></span> 
            </button>
        </div>
          
        )}
        </div>
        {showProfileMenu && (
            <ClickAwayListener onClickAway={() => setShowProfileMenu(false)}>
                 
                    <div className="absolute top-full right-10 md:right-40  bg-slate-100 px-3 rounded-b-lg p-[5px] z-10000 flex flex-col items-center gap-[10px] ">
            <button
              className="text-sky-500 font-bold rounded-xl p-2 hover:text-white duration-200 ease-in-out hover:bg-slate-400"
              onClick={handleProfile}
            >
              Dashboard
            </button>
            <button
              className=" text-red-600 font-bold rounded-xl p-2 hover:text-white duration-200 ease-in-out hover:bg-slate-400"
              onClick={handleLogout}
            >
              Log Out
            </button>
            {/* <div className="pl-5 pr-20 items-center justify-center"> */}
          <ThemeToggle />
            <div className="flex place-items-center justify-center items-center">
            <button
              className="text-2 rounded-[50%] h-[40px] w-[40px] bg-slate-200 duration-200 ease-in-out hover:bg-slate-400"
              onClick={() => setShowProfileMenu(false)}
            >
              &times;
            </button>
            </div>
            
          </div>
                   
            </ClickAwayListener>)}


        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? (
            <MenuIcon className="w-5 text-black" />
          ) : (
            <div className="flex">
              <XIcon className="w-5 text-black" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation on small screens */}
      <ul
        className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}
        onClick={() => setShowProfileMenu(false)}
      >
        <li
          onClick={handleClose}
          className="border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 w-full txt-color font-bold py-1"
        >
          <Link to="/">Home</Link>
        </li>

        <li
          onClick={handleClose}
          className="border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 font-bold txt-color w-full py-1"
        >
          <Link to="/howitworks">How it Works</Link>
        </li>

        <li
          onClick={handleClose}
          className="border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 font-bold txt-color w-full py-1"
        >
          <Link to="/cars">Cars</Link>
        </li>

        <li
          onClick={handleClose}
          className="border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 txt-color font-bold w-full py-1"
        >
          <Link to="/retrospects">Retrospects</Link>
        </li>

        <li
          onClick={handleClose}
          className="border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 txt-color font-bold w-full py-1"
        >
          <Link to="/aboutus">About Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
