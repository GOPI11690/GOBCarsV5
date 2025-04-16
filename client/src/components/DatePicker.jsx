import { useState } from "react"; 
import Datepicker from "react-tailwindcss-datepicker";

const MIN_DATE = new Date();
MIN_DATE.setDate(MIN_DATE.getDate() - 0);
const DatePicker = ({name,inputid}) => { 
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });

    return (<div className="flex flex-col">
        <label htmlFor={inputid} className="block text-sm/6 font-medium text-gray-900 dark:text-slate-200">{name}</label>
            <Datepicker 
        asSingle={true} minDate={MIN_DATE} useRange={false} inputId={inputid} placeholder="DD/MM/YYYY" popoverDirection="down"
            inputName="datepicker" inputClassName=" rounded-md focus:ring-0 px-1 py-1 placeholder:text-gray-400 text-black dark:placeholder:text-gray-600"
            value={value} displayFormat="DD/MM/YYYY" containerClassName="relative mt-2 flex flex-row border-2 border-solid border-black rounded-lg"
            onChange={newValue => setValue(newValue)}
        /> 
    </div>
        
    );
};

export default DatePicker;
