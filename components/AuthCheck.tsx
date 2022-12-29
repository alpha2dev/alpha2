import { useAddress } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Login from './Login'

function AuthCheck({children}: any) {
    const address = useAddress()
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    const register = [
        "0xE6f94224d01667F13AA97686b9bba484BDb87b91",
        "0x0aEd621DCF1F1C0D09609D0940F1e3DA17A020a2",
        "0x731998723CD5d1769A5021506D53D79B1BD2D1f8",
        "0x75fE7e6356Eb93B91Ce8339D5F300869722a4120"
      ]
    
    
    register.forEach(element => {
      if(!authorized && address == element){
        setAuthorized(true)
      } 
    }); 
      
    if(authorized && !address){
        setAuthorized(false)
    } 

    return (
        <div>
            {(address && authorized) && <Header/> }
            {(address && authorized) ? <div>{children}</div> : <Login auth={authorized}/>}
        </div>
        
    )

}

export default AuthCheck
