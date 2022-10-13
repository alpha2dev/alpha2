import React from 'react'
import Image from 'next/image'

function EthIcon() {
  return (
    <Image className='flex-none' src="/images/eth.png" draggable="false" width={25} height={25}/>
  )
}

export default EthIcon