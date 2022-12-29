import { Dialog, Transition } from '@headlessui/react'
import { CubeIcon, PlusCircleIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import React, { Fragment, useRef, useState } from 'react'
import axios from 'axios'
import { useAddress } from '@thirdweb-dev/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'
import EthIcon from './EthIcon'

function CreateCallModal() {
    const address = useAddress()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const descriptionRef = useRef<any>()
    const [selected, setSelected] = useState(false)
    const [collectionURL, setCollectionURL] = useState("")
    const [collectionImage, setCollectionImage] = useState("")
    const [collectionName, setCollectionName] = useState("")
    const [collectionFloor, setCollectionFloor] = useState("")
    const [collectionVolume, setCollectionVolume] = useState("")

    function closeModal(){
        setIsOpen(false)
        setCollectionImage("")
        setCollectionName("")
        setCollectionURL("")
        setCollectionFloor("")
        setCollectionVolume("")
        setSelected(false)
    }

    function openModal(){
        setIsOpen(true)
        setSelected(false)
    }

    const collectionFetch = () => {
      navigator.clipboard.readText()
      .then(text => {
        if(text.substring(0,30) == "https://opensea.io/collection/"){
          setCollectionURL(text)
          axios
          .get('https://api.opensea.io/api/v1/collection/' + text.substring(30, text.length))
          .then(function (response) {
            setCollectionImage(response.data.collection.image_url)
            setCollectionName(response.data.collection.name)
            setCollectionFloor(response.data.collection.stats.floor_price)
            setCollectionVolume(response.data.collection.stats.total_volume)
            setSelected(true)
          })
          .catch(function (error) {
            setCollectionName("Invalid Collection")
            setCollectionImage("")
            setCollectionFloor("")
            setCollectionVolume("")
            setSelected(false)
          });
        }
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
      
    }
    const createCall = () => {
      const call = {
        address: address,
        collectionURL: collectionURL,
        description: descriptionRef.current.value,
        status: "pending"
      }
      const usersRef = collection(db, "users")
      addDoc(collection(usersRef, `${address}`, "calls"), call)
      closeModal()
    }
    

  return (
    <>
    <div onClick={openModal} className='flex p-1 hover:text-blue-400 text-white font-bold items-center uppercase text-sm mr-2 cursor-pointer'>
      <PlusCircleIcon className="w-8" />
      <p className='hidden lg:inline'>Call</p>
    </div>
    
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
                <Dialog.Panel className="bg-slate-800 w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all space-y-4">
                  <p className="text-2xl text-white font-bold">Collection</p>
                  <div className="space-y-2">
                    <div className='flex text-white items-center text-xl space-x-4 ml-1'>
                      {collectionImage ? <img className='w-32 h-32 object-cover rounded-lg bg-slate-900' src={collectionImage} alt="" /> : <CubeIcon className='w-32 p-6 bg-slate-900 rounded-lg'/> }
                      {collectionName ? <p>{collectionName}</p> : <p>Please select a collection</p>}
                    </div>
                    {/*(collectionFloor != "" && collectionVolume != "") && <div className='flex space-x-2 text-white text-center'>
                        <div className='text-center bg-slate-900 p-3 rounded-lg flex-none'>
                          <div className='flex justify-center'>
                            <EthIcon />
                            <p className='font-medium'>{Math.round((Number.parseFloat(collectionFloor) + Number.EPSILON)*1000)/1000}</p>
                          </div>
                          <p className='font-bold'>Floor</p>
                        </div>
                        <div className='text-center bg-slate-900 p-3 rounded-lg flex-none'>
                          <div className='flex justify-center'>
                            <EthIcon />
                            <p className='font-medium'>{Math.round(Number.parseFloat(collectionVolume))}</p>
                          </div>
                          <p className='font-bold'>Volume</p>
                        </div>
  </div>*/}
                      {(collectionFloor != "" && collectionVolume != "") && <div className='flex text-white text-center divide-x-2 divide-slate-600 rounded-lg'>
                        <div className='flex p-2'>
                          <p className='font-bold'>Floor:</p>
                          <EthIcon />
                          <p className='font-medium'>{Math.round((Number.parseFloat(collectionFloor) + Number.EPSILON)*1000)/1000}</p>
                        </div>
                        <div className='flex p-2'>
                          <p className='font-bold'>Volume:</p>
                          <EthIcon />
                          <p className='font-medium'>{Math.round(Number.parseFloat(collectionVolume))}</p>
                        </div>
                      </div>}
                    <div className='flex items-center truncate'>
                      <button onClick={collectionFetch} className='bg-blue-600 rounded-md ml-1 p-2 text-sm font-medium mr-2 text-white hover:bg-blue-700 font'>Paste</button>
                      {collectionURL=="" ? <p className='text-gray-400 bg-slate-900 p-2 rounded-lg'>Please paste opensea collection url</p> : <p className='text-gray-400 bg-slate-900 p-2 rounded-lg'>{collectionURL}</p>}
                    </div>
                  </div>
                  <p className="text-2xl text-white font-bold">Description</p>
                  <div>
                    <textarea className='text-white bg-slate-900 rounded-lg border border-slate-500 p-1 ml-1 w-full h-40' ref={descriptionRef} placeholder=''/>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" onClick={closeModal}>Close</button>
                    <button disabled={!selected} type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-500 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" onClick={createCall}>Create</button>
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

export default CreateCallModal