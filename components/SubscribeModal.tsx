import { Dialog, Transition } from '@headlessui/react'
import { ArrowPathIcon, BellIcon, CubeIcon, PhoneArrowDownLeftIcon, PlusCircleIcon, StarIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useAddress } from '@thirdweb-dev/react'
import { addDoc, collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'
import EthIcon from './EthIcon'

interface Props{
  callerAddress: string
}

function SubscribeModal({callerAddress}: Props) {
    const address = useAddress()
    const [isOpen, setIsOpen] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    function closeModal(){
        setIsOpen(false)
    }

    function openModal(){
        setIsOpen(true)
    }
    // useEffect(() => {
    //   getDocs(collection(collection(db, "callers"), `${callerSlug}`, "calls"))
    //   onSnapshot(doc(db, "users", `${address}`), (user) => {
    //     if(user.data()?.subscriptions.address == callerAddress) setIsSubscribed(true)
    //   });
    // })
    
    function handleSubscribe(tier: string) {
      closeModal()
    }

    

  return (
    <>
    {isSubscribed ? <button onClick={openModal} className='hidden sm:inline rounded-b bg-slate-900 hover:shadow-lg transition-all w-32 p-3 font-bold text-xs md:text-sm uppercase'>Subscribed</button> : <button onClick={openModal} className='hidden sm:inline rounded-b alpha-color hover:shadow-lg transition-all w-32 p-3 font-bold text-xs md:text-sm uppercase'>Subscribe</button>}
    <button onClick={openModal} className='sm:hidden inline rounded-l alpha-color p-3 font-bold text-xs md:text-sm uppercase'>Subscribe</button>
    
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all space-y-4  text-white">
                    <div className='flex flex-col space-y-2 sm:grid sm:grid-cols-3 sm:space-x-2 sm:space-y-0 '>
                      <div onClick={() => handleSubscribe("follow")} className='flex flex-col p-4 hover:bg-slate-700 rounded-lg transition-all cursor-pointer justify-between'>
                        <div className='self-center space-y-6'>
                          <StarIcon className='w-20 h-20 p-3 rounded-full alpha-color' />
                          <p className='text-2xl text-center font-medium'>Follow</p>
                        </div>
                        <div className='ml-8 p-4 sm:mt-20 sm:mb-20'>
                          <ul className='list-disc text-slate-300'>
                            <li>Saves the caller in your favourites</li>
                            <li>View completed alpha calls</li>
                            <li>Receive alpha caller announcements</li>
                          </ul>
                        </div>
                        <div className='flex justify-center font-bold p-4 border-2 border-slate-500 rounded-lg text-center'>
                          <EthIcon />
                          <p>FREE</p>
                        </div>
                      </div>
                      <div className='flex flex-col p-4 hover:bg-slate-700 rounded-lg transition-all cursor-pointer justify-between'>
                        <div className='self-center space-y-6'>
                          <BellIcon className='w-20 h-20 m-auto p-3 rounded-full alpha-color' />
                          <p className='text-2xl text-center font-medium'>Subscribe</p>
                        </div>
                        <div className='ml-8 p-4 sm:mt-20 sm:mb-20'>
                          <ul className='list-disc text-slate-300'>
                            <li >View most recent alpha calls</li>
                            <li>Receive notifications when the alpha makes a call</li>
                          </ul>
                        </div>
                        <div className='flex justify-center font-bold p-4 border-2 border-green-500 rounded-lg text-center'>
                          <EthIcon />
                          <p>0.02</p>
                        </div>
                      </div>
                      <div className='flex flex-col p-4 hover:bg-slate-700 rounded-lg transition-all cursor-pointer justify-between'>
                        <div className='self-center space-y-6'>
                          <ArrowPathIcon className='w-20 h-20 m-auto p-3 rounded-full alpha-color'/>
                          <p className='text-2xl text-center font-medium'>Automate</p>
                        </div>
                        <div className='ml-8 p-4 sm:mt-20 sm:mb-20'>
                          <ul className='list-disc text-slate-300'>
                            <li>Automatically buy when the alpha makes a call</li>
                            <li>Be the first to sell when the alpha sells</li>
                          </ul>
                        </div>
                        <div className='flex justify-center font-bold p-4 border-2 border-fuchsia-900 alpha-color rounded-lg text-center'>
                          <EthIcon />
                          <p>0.08</p>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="inline-flex rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" onClick={closeModal}>Close</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
  )
}

export default SubscribeModal