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
    <div className="overflow-hidden w-60 h-60 cursor-pointer rounded-lg relative group flex-none snap-always snap-center">
      <div className="rounded-lg z-50 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/90 to-transparent bg-gradient-to-t inset-x-0 -bottom-4 pt-30 text-white flex items-end">
        <div>
          <div className="p-4 space-y-1 text-xl pb-5 transform transition duration-300 ease-in-out">
            <div className="font-bold">{name}</div>
            <div className="text-gray-300 pb-2 text-sm flex space-x-2">
              <p>24 subscribers</p>
              <p>96% success</p>
              <p>A+ rating</p>
            </div>
          </div>
        </div>
      </div>
      <img className="object-cover w-full h-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out" src={image}/>
    </div>
  )
}

export default FeaturedCallerItem