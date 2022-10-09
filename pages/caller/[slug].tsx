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
import { useAddress } from '@thirdweb-dev/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Login from '../../components/Login';

interface Props{
  address: string,
  name: string,
  subs: string
}

function Caller({address, name, subs}: Props) {
  const router = useRouter();
  const connected = useAddress();
  
  return (
    <main className="flex flex-col ml-2 mr-2 xl:ml-40 xl:mr-40 md:ml-20 md:mr-20 lg:mt-14 py-2 bg-slate-900 text-white space-y-4">
      {/*<img className=' w-1/1 h-56 sm:h-96 object-cover rounded-lg' src="../images/alphabanner.png" alt="" />*/}
      <div className="flex flex-row transition-all relative">
        <div className='flex flex-row mt-8 lg:mb-8 w-full justify-between items-end'>
          <div className='flex items-end'>
            <img className='rounded-full border-4 border-slate-800 align-middle h-28 w-28 md:h-32 md:w-32 object-cover' draggable="false" src="/images/sponge.png"/>
            <div className='mb-4 ml-4 space-y-2'>
              <p className='text-xl md:text-3xl font-bold'>{name}</p>
              <Tooltip title="Copy" >
                <div onClick={() => navigator.clipboard.writeText(address)} className='text-sm  text-slate-300 bg-slate-800 rounded pl-1 pr-2 pt-0.5 pb-0.5 border-1 border-slate-900 cursor-pointer hover:bg-slate-700 flex '>
                  <Image className='' src="/images/eth.png" draggable="false" width={20} height={20}/>
                  <p className=' select-none text-xs self-center md:text-sm'>{address?.substring(0,5)}...{address?.substring(address.length, address.length-5)}</p>             
                </div>
              </Tooltip>
            </div>
          </div>
          <div className='hidden lg:flex flex-row space-x-4 divide-x-2 text-slate-300 divide-gray-800 items-end text-left font-bold mb-4'>
            <div className='p-3'>
              <p>A+</p>
              <p>rating</p>
            </div>
            <div className='p-3'>
              <p className='text-md'>90%</p>
              <p className=''>success</p>
            </div>
            <div className='p-3'>
                <p>12343212</p>
                <p>followers</p>
              </div>
            <div className='p-3'>
              <p>223</p>
              <p>subscribers</p>
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex justify-center'>
              <Image className='' src="/images/eth.png" draggable="false" width={25} height={25}/>
              <p className='self-center font-bold'>0.02</p>
            </div>
            <button className='rounded bg-blue-600 p-3 font-bold mt-2 text-xs md:text-sm uppercase'>Subcriptions</button>
          </div>
        </div>
        
      {/*<div className='mt-20 mb-20 ml-4 mr-4 border-l border-slate-500 h-full' />*/}
      </div>
      <div className='lg:hidden text-xs md:text-sm flex flex-row justify-center space-x-4 divide-x-2 text-slate-300 divide-gray-800 items-start text-left font-bold lg:mb-0'>
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
        <div className='bg-[#08111f] p-4 rounded-lg flex flex-1 flex-col'>
          <p className='text-3xl font-bold mb-4'>Pending Calls</p>
          <div className='table p-2 space-y-2 text-left text-lg font-bold'>
            <div className=' table-header-group text-xs text-slate-400 uppercase'>
              <div className='table-row  '>
                <p className='tabl
                e-cell p-2 w-2/3'>collection</p>
                <p className='hidden md:table-cell text-right '>bought</p>
                <p className='table-cell text-right pr-2'>current</p>
              </div>
            </div>
            <div className='table-row-group p-2 rounded-lg cursor-pointer'>
              <div className='table-row hover:bg-violet-900 transition-all'>
                <p className=' table-cell truncate overflow-hidden pl-2 pt-4 pb-4 rounded-l-lg w-2/3'>collection name </p>
                <p className='hidden md:table-cell text-right'>0.01</p>
                <p className=' table-cell rounded-r-lg text-right pr-2'>0.03</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[#08111f] p-4 rounded-lg flex flex-1 flex-col'>
          <p className='text-3xl font-bold mb-4'>Call History</p>
          <div className='table p-2 space-y-2 text-left text-lg font-bold'>
            <div className=' table-header-group text-xs text-slate-400 uppercase'>
              <div className='table-row  '>
                <p className='tabl
                e-cell p-2 w-2/3'>collection</p>
                <p className='hidden md:table-cell text-right '>bought</p>
                <p className='table-cell text-right pr-2'>sold</p>
              </div>
            </div>
            <div className='table-row-group p-2 rounded-lg cursor-pointer'>
              <div className='table-row hover:bg-violet-900 transition-all'>
                <p className=' table-cell truncate overflow-hidden pl-2 pt-4 pb-4 rounded-l-lg w-2/3'>collection name </p>
                <p className='hidden md:table-cell text-right'>0.01</p>
                <p className=' table-cell rounded-r-lg text-right pr-2'>0.03</p>
              </div>
            </div>
          </div>
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