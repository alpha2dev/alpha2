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
import { getUser } from './api/auth/[...thirdweb]'

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
 

  const [isCaller, setIsCaller] = useState(false)

  let verified = false;

  const register = [
    "0xE6f94224d01667F13AA97686b9bba484BDb87b91",
    "0x0aEd621DCF1F1C0D09609D0940F1e3DA17A020a2",
    "0x731998723CD5d1769A5021506D53D79B1BD2D1f8"
  ]

  if(isCaller == false && address == register[0]) setIsCaller(true);

  register.forEach(element => {
    if(address == element){
      verified = true
    } 
  }); 

  // if(!address) return <Login/>

  // if(address && !verified ){
  //   disconnect
  //   return <Login/>
  // }



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
    follows: [],
    subscriptions: [],
    isCaller: false,
    isAdmin: false,
  }

  if(!userJoined && address){
    setDoc(doc(db, "users", `${address}`), data)
  }
  
  
  return (
    <div className="flex flex-col py-2 bg-slate-900 text-white space-y-10 bg">
      <Head>
        <title>Alpha2 | Revolutionizing Alpha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=''>
        <div className=' flex flex-row m-10 h-fit space-x-5 justify-center flex-grow-0 flex-shrink-0 overflow-clip p-4'>
          {callers.map((caller: any)=>(
            <FeaturedCallerItem key={caller.id} name={caller.name} wallet={caller.id} />
          ))}
        </div>
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

  const user = await getUser(context.req)

  if(!user){
    return{
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

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