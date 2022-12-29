import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {WalletIcon} from '@heroicons/react/24/solid'
import { useAddress, useDisconnect, useLogin } from '@thirdweb-dev/react'
import Header from '../components/Header'
import Login from '../components/Login'
import CallerItem from '../components/CallerItem'
import FeaturedCallerItem from '../components/FeaturedCallerItem'
import { db } from '../firebase'
import {query, collection, getDocs, onSnapshot, addDoc, doc, getDoc, Timestamp, setDoc} from 'firebase/firestore'
import { Caller } from '../typings'
import { cloneElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Props{
  callers: any,
  users: any
}

function Home({callers, users}: Props){
  //const [callers, setCallers] = useState<any[]>([])

  // useEffect(() => {
  //   return onSnapshot(collection(db, 'callers'), snapshot => {
  //     setCallers(snapshot.docs)
  //   });
  // }, [db])
  const disconnect = useDisconnect();
  const router = useRouter()
  const address = useAddress();


  let userJoined = false;
  if(address){
     users.forEach((user: any) => {
    if(user.id == address){
      userJoined = true;
    }
  });
  }
 

  const data = {
    name: "New User",
    avatar: "/images/sponge.png",
    banner: "/images/alphabanner.png",
    subscriptions: [],
    isCaller: false,
    isAdmin: false,
  }

  if(!userJoined && address){
    setDoc(doc(db, "users", `${address}`), data)
  }

  return (
    <div className="flex flex-col py-2 bg-main text-white space-y-10 bg">
      <Head>
        <title>alpha2 | Revolutionizing Alpha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=''>
        <section className='flex flex-nowrap overflow-x-auto snap-x snap-mandatory space-x-5 px-5 justify-center mt-4 no-scrollbar'>
          {users.map((user:any) =>(
            <FeaturedCallerItem key={user.id} image={user.avatar} name={user.name} wallet={user.id} />
          ))}
        </section>
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className='panel flex-col space-y-4 md:w-[600px] overflow-auto'>
            <h1 className="text-3xl text-white font-semibold text-left">Popular</h1>
            <CallerItem name="tester" />
            <CallerItem name='long tester here long tester here' />
            <CallerItem name="tester" />
            <CallerItem name='long tester here' />
          </div>
            
          <div className='panel space-y-4 md:w-[600px] overflow-hidden'>
            <h1 className="text-3xl text-white font-semibold text-left">Trending</h1>
            <CallerItem name="tester" />
            <CallerItem name='long tester here' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

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