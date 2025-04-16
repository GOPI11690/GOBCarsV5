import React from 'react'
import logoImg from "../assets/images/Gob Cars Logo Sm.png";
import facebook1 from "../assets/images/facebook1.png";
import instagram1 from "../assets/images/instagram1.png";
import youtube1 from "../assets/images/youtube1.png";
import Reviewpage from '../pages/Reviewpage';
import { Link } from 'react-router-dom';

;
function Footer() {
  return (
    <footer className="bg-gray-100 px-20">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="justify-items-center sm:flex sm:align-top sm:justify-between">
        <div >
        <div className='logoDiv w-40 mg-5'>
        <img className='logoImg' src={logoImg}></img>
            </div>  
            <div>
            <h1 className='companyText font-bold'>GOB Cars Pvt Ltd.</h1>
            <p className='text-xs'>Our vision is to provide convenience</p>
            </div>
            {/* links for social media  */}
            <div className='flex h-20 items-center'>
            <h3 className='font-bold'>Connect with us</h3>
            </div>
        <div className="icons">
            <div className='flex'>
                
            <a href="https://www.facebook.com/">
            <img id="icons" src={facebook1} />
          </a>
          <a href="https://www.instagram.com/?hl=en">
            <img id="icons" src={instagram1} />
          </a>
          <a href="https://www.youtube.com/">
            <img id="icons" src={youtube1} />
          </a>
            </div>
          
        </div>
              
        </div>
        <div className="navText flex flex-wrap">
          <ul><p className='font-extrabold underline txt-color'>Quick Links</p>
          <Link to={"aboutus"} ><li>About Us</li></Link>
          <Link to={"browsecars"} ><li>Cars</li></Link>
          <Link to={"howitworks"} ><li>How it works</li></Link>
          <Link to={"retrospects"} ><li>Retrospects</li></Link>
          </ul>
        </div> 
        <div className='navText flex flex-wrap align-top py-10'>
        <ul><p className='font-extrabold underline txt-color'>Terms & Policy</p>
            <Link to={"termofuse"} ><li>Terms Of Use</li></Link>
            <Link to={"privacypolicy"} ><li>Privacy Policy</li></Link>
          </ul>
        </div>
        
        
        </div>
        <div className="copy">
        
        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0">
          Copyright &copy; 2025. All rights reserved.
        </p>
        </div>
    </div>
  </footer>

  )
}

export default Footer