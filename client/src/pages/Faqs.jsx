import React,{useState,useEffect} from "react";

function Accordion(props) { 
    return ( 
        <div className="border rounded-md mb-1"> 
            <button 
                className="w-full p-4 text-left bg-gray-200 dark:bg-gray-800 dark:text-white 
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
                <div className="p-4 bg-white dark:text-white dark:bg-sky-700 animate-pulse"> 
                    {props.data} 
                </div> 
            )} 
        </div> 
    ); 
}; 

function Faqs() {
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
    <div> <p className='text-3xl font-bold sm:text-4xl text-sky-950 px-20 pt-24 dark:text-sky-500'>Frequently asked questions</p>
        <div className="px-20 m-8"> 
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