import React,{useState,useEffect} from "react";

function Accordion(props) { 
    return ( 
        <div className="border rounded-md mb-1 w-[65%]"> 
            <button 
                className="w-[80%] p-4 text-left  bg-gray-200 dark:bg-gray-800 dark:text-white 
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
                <div className="p-5 bg-white w-[70%] dark:text-white dark:bg-sky-700 animate-pulse"> 
                    {props.data} 
                </div> 
            )} 
        </div> 
    ); 
}; 

function HostFaqs() {
    const [accordions, setAccordion] = useState([]); 
    useEffect(() => {
        const url="../src/data/faqdata.json";
        fetch(url)
        .then((res) => {res.json()
            .then((data) => {setAccordion(data.faqs);})
            
            
        });
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
    <div className="px-10 pt-16 gap-5"> 
    <p className='text-3xl font-bold sm:text-4xl text-sky-950 text-left dark:text-sky-500'>Frequently asked questions</p>
        <div className="pt-10 flex flex-col items-center"> 
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

 
export default HostFaqs;