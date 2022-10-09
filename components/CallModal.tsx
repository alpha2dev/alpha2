import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

interface Props{
    name: string,
    bought: string,
    current_sold: string,
}

function CallModal({name, bought, current_sold}: Props) {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal(){
        setIsOpen(false)
    }

    function openModal(){
        setIsOpen(true)
    }

  return (
    <>
    <div onClick={openModal} className='table-row hover:bg-violet-900 transition-all'>
        <p className=' table-cell truncate overflow-hidden pl-2 pt-4 pb-4 rounded-l-lg w-2/3'>{name}</p>
        <p className='hidden md:table-cell text-right'>{bought}</p>
        <p className=' table-cell rounded-r-lg text-right pr-2'>{current_sold}</p>
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
                <Dialog.Panel className="panel w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-white">{name}</Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">This is the description given by the caller about the collection</p>
                  </div>
                  <div className="mt-4">
                    <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeModal}>Got it, thanks!</button>
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