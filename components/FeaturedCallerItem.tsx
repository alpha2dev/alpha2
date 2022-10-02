import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

interface Props{
  name: String,
  wallet: String,
  OnClick?: () => void,
}

function FeaturedCallerItem({name, wallet, OnClick}: Props) {
  const router = useRouter();

  const handleClick = () => {
      router.push('/caller/' + wallet)
  }

  return (
    <div onClick={() => handleClick()} className='panel flex flex-col bg-yellow-500 w-60 rounded-lg cursor-pointer transform hover:scale-110 transition-all'>
        <UserCircleIcon className='flex-none w-40 self-center transition-all'/>
        <div className='flex justify-between'>
          <p>{name}</p>
          <p>1438</p>
        </div>
    </div>
  )
}

export default FeaturedCallerItem