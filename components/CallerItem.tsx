import { UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'


interface Props{
  name: String,
}

function CallerItem({name}: Props) {
  return (
    <div className='panel'>
      <div className='flex items-center'>
        <UserCircleIcon className='flex-none w-20 h-20'/>
        <p className='p-2 text-left truncate my-auto'>{name}</p>
        <div className='flex flex-1 justify-end'>
          <p className='my-auto ml-4 mr-3 text-gray-300'>1438</p>
          <button className=' bg-sky-600 rounded pl-4 pr-4 pt-2 pb-2'>Follow</button>
        </div>
      </div>
    </div>
  )
}

export default CallerItem
