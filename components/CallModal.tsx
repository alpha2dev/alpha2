import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, EllipsisHorizontalCircleIcon, MinusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React, { Fragment, useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useAddress } from '@thirdweb-dev/react'
import { Skeleton } from '@mui/material'

interface Props{
  url: string,
  callerAddress: string,
  status: string,
  desc: string,
  bought: string,
  current_sold: string,
}

function CallModal({url, status, callerAddress, desc, bought, current_sold}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState()
  const [img, setImg] = useState()
  const [floor, setFloor] = useState()
  const [isOwner, setIsOwner] = useState(false)
  const router = useRouter()
  const address = useAddress()

  function closeModal(){
      setIsOpen(false)
  }

  function openModal(){
      setIsOpen(true)
  }
  
  useEffect(() => {
      if(callerAddress == address) setIsOwner(true)
      Axios
      .get(`https://api.opensea.io/api/v1/collection/${url}`)
      .then(function (response) {
        setImg(response.data.collection.image_url)
        setName(response.data.collection.name)
        setFloor(response.data.collection.stats.floor_price)
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [])
    
    

  return (
    <>
    <div onClick={openModal} className='table-row hover:bg-slate-800 transition-all text-xs sm:text-lg'>
        <p className=' table-cell truncate overflow-hidden pl-2 pt-2 pb-2 rounded-l-lg w-2/3'>{status == "pending" && <MinusCircleIcon className='w-5 inline text-amber-400 mr-2 '/>}{status == "successful" && <CheckCircleIcon className='w-5 inline text-green-500 mr-2 '/>}{status == "unsuccessful" && <XCircleIcon className='w-5 inline text-red-500 mr-2 '/>}{name ? <img className='w-10 h-10 sm:w-14 sm:h-14 object-cover rounded bg-slate-700 inline mr-2' src={img} alt="" /> : <Skeleton sx={{bgcolor: 'grey.900', display: 'inline'}} variant='rounded' animation="wave" width={40} height={40}/>}{name}</p>
        <p className='hidden md:table-cell text-right'>{bought}</p>
        <p className=' table-cell rounded-r-lg text-right pr-2'>{floor}</p>
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
                <Dialog.Panel className="bg-slate-800 w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all mr-2 -ml-2">
                  <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white"></Dialog.Title>
                  <div className='space-y-2 text-white'>
                    <div className="flex items-center text-xl">
                      {img ? <img className='w-32 h-32 object-cover rounded-lg bg-slate-900' src={img} alt="" /> : <Skeleton variant="rectangular" width={200} height={200} />}
                      <div className='ml-4 space-y-1'>
                        <p className='flex-wrap'>{name}</p>
                        <p onClick={() => window.open("https://opensea.io/collection/" + url)} className='flex text-sm font-medium text-slate-300 cursor-pointer'><img className='w-5 mr-1 ' src="https://opensea.io/static/images/logos/opensea.svg" alt="" />opensea.io</p>
                        <div className='flex items-center'>
                          {status == "pending" && <MinusCircleIcon className='w-5 text-amber-400 mr-0.5 '/>}{status == "successful" && <CheckCircleIcon className='w-5 inline text-green-500 mr-0.5 '/>}{status == "unsuccessful" && <XCircleIcon className='w-5 inline text-red-500 mr-0.5 '/>}
                          <p className='text-xs font-medium text-slate-400 flex uppercase text-center'>{status} sale</p>
                        </div>
                      </div>
                    </div>
                    {desc != "" && <p className="text-sm p-4 bg-slate-900 rounded-lg">{desc}</p>}
                    <div className='flex items-center justify-center space-x-2'>
                      <div className='text-center bg-slate-900 p-4 rounded-lg flex-none'>
                        <div className='flex justify-center'>
                          <Image className='' src="/images/eth.png" draggable="false" width={25} height={25}/>
                          <p className='font-medium'>{bought}</p>
                        </div>
                        <p className='font-bold'>Buy Floor</p>
                      </div>
                      <div className='text-center bg-slate-900 p-4 rounded-lg flex-none'>
                        <div className='flex justify-center'>
                          <Image className='' src="/images/eth.png" draggable="false" width={25} height={25}/>
                          <p className='font-medium'>{floor}</p>
                        </div>
                        <p className='font-bold'>Current Floor</p>
                      </div>
                      <div className='text-center bg-slate-900 p-4 rounded-lg hidden sm:inline flex-none'>
                        <div className='flex justify-center'>
                          <Image className='' src="/images/eth.png" draggable="false" width={25} height={25}/>
                          <p className='font-medium'>{Math.round(((Number.parseFloat(floor!)-Number.parseFloat(bought) + Number.EPSILON))*1000)/1000}</p>
                        </div>
                        <p className='font-bold'>Difference</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" onClick={closeModal}>Close</button>
                      {(status == "pending") && (isOwner ? <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-500 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" >End Call</button> : <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-500 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all" >Buy</button>)}
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

export default CallModal