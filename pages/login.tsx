import { WalletIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Image from 'next/image'
import { useAddress, useLogin, useLogout, useMetamask } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getUser } from './api/auth/[...thirdweb]';
import { disconnect } from 'process';

interface Props {
  user: any
}

function login({user}: Props) {
    const address = useAddress();
    const login = useLogin();
    const connectMeta = useMetamask();
    const router = useRouter();
    const logout = useLogout();
    const handleClick = () => {
      connectMeta
      router.push("/")
    }

    const register = [
      "0xE6f94224d01667F13AA97686b9bba484BDb87b91",
      "0x0aEd621DCF1F1C0D09609D0940F1e3DA17A020a2",
      "0x731998723CD5d1769A5021506D53D79B1BD2D1f8"
    ]
    let verified = false
    register.forEach(element => {
      if(address == element){
          verified = true
      } 
    }); 

  return (
    <div className='flex min-h-screen flex-col py-2 bg-gradient-to-br to-[#100530] from-[#370068] text-white space-y-10 justify-center'>
        <div className='text-center'>
            <Image className='' src="/images/alphawordlogo.png" width='512px' height='150px'/>
         </div>
        <div className='flex flex-wrap justify-center items-center text-center'>
            <div className='panel w-96 m-2'>
                <WalletIcon className='w-24 h-24 mx-auto m-8'/>
                {(address && !user && verified) && <button onClick={() => login()} className='bg-white text-black font-bold rounded-full p-4 m-2 pl-6 pr-6 hover:bg-slate-300 transition-all'>SIGN IN</button>}
                {(address && !user && !verified) && <p className='text-red-500'>You do not have access</p>}
                {(!address && user) && <button onClick={() => handleClick() } className='bg-white text-black font-bold rounded-full p-4 m-2 pl-6 pr-6 hover:bg-slate-300 transition-all'>CONNECT</button>}
                {(!address && !user) && <button onClick={() => connectMeta()} className='bg-white text-black font-bold rounded-full p-4 m-2 pl-6 pr-6 hover:bg-slate-300 transition-all'>CONNECT</button>}
                <h1 className='text-xl font-semibold'>Connect with MetaMask</h1>
            </div>
        </div>
    </div>
  )
}

export default login

export const getServerSideProps: GetServerSideProps = async (context) => {
  

  const user = await getUser(context.req)
  return {
    props:{
      user
    }
  }
}