import React from 'react'
import Image from 'next/image'

function EthIcon({width, height}: any) {
  return (
    <Image className='flex-none' src="/images/eth.png" draggable="false" width={width} height={height}/>
  )
}

export default EthIcon