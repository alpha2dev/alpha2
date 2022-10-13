import { Dialog, Transition } from '@headlessui/react'
import { ArrowPathIcon, BellIcon, CubeIcon, PhoneArrowDownLeftIcon, PlusCircleIcon, StarIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import React, { Fragment, useRef, useState } from 'react'
import axios from 'axios'
import { useAddress } from '@thirdweb-dev/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'
import EthIcon from './EthIcon'

function SubscribeModal() {
    const address = useAddress()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<any>()
    const descriptionRef = useRef<any>()
    const [selected, setSelected] = useState(false)
    const [collectionURL, setCollectionURL] = useState("")
    const [collectionImage, setCollectionImage] = useState("")
    const [collectionName, setCollectionName] = useState("")

    function closeModal(){
        setIsOpen(false)
        setCollectionImage("")
        setCollectionName("")
        setCollectionURL("")
        setSelected(false)
    }

    function openModal(){
        setIsOpen(true)
        setSelected(false)
    }

    const collectionFetch = () => {
      setCollectionURL(inputRef.current.value)
      axios
      .get('https://api.opensea.io/api/v1/collection/' + inputRef.current.value)
      .then(function (response) {
        setCollectionImage(response.data.collection.image_url)
        setCollectionName(response.data.collection.name)
        setSelected(true)
      })
      .catch(function (error) {
        setCollectionName("Invalid Collection")
        setCollectionImage("")
        setSelected(false)
      });
      
    }
    const createCall = () => {
      const call = {
        address: address,
        collectionURL: collectionURL,
        collectionName: collectionName,
        collectionImage: collectionImage,
        description: descriptionRef.current.value,
        status: "pending"
      }
      const callersRef = collection(db, "callers")
      addDoc(collection(callersRef, `${address}`, "calls"), call)
      closeModal()
      router.push("/caller/" + address)
    }
    

  return (
    <>
    <button onClick={openModal} className='hidden sm:inline rounded-b alpha-color hover:shadow-lg transition-all w-32 p-3 font-bold text-xs md:text-sm uppercase'>Subcribe</button>
    <button onClick={openModal} className='sm:hidden inline rounded-l alpha-color p-3 font-bold text-xs md:text-sm uppercase'>Subcribe</button>
    
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
                      <div className='flex flex-col p-4 hover:bg-slate-700 rounded-lg transition-all cursor-pointer justify-between'>
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