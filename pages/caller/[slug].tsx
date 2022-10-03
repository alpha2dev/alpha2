import { UserCircleIcon } from '@heroicons/react/24/solid';
import { query, collection, getDocs, where, getDoc, doc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import React from 'react'
import Header from '../../components/Header';
import { db } from '../../firebase'
import {CubeIcon} from '@heroicons/react/24/solid'
import Image from 'next/image'
import ReactTooltip from 'react-tooltip'
import { Tooltip } from '@mui/material';

interface Props{
  address: string,
  name: string,
  subs: string
}

function Caller({address, name, subs}: Props) {
  return (
    <main className="flex flex-col ml-2 mr-2 xl:ml-40 xl:mr-40 md:ml-20 md:mr-20 mt-24 py-2 bg-slate-900 text-white space-y-4">
      <div className='flex flex-row panel transition-all '>
        <UserCircleIcon className='absolute w-28 md:w-40 bottom-48'/>
        <div className='absolute hidden flex flex-row justify-center text-center font-bold text-sm whitespace-nowrap space-x-4 uppercase bottom-32 left-32 md:left-48'>
          <div className='self-center bg-yellow-600 rounded p-3 border-2 border-yellow-800 shadow-md ml-2'>
            <p>Rating</p>
            <p>A+</p>
          </div>
          <div className=' self-center bg-green-600 rounded border-2 border-green-800 p-3 shadow-md'>
            <p className=''>Success</p>
            <p className='text-md'>90%</p>
          </div>
          <div className='hidden self-center bg-purple-600 rounded p-4'>
            <p>Followers</p>
            <p>12343212</p>
          </div>
          <div className='self-center bg-blue-600 rounded p-3 border-2 border-blue-800 shadow-md'>
            <p>Subscribers</p>
            <p>223</p>
          </div>
        </div>
        <div className='flex-1 flex-row mt-8 ml-4 md:ml-8 mb-8 space-y-4'>
          <div className='space-y-2 mb-20'>
            <p className='text-xl md:text-3xl font-bold'>{name}</p>
            <Tooltip title="Copy" >
              <div onClick={() => navigator.clipboard.writeText(address)} className='text-sm  text-slate-300 bg-slate-800 rounded p-0.5 border-1 border-slate-900 cursor-pointer hover:bg-slate-700 flex w-28'>
                <Image className='' src="/images/eth.png" width={20} height={20}/>
                <p className=' select-none'>{address?.substring(0,5)}...{address?.substring(address.length, address.length-5)}</p>             
              </div>
            </Tooltip>
          </div>
        </div>
        <div className='hidden lg:flex flex-1 md:flex-row justify-center space-x-4 divide-x-2 text-slate-300 divide-gray-800 items-end text-left font-bold'>
          <div className='p-3'>
            <p>A+</p>
            <p>rating</p>
          </div>
          <div className='p-3'>
            <p className='text-md'>90%</p>
            <p className=''>success</p>
          </div>
          <div className=' p-3'>
              <p>12343212</p>
              <p>followers</p>
            </div>
          <div className='p-3'>
            <p>223</p>
            <p>subscribers</p>
          </div>
        </div>
        <div className='flex-1 flex flex-row justify-end items-start whitespace-nowrap font-bold'>
          <div className='flex flex-row items-center'>
            <Image className='' src="/images/eth.png" width={25} height={25}/>
            <p className='pr-4'>0.02</p>
            <button className='rounded bg-blue-600 p-3 uppercase'>Subcriptions</button>
          </div>
        </div>
      {/*<div className='mt-20 mb-20 ml-4 mr-4 border-l border-slate-500 h-full' />*/}
      </div>
      <div className='lg:hidden flex flex-row justify-center space-x-4 divide-x-2 text-slate-300 divide-gray-800 items-start text-left font-bold '>
        <div className='p-3'>
          <p>A+</p>
          <p>Rating</p>
        </div>
        <div className='p-3'>
          <p className='text-md'>90%</p>
          <p className=''>Success</p>
        </div>
        <div className='p-3'>
            <p>12343212</p>
            <p>Followers</p>
          </div>
        <div className='p-3'>
          <p>223</p>
          <p>Subscribers</p>
        </div>
      </div>
      <div className='lg:flex lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0'>
        <div className='panel flex flex-1 flex-col'>
          <p className='text-3xl font-bold mb-4'>Pending Calls</p>
          <div className='table p-2 space-y-2 text-left text-lg font-bold'>
            <div className=' table-header-group text-xs text-slate-400 uppercase'>
              <div className='table-row  '>
                <p className='tabl
                e-cell p-2 w-2/4'>collection</p>
                <p className='table-cell '>buy price</p>
                <p className='table-cell '>current price</p>
              </div>
            </div>
            <div className='table-row-group p-2 rounded-lg cursor-pointer'>
              <div className='table-row hover:bg-violet-900 transition-all'>
                <p className=' table-cell truncate overflow-hidden pl-2 pt-4 pb-4 rounded-l-lg'>collection name </p>
                <p className=' table-cell'>0.01</p>
                <p className=' table-cell rounded-r-lg'>0.03</p>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden panel flex flex-1'>
          <p className='text-3xl font-bold mb-4'>Call History</p>
        </div>
      </div>
    </main>
  )
}



export default Caller;

export const getStaticPaths = async () => {
  const callers = await getDocs(collection(db, "callers"));


  const paths = callers.docs.map(caller => ({
    params: {
      slug: caller.id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async (context) => {

  const callerSlug = context.params?.slug;

  const docRef = doc(db, "callers", `${callerSlug}`);

  const caller = await getDoc(docRef);

  const address = caller.id
  const name = caller.data()?.name
  const subs = 2983

  if(!caller.exists()){
    return {
      notFound: true
    }
  }

  return {
    props:{
      address,
      name,
      subs
    }
  }
}