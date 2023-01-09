import { StarIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';
import React from 'react'
import user from '../slices/user';
import { User } from '../typings'

interface Props{
    user: User
}
function CallerCard({user}: Props) {
    const router = useRouter();

     const handleClick = () => {
        router.push('/caller/' + user.address)
  }
  return (
    <div onClick={handleClick} className=' w-96 h-60 bg-gray-800 hover:bg-gray-700 hover:shadow-xl hover:border-0 transition-all border-2 border-gray-900 rounded-xl select-none flex-none relative flex items-center cursor-pointer'>
        <div className='absolute top-4 left-4 border border-amber-400 rounded-full p-1 flex'>
            <StarIcon className='text-amber-400' width={16} height={16} />
            <p className='font-medium text-xs uppercase text-amber-400 pl-1 pr-1'>Featured</p>
        </div>
        <div className='w-32 h-32 absolute -left-6'>
            <img className='w-full h-full object-cover rounded-full border-4 border-gray-800 bg-gray-900' src={user.avatar} alt="" draggable="false" />
        </div>
        <div className=' w-full h-1/2 ml-28 items-center flex space-x-4'>
            <div className='text-center'>
                <p className='text-2xl font-medium text-green-500'>A+</p>
                <p className='uppercase text-sm text-slate-400 p-1 font-medium'>rating</p>
            </div>
            <div className='text-center'>
                <p className='text-2xl font-medium text-green-500'>96%</p>
                <p className='uppercase text-sm text-slate-400 p-1 font-medium'>success</p>
            </div>
            <div className='text-center'>
                <p className='text-2xl font-medium text-gray-300'>1723</p>
                <p className='uppercase text-sm text-slate-400 p-1 font-medium'>subscribers</p>
            </div>
        </div>
        <div className='absolute bottom-4 left-6 '>
            <p className='text-2xl'>{user.name}</p>
        </div>
    </div>
  )
}

export default CallerCard