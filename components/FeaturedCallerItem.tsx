import React from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

interface Props{
  name: string,
  image: string,
  wallet: string,
  OnClick?: () => void,
}

function FeaturedCallerItem({name, image, wallet, OnClick}: Props) {
  const router = useRouter();

  const handleClick = () => {
      router.push('/caller/' + wallet)
  }
  console.log(image)

  return (
    <div onClick={() => handleClick()} className='bg-slate-900 flex-none rounded-lg cursor-pointer transform hover:scale-110 transition-all'>
      <img src={image} alt="" />
      <UserCircleIcon className='flex-none w-40 self-center transition-all'/>
      <div className='flex justify-between'>
        <p>{name}</p>
        <p>1438</p>
      </div>
    </div>
  )
}

export default FeaturedCallerItem