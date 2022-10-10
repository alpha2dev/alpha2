import { Dialog, Transition } from '@headlessui/react'
import { CubeIcon, PlusCircleIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import React, { Fragment, useRef, useState } from 'react'
import axios from 'axios'
import { useAddress } from '@thirdweb-dev/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'

function CreateCallModal() {
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
      router.push("caller/" + address)
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
                <Dialog.Panel className="panel w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4 mr-2 -ml-2">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-white"></Dialog.Title>
                  <p className="text-2xl text-white font-bold">Collection</p>
                  <div className="space-y-2">
                    <div className='flex text-white items-center text-xl space-x-4'>
                      {collectionImage ? <img className='w-32 h-32 object-cover rounded-lg bg-slate-800' src={collectionImage} alt="" /> : <CubeIcon className='w-32 p-6 bg-slate-800 rounded-lg'/> }
                      {collectionName ? <p>{collectionName}</p> : <p>Please select a collection</p>}
                    </div>
                    <div className='flex items-center'>
                      <p className='text-gray-400 '>opensea.io/collection/</p>
                      <input className='text-white bg-[#11141a] rounded-lg border border-slate-500 p-1 ml-1 w-full' ref={inputRef} type="text" placeholder=''  />
                      <button onClick={collectionFetch} className='bg-blue-600 rounded-md p-2 text-sm font-medium m-2 text-white hover:bg-blue-700 font'>Confirm</button>
                    </div>
                  </div>
                  <p className="text-2xl text-white font-bold">Description</p>
                  <div>
                    <textarea className='text-white bg-[#11141a] rounded-lg border border-slate-500 p-1 ml-1 w-full h-40' ref={descriptionRef} placeholder=''/>
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