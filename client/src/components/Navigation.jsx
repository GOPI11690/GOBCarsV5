
import React, {useState} from 'react';
import logoImg from "../assets/images/Gob Cars Logo Sm.png";

import { ThemeToggle } from '../theme/ThemeToggle';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FaUserAlt, FaSignInAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';


function Navigation() {
    const [nav, setNav] = useState(false)

    const handleClick = () => setNav(!nav)

    const handleClose = () => {
      setNav(false);
    };


  return (
    // Navigation bar on large screen
    <div className='w-screen bg-gray-100 h-[80px] z-10 fixed drop-shadow-lg'>

    <div className='px-2 flex justify-between items-center w-full h-full'>
    <div className='logoDiv w-40'>
      <img className='logoImg  object-cover pl-10' src={logoImg}></img>
      <p className='text-center pl-10 font-extrabold text-sky-600 animate-pulse'>Drive Yourself</p>
      </div>
      <div className='flex justify-between'>
        
      <ul className='hidden justify-between text-black md:flex poppins-medium '>
        <Link to="/">
        <li className='cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2'>
            Home
        </li></Link>
        <a href='/#howitworks'>
        <li className='cursor-pointer linkNav relative group hover:bg-white txt-color text-color hover:rounded-lg px-2'>
            How it works
        </li>
        </a>
        <a href='/#browseCars'><li className='cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2'>
            Cars
        </li></a>
        <a href='/#retrospects'>
        <li className='cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2'>
            Retrospects
        </li></a>
        <NavLink to={{pathname:'/aboutus' }}>
        <li className='cursor-pointer linkNav relative group hover:bg-white txt-color hover:rounded-lg px-2'>
            About Us
        </li></NavLink>
        
      </ul>
    </div>
        <div className='hidden md:flex pr-4'>

            <Link
            className="flex text-center cursor-pointer items-center mx-4  text-black hover:text-sky-600"
            type="submit" to={"login"}
            >
            <FaSignInAlt className='lg:w-5 lg:h-5 mx-2 px-3' />
            <span className="text-sm font-medium ">
            Login
            </span>
            </Link>

            <a
            className="block cursor-pointer shrink-0 rounded-lg px-3 bg-white p-2.5 border border-gray-100 shadow-sm hover:bg-transparent hover:text-sky-600 hover:border hover:border-sky-600"
          >
            <span className="sr-only">Account</span>
            <FaUserAlt className='lg:w-5 lg:h-5' />
          </a>
            <div className='pl-10 pr-20'>
        <ThemeToggle />
            </div>
        </div>

        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5 text-black' /> : <div className='flex'>

            <Link
            className="flex text-center cursor-pointer items-center mx-4 text-black text-color"
            type="submit" to={"/login"}
            >
            <FaSignInAlt className='lg:w-5 lg:h-5 mx-2' />
            <span className="text-sm font-medium">
            Login
            </span>
            </Link>

            <a
            className="block cursor-pointer shrink-0 rounded-lg bg-white mr-4 p-2.5 border border-gray-100 shadow-sm hover:bg-transparent hover:text-green-600 hover:border hover:border-green-600"
          >
            <span className="sr-only">Account</span>
            <FaUserAlt className='lg:w-5 lg:h-5' />
          </a>
          
                <XIcon className='w-5 text-black' /> 
                <div className='px-10'>
        <ThemeToggle />
            </div>
            </div>}
            
        
        </div>
            
        </div>
        
        

        {/* Navigation on small screens */}
        <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
            <li onClick={handleClose} className='border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 w-full txt-color font-bold py-1'>
              Home
            </li>

            <li onClick={handleClose} className='border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 font-bold txt-color w-full py-1'>
              How it Works
            </li>

            <li onClick={handleClose} className='border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 font-bold txt-color w-full py-1'>
              Cars
            </li>

            <li onClick={handleClose} className='border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 txt-color font-bold w-full py-1'>
              Retrospects
            </li>

            <li onClick={handleClose} className='border-b-2 hover:text-sky-400 cursor-pointer border-zinc-300 txt-color font-bold w-full py-1'>
              About Us
            </li>
          </ul>
          
    </div>
  )
}

export default Navigation