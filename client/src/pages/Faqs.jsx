import React,{useState,useEffect} from "react";
import { FaqData } from "../utils/ApiCalls";

function Accordion(props) { 
    return ( 
        <div className="border rounded-md mb-1 w-full"> 
            <button 
                className="w-full p-4 text-left  bg-gray-200 dark:bg-gray-800 dark:text-white 
                           hover:bg-gray-500 dark:hover:bg-sky-500 transition duration-500"
                onClick={props.toggleAccordion} 
            > 
                {props.title} 
                <span className={`float-right transform ${props.isOpen ?  
                                 'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-500`}> 
                    &#9660; 
                </span> 
            </button> 
            {props.isOpen && ( 
                <div className="p-5 bg-white w-full dark:text-white dark:bg-sky-700 animate-pulse"> 
                    {props.data} 
                </div> 
            )} 
        </div> 
    ); 
}; 

function Faqs(data) {
    const [accordions, setAccordion] = useState([]); 
const getFaqs=async()=>{
       const url="../src/data/faqdata.json";
       try{
        const response = await FaqData(url);
        if(response)
            {
                if(data=="aboutus"){
                    setAccordion(response.faqs.faqs)
                }else
                {
                    setAccordion(response.faqs.hostfaqs)
                }
            }
             ;
       }
       catch(e){throw new Error(e)}
               
     }
         useEffect(() => {
               getFaqs();
             }, []);

const toggleAccordion = (accordionkey) => { 
    const updatedAccordions = accordions.map((accord) => { 
        if (accord.key === accordionkey) { 
            return { ...accord, isOpen: !accord.isOpen }; 
        } else { 
            return { ...accord, isOpen: false }; 
        } 
    }); 

    setAccordion(updatedAccordions); 
}; 

return ( 
    <div className="px-10  py-16 gap-5 flex flex-col items-center justify-center bg-white dark:bg-gray-900 "> 
    <p className='text-3xl font-bold sm:text-4xl text-sky-950 text-center dark:text-sky-500'>Frequently asked questions</p>
        <div className="pt-10 flex flex-col items-center justify-center w-1/2"> 
            {accordions.map((accordion) => ( 
                <Accordion 
                    key={accordion.key} 
                    title={accordion.title} 
                    data={accordion.data} 
                    isOpen={accordion.isOpen} 
                    toggleAccordion={() => toggleAccordion(accordion.key)} 
                /> 
            ))} 
        </div> 
    </div> 
); 
  }

 
export default Faqs;