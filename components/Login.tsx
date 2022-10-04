import { WalletIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Image from 'next/image'
import { useAddress, useMetamask } from '@thirdweb-dev/react';

function Login() {
    const connectMeta = useMetamask();
    const register = ["0xE6f94224d01667F13AA97686b9bba484BDb87b91"]
  return (
    <div className='flex min-h-screen flex-col py-2 bg-gradient-to-br to-[#100530] from-[#370068] text-white space-y-10 justify-center'>
        <div className='text-center'>
            <Image className='' src="/images/alphawordlogo.png" width='512px' height='150px'/>
         </div>
        <div className='flex flex-wrap justify-center items-center text-center'>
            <div className='panel w-96 m-2'>
                <WalletIcon className='w-24 h-24 mx-auto m-8'/>
                <button onClick={connectMeta} className='bg-white text-black font-bold rounded-full p-4 m-2 pl-6 pr-6 hover:bg-slate-300 transition-all'>CONNECT</button>
                <h1 className='text-xl font-semibold'>Connect with MetaMask</h1>
            </div>
        </div>
    </div>
  )
}

export default Login