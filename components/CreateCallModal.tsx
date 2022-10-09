import { Dialog, Transition } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useState } from 'react'


function CallModal() {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal(){
        setIsOpen(false)
    }

    function openModal(){
        setIsOpen(true)
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
                <Dialog.Panel className="panel w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-white">Create Call</Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">Just testing the create call modal</p>
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