import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {WalletIcon} from '@heroicons/react/24/solid'
import { useAddress } from '@thirdweb-dev/react'
import Header from '../components/Header'
import Login from '../components/Login'
import CallerItem from '../components/CallerItem'
import FeaturedCallerItem from '../components/FeaturedCallerItem'

const Home: NextPage = () => {
  const address = useAddress();

  if(!address) return <Login/>


  return (
    <div className="flex min-h-screen flex-col py-2 bg-slate-900 text-white space-y-10">
      <Head>
        <title>Alpha2 | Revolutionizing Alpha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=''>
        <Header />
        <div className='hidden md:flex flex-row m-10 h-fit space-x-5 justify-center'>
          <FeaturedCallerItem />
          <FeaturedCallerItem />
          <FeaturedCallerItem />
          <FeaturedCallerItem />
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
