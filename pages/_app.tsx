import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChainId, ThirdwebProvider, useAddress} from "@thirdweb-dev/react"
import Header from '../components/Header'
import { GetServerSideProps } from 'next'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Login from '../components/Login'
import { Provider } from 'react-redux'
import { store } from '../store'
import { set, reset } from '../slices/auth'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import AuthCheck from '../components/AuthCheck'
import { getUser } from './api/auth/[...thirdweb]'



function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <Provider store={store}>
          <div className='bg-slate-900 min-h-screen'>
            <AuthCheck>
              <Component {...pageProps} />      
            </AuthCheck>
        </div>
      </Provider>
    </ThirdwebProvider>

  ) 
}

export default MyApp
