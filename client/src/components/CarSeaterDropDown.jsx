'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const seater = [
    {
        id: 0,
        name: 'Select',
        },
    {
        id: 1,
        name: '4-Seater',
        },
  {
    id: 2,
    name: '7-Seater',
    },
  {
    id: 3,
    name: '10-Seater',
    }
]

export default function CarSeaterDropDown({selectedSeater,setSelectedSeater}) {
  const [selected, setSelected] = useState(seater[0])

  return (<div className='flex flex-col'>
<Listbox value={selected} onChange={setSelected}>
      <Label className="block font-medium text-xl txt-shadow text-slate-200">Seater</Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-900 border-2 border-black border-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate sm:text-xl">{selected.name}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {seater.map((seater) => (
            <ListboxOption
              key={seater.id}
              value={seater} onClick={()=>setSelectedSeater(seater.name)}
              className="group relative cursor-default py-2 pr-9 pl-3 hover:bg-slate-300 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className=" block truncate font-normal group-data-selected:font-semibold sm:text-xl">{seater.name}</span>
              </div>

            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
    
  )
}
