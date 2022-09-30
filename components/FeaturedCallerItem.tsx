import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'

function FeaturedCallerItem() {
  return (
    <div className='panel flex flex-col bg-yellow-500 w-60 rounded-lg cursor-pointer hover:scale-110 transition-all'>
        <UserCircleIcon className='flex-none w-40 self-center transition-all'/>
        <div className='flex justify-between'>
          <p>Name</p>
          <p>1438</p>
        </div>
    </div>
  )
}

export default FeaturedCallerItem