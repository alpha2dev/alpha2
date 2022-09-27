import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-violet-900 text-white">
      <Head>
        <title>(alpha)2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>This will be the alpha2 landing page</h1>
    </div>
  )
}

export default Home
