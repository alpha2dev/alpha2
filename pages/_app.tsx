import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react"
import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'


function MyApp({ Component, pageProps, }: AppProps) {
  return(
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <div className='bg-slate-900 min-h-screen'>
        <Header />
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>

  ) 
}

export default MyApp
