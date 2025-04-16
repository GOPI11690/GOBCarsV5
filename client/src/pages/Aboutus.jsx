import React from "react";
import { ExpandableText } from "../components/ExpandableText";
import aboutbanner from "../assets/images/aboutusbanner.png";
import Statistics from "../components/Statistics";
import Faqs from "./Faqs";

function Aboutus() {
  return (
    <div id="aboutUs" className="pt-15 pb-24 bg-slate-100 min-h-screen dark:bg-gray-900 ">
      <div className="flex flex-wrap pt-15 lg:justify-center">
        <h2 className="text-3xl font-bold sm:text-4xl txt-color dark:text-sky-500 pt-24">
          About Us
        </h2>
      </div>
      <section className="relative z-0 py-10">
        <img src={aboutbanner} />
        <div className="absolute top-28 right-24">
          <p className="text-slate-100 text-2xl font-extrabold md:text-4xl">
            Making Vehicle
            <br /> Ownership Simple
          </p>
        </div>
        <div className="p-10">
          <p className="txt-color text-2xl font-extrabold dark:text-sky-500 md:text-4xl">
            Who We Are
          </p>
          <br />

          <div className="p-10">
            <p className="text-gray-900 text-lg dark:text-white md:text-xl">
              {/* Only show 120 characters in the beginning */}
              <ExpandableText descriptionLength={320}>
                At Gob Cars, we're on a mission to revolutionize the way people
                experience car ownership. Our innovative platform provides
                flexible and hassle-free car subscription & self-drive rental
                services that allow individuals to enjoy the benefits of having
                a car without the hassles and complexities of traditional car
                ownership. 
                
                With Gob Cars, there are no down payments, insurance or
                maintenance costs, and our fixed monthly plans make it easy to
                manage your finances. We provide 24*7 Roadside Assistance,
                ensuring that you're always covered in the event of an
                emergency. So whether you're in need of a car for
                work or play, Gob Cars has got you covered. Join the thousands of
                satisfied customers who have already experienced the freedom and
                flexibility of car subscription services. Start your journey
                with Gob Cars today!
                
                
              </ExpandableText>
            </p>
          </div>
        </div>
        <div className="p-10">
        <p className="txt-color text-2xl font-extrabold text-center pb-5 dark:text-sky-500 md:text-4xl">
        Our Key Features
          </p>
            
        </div>
        <div className="grid container mx-auto pt-1 p-1 grid-cols-1 gap-y-8 lg:grid-cols-1 items-center lg:gap-x-16">
          <div className="grid grid-cols-1 justify-center gap-1 sm:grid-cols-3">
          
            <div className="flex flex-col justify-center items-center">
            <div className="w-40 px-5">
            <img
                    className="h-20"
                    src="https://img.icons8.com/bubbles/100/handshake.png" alt="handshake"/>
                </div>
                <div className="flex flex-col rounded-lg px-4 text-center">
                  <div className="bg-slate-100 text-xl text-left font-medium text-gray-500 dark:bg-gray-900 dark:text-white">
                  Zero Commitment
                  </div>
                  
                </div>
              
            </div>
            <div className="flex flex-col rounded-lg items-center justify-center text-center">
            <div className="w-40 px-5">
                  <img
                    className="h-20"
                    src="https://img.icons8.com/bubbles/100/gear.png" alt="gear"/>
                </div>
                <div className="flex flex-col rounded-lg px-4 text-center">
                  <div className="bg-slate-100 text-xl text-left font-medium dark:bg-gray-900 dark:text-white text-gray-500">
                    Zero Maintenance
                  </div>
                  
                </div>
              
            </div>
            <div className="flex flex-col rounded-lg items-center justify-center text-center">
            <div className="w-40 px-5">
            <img
                    className="h-20"
                    src="https://img.icons8.com/external-beshi-glyph-kerismaker/100/external-Tow-Car-garage-car-repair-beshi-glyph-kerismaker.png"
                    alt="roadside assistance"
                  />
                </div>
                <div className="flex flex-col rounded-lg px-4 text-center">
                  <div className="bg-slate-100 text-xl text-left font-medium dark:bg-gray-900 dark:text-white text-gray-500">
                  Roadside Assistance
                  </div>
                  
                </div>
              
            </div>
            
          </div>
        </div>
      </section>
      <Statistics/>
      <Faqs/>
    </div>
  );
}

export default Aboutus;
