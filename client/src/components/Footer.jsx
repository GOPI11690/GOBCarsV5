import React from 'react'
import logoImg from "../assets/images/Gob Cars Logo Sm.png";
import facebook1 from "../assets/images/facebook1.png";
import instagram1 from "../assets/images/instagram1.png";
import youtube1 from "../assets/images/youtube1.png";
import { Link } from 'react-router-dom';

;
function Footer() {
  return (
    <footer className="bg-gray-100 px-20">
    <div className="  px-4 sm:px-6 lg:px-8">
      <div className="justify-items-center sm:flex sm:align-top sm:justify-around">
        <div >
        <div className='logoDiv w-40 mg-5'>
        <img className='logoImg' src={logoImg}></img>
            </div>  
            <div>
            <h1 className='companyText font-bold '>GOB Cars Pvt Ltd.</h1>
            <p className='text-sm'>Our vision is to provide convenience</p>
            </div>
            {/* links for social media  */}
            <div className='flex h-20 items-center justify-center'>
            <h3 className='font-bold text-xl'>Connect with us</h3>
            </div>
        <div className="icons">
            <div className='flex'>
                
            <a target='_blank' href="https://www.facebook.com/">
            <img id="icons" src={facebook1} />
          </a>
          <a target='_blank' href="https://www.instagram.com/?hl=en">
            <img id="icons" src={instagram1} />
          </a>
          <a target='_blank' href="https://www.youtube.com/">
            <img id="icons" src={youtube1} />
          </a>
            </div>
          
        </div>
              
        </div>
        <div className="hidden navText md:flex md:flex-wrap">
          <ul><p className='font-extrabold text-2xl underline txt-color'>Quick Links</p>
          <Link to={"aboutus"} ><li className='hover:scale-110 text-xl hover:text-sky-600'>About Us</li></Link>
          <Link to={"cars"} ><li className='hover:scale-110 text-xl  hover:text-sky-600'>Cars</li></Link>
          <Link to={"howitworks"} ><li className='hover:scale-110 text-xl  hover:text-sky-600'>How it works</li></Link>
          <Link to={"retrospects"} ><li className='hover:scale-110 text-xl hover:text-sky-600'>Retrospects</li></Link>
          </ul>
        </div> 
        <div className='hidden max-h-fit navText md:flex md:flex-wrap  align-top'>
        <ul><p className='font-extrabold text-2xl underline txt-color'>Terms & Policy</p>
            <Link to={"termofuse"} ><li className='hover:scale-110 text-xl hover:text-sky-600'>Terms Of Use</li></Link>
            <Link to={"privacypolicy"} ><li className='hover:scale-110 text-xl  hover:text-sky-600'>Privacy Policy</li></Link>
          </ul>
        </div>
        
        
        </div>
        <div className="copy pt-10">
        
        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0">
          Copyright &copy; 2025. All rights reserved.
        </p>
        </div>
    </div>
  </footer>

  )
}

export default Footer