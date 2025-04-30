import React from 'react'
const DropDownMenu = ({options,getValue}) => {
    const handleChange = (event) => {
      getValue(
          event.target.value
          );
    }
  return (
    <select className='w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-900 border-2 border-black border-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"' onChange={handleChange}  >
        {options.map((c,idx)=>(
            <option key={idx} value={c}>{c}</option>
        ))}
    </select>
  )
}
export default DropDownMenu