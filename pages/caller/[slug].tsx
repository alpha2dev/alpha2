import { UserCircleIcon } from '@heroicons/react/24/solid';
import { query, collection, getDocs, where, getDoc, doc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import React from 'react'
import Header from '../../components/Header';
import { db } from '../../firebase'

interface Props{
  address: string,
  name: string
}

function Caller({address, name}: Props) {

  return (
    <main className="flex py-2 bg-slate-900 text-white space-y-10">
      <div className='flex flex-row m-36 items-center justify-center panel w-full'>
        <UserCircleIcon className='absolute w-40 transition-all bottom-48'/>
        <div className='flex flex-col text-center mt-8 items-center space-y-4'>
          <div className='space-y-2'>
            <p className='text-3xl font-bold'>{name}</p>
            <p className='text-sm text-slate-400'>{address?.substring(0,5)}...{address?.substring(address.length, address.length-5)}</p>
          </div>
          <div className='flex flex-row text-lg space-x-40 font-bold'>
            <div className='flex flex-col panel w-36'>
              <p className=''>Rating</p>
              <p className='text-md text-slate-400'>A+</p>
            </div>
            <div className='flex flex-col panel w-36'>
              <p className=''>Followers</p>
              <p className='text-md text-slate-400'>1423</p>
            </div>
            <div className='flex flex-col panel w-36'>
              <p className=''>Success</p>
              <p className='text-md text-slate-400'>90%</p>
            </div>
          </div>
        </div>
        
      {/*<div className='mt-20 mb-20 ml-4 mr-4 border-l border-slate-500 h-full' />*/}
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

  const call = await getDoc(docRef);

  const address = call.id
  const name = call.data()?.name
  
  if(!call.exists()){
    return {
      notFound: true
    }
  }

  return {
    props:{
      address,
      name
    }
  }
}