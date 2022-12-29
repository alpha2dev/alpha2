import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { useAddress } from '@thirdweb-dev/react'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { db } from '../firebase'

interface Props{
    callers: any,
    users: any
}
function admin({callers, users}: Props) {
    const router = useRouter()
    const address = useAddress()
    const [isAdmin, setIsAdmin] = useState(false)
    const [selected, setSelected] = useState(users[0])

    useEffect(() => {
        users && (users.forEach((user: any) => {
            if(user.id == address){
                if(!user.isAdmin){
                     router.push("/")
                }else{
                    setIsAdmin(true)
                }
            }
        }))
    })

    function callerButton(){
        const data = {
            name: selected.name,
            avatar: selected.avatar,
            banner: selected.banner,
          }
        setDoc(doc(db, "callers", `${selected.id}`), data)
        updateDoc(doc(db, "users", `${selected.id}`), {isCaller: true})
    }

    return (
        <div>
            {isAdmin && 
            <div className='text-white'>
                <div className=' bg-amber-600 rounded-lg p-2 m-2'><p className='text-center font-bold uppercase'>Admin settings</p> </div>
                <div className='mt-4'>
                    <div className="w-80 m-auto">
                        <p>User addresses:</p>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                            <Listbox.Button className=" w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selected.id}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {users.map((user: any) => (
                                    <Listbox.Option
                                    key={user.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={user}
                                    >
                                    {({ selected }) => (
                                        <>
                                        <span
                                            className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                            {user.id}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                        </>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                            </Transition>
                            </div>
                        </Listbox>
                        {!selected.isCaller && <button className='p-1 bg-blue-600 rounded-lg mt-2' onClick={callerButton}>Make Caller</button>}
                    </div>
                </div>
            </div>}
            
        </div>
    )
}

export default admin

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