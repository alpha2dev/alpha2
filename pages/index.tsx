import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {WalletIcon} from '@heroicons/react/24/solid'
import { useAddress } from '@thirdweb-dev/react'
import Header from '../components/Header'
import Login from '../components/Login'
import CallerItem from '../components/CallerItem'
import FeaturedCallerItem from '../components/FeaturedCallerItem'
import { db } from '../firebase'
import {query, collection, getDocs, onSnapshot, addDoc, doc, getDoc} from 'firebase/firestore'
import { Caller } from '../typings'
import { cloneElement, useEffect, useState } from 'react'

interface Props{
  callers: any,
}

const Home: NextPage = ({callers}: Props) => {
  //const [callers, setCallers] = useState<any[]>([])

  // useEffect(() => {
  //   return onSnapshot(collection(db, 'callers'), snapshot => {
  //     setCallers(snapshot.docs)
  //   });
  // }, [db])
  
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

  const callerSlug = context.params?.slug;

  const docRef = collection(db, "callers");

  const s = await getDocs(docRef);

  let callers: { id: string }[] = []

  s.forEach((doc) =>{
    callers.push({
      ...doc.data(), id:doc.id
    })
  })
  


  if(!callers){
    return {
      notFound: true
    }
  }

  return {
    props:{
      callers
    }
  }
}