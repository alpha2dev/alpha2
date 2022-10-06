
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import React, { forwardRef, useEffect, useState } from 'react'
import NavButton from './NavButton';
import Image from 'next/image'
import Login from './Login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { collection, doc, getDoc, getDocFromServer, getDocs, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Menu, Transition } from '@headlessui/react';



function Header() {
  
  const router = useRouter();
  const address = useAddress();
  const disconnect = useDisconnect();
  const [isCaller, setIsCaller] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [user, setUser] = useState<any>()

  useEffect(() => {
    return onSnapshot(collection(db, 'users'), snapshot => {
      setUsers(snapshot.docs)
    });
  }, [db])

  users.forEach(userData => {
    if(!user && address == userData.id){
      setUser(userData)
    } 
  }); 

  console.log(user)

  const register = [
    "0xE6f94224d01667F13AA97686b9bba484BDb87b91",
    "0x0aEd621DCF1F1C0D09609D0940F1e3DA17A020a2",
    "0x731998723CD5d1769A5021506D53D79B1BD2D1f8"
  ]

  if(isCaller == false && address == register[0]) setIsCaller(true);

  let verified = false;

  register.forEach(element => {
    if(address == element){
      verified = true
    } 
  }); 



  if(address && !verified ) return (<div></div>)


  if(!address) return (<div></div>)

  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center pt-4 bg-slate-900 bg-inherit'>
      <div className=' flex items-center'>
        <Image onClick={() => router.push("/")} className='cursor-pointer' src="/images/alphawordlogo.png" draggable="false" width={216} height={60}/>
      </div>
      <div className='hidden md:flex md:col-span-3 items-center justify-center whitespace-nowrap'>
        <div className='panel space-x-10 rounded'>
          <NavButton {...{isActive : router.route == "/" ? true : false}} onClick={() => router.push("/")} title="Home" />
          <NavButton title="Feed"/>
          <NavButton title="Callers" />
          <NavButton onClick={disconnect} title="Logout" />
        </div>
      </div>
      <div className='flex flex-row ml-auto text-right items-center pr-4'>
        {isCaller && <p className='text-xs text-red-400 truncate hidden'>Alpha Caller</p>}
        <p className='text-xs text-gray-400 truncate hidden'>{address?.substring(0,5)}...{address?.substring(address.length, address.length-5)}</p>
        {user && (user.data().isAdmin && <button className='panel text-white mr-4 font-bold'>Admin</button>)}
        <Menu>
          <Menu.Button className={"hidden md:inline"}>
            {user && <img className='rounded-full mr-4 border-2 border-slate-600 align-middle h-12 w-12 object-cover cursor-pointer' draggable="false" src={user.data().avatar} alt="" />}
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
          </Transition>
          <Menu.Items className={"hidden md:inline absolute w-40 top-24 right-8 bg-slate-600 rounded text-white font-bold p-1"}>
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && 'bg-blue-500 rounded'} group flex w-full rounded-md px-2 py-2 text-sm`} href="">Settings</a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && 'bg-blue-500 rounded'} group flex w-full  rounded-md px-2 py-2 text-sm`} href="">Settings</a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
        <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer md:hidden'/>
        <span className='md:hidden'>
          <NavButton onClick={disconnect} title='Logout' />
        </span>
      </div>
    </header>
  )
}

export default Header
