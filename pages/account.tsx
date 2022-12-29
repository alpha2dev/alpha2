import { Tab } from '@headlessui/react'
import { Tooltip } from '@mui/material'
import { useAddress } from '@thirdweb-dev/react'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import EthIcon from '../components/EthIcon'
import { db } from '../firebase'

interface Props{
  callers: any,
  users: any
}

function account({callers, users}: Props) {
  const address = useAddress();
  const [userName, setUserName] = useState()
  const [name, setName] = useState()
  const nameRef = useRef<any>()

  users.forEach((user: any) => {
    if(!userName && user.id === address){
      setUserName(user.name)
    }
  });

  const nameSubmit = () => {
    console.log(nameRef.current.value)
    updateDoc(doc(db, "users", `${address}`), {name: nameRef.current.value})
    setUserName(nameRef.current.value)
    console.log(userName)
  }
  


  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className='m-auto p-3 md:p-20'>
      <Head>
        <title>Account | alpha2</title>
      </Head>
      <div className='flex mb-4 items-center text-white'>
        <img className='rounded-full border-4 border-slate-800 align-middle h-28 w-28 md:h-32 md:w-32 object-cover' draggable="false" src="/images/sponge.png"/>
        <div className='mb-4 ml-4 space-y-2'>
          <p className='text-xl md:text-3xl font-bold'>{userName}</p>
          <Tooltip title="Copy" >
            <div onClick={() => navigator.clipboard.writeText(address!)} className='text-sm  text-slate-300 bg-[#0a1527] rounded pl-1 pr-2 pt-0.5 pb-0.5 border-1 border-slate-900 cursor-pointer hover:bg-slate-800 inline-flex'>
              <EthIcon/>
              <p className=' select-none text-xs self-center md:text-sm truncate overflow-hidden'>{address}</p>             
            </div>
          </Tooltip>
        </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 md:w-60 w-full">
          <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ', selected ? 'bg-slate-900 shadow' : 'text-white hover:bg-white/[0.12] hover:text-white')}>
            Settings
          </Tab>
          <Tab className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ', selected ? 'bg-slate-900 shadow' : 'text-white hover:bg-white/[0.12] hover:text-white')}>
            Subscriptions
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 w-full text-white">
          <Tab.Panel className={classNames('rounded-xl p-3', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none')}>
            <div className='bg-slate-900 rounded-lg p-4'>
              <p>Name</p>
              <div className='flex'>
                <input type="text" className='rounded-lg bg-slate-800 focus:outline-none p-1 w-64 h-10' placeholder={userName} ref={nameRef}/>
                <button className='rounded-lg bg-blue-700 pl-2 pr-2 pt-1 pb-1 ml-2 hover:bg-blue-600 transition all' onClick={nameSubmit}>Submit</button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
  </div>
    
  )
}

export default account

export const getServerSideProps: GetServerSideProps = async (context) => {

  // if(!address){
  //   return{
  //     redirect: {
  //       destination: "/login",
  //       permanent: false
  //     }
  //   }
  // }

  const colCallers =  await getDocs(collection(db, "callers"));
  const colUsers = await getDocs(collection(db, "users"));

  let callers: { id: string }[] = []

  colCallers.forEach((doc) =>{
    callers.push({
      ...doc.data(), id:doc.id
    })
  })

  let users: { id: string }[] = []

  colUsers.forEach((doc) =>{
    users.push({
      ...doc.data(), id:doc.id
    })
  })

  return {
    props:{
      callers,
      users
    }
  }
}