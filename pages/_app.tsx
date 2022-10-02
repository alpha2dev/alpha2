import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChainId, ThirdwebProvider} from "@thirdweb-dev/react"
import Header from '../components/Header'


function MyApp({ Component, pageProps }: AppProps) {
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
