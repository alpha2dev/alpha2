import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import React from 'react'
import NavButton from './NavButton';

function Header() {
    const address = useAddress();
    const disconnect = useDisconnect();
  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
        <div className=' flex items-center space-x-2'>
            <img className='rounded-full w-48 h-18' src="./images/alphawordlogo.png" alt="" />
        </div>
        <div className='hidden md:flex md:col-span-3 items-center justify-center'>
            <div className='panel space-x-10 rounded'>
                <NavButton isActive title="Home" />
                <NavButton title="Feed"/>
                <NavButton title="Callers" />
                <NavButton onClick={disconnect} title="Logout" />
            </div>
        </div>
        <div className='flex flex-col ml-auto text-right'>
            <p className='text-xs text-gray-400 truncate'>{address?.substring(0,5)}...{address?.substring(address.length, address.length-5)}</p>
            <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer'/>
            <span className='md:hidden'>
                <NavButton onClick={disconnect} title='Logout' />
            </span>
        </div>
    </header>
  )
}


export default Header