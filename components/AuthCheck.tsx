import { useAddress } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Login from './Login'

function AuthCheck({children}: any) {
    const address = useAddress()
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    if(router.pathname != "/login"){

    }
    

    return (
        <div>
            {(router.pathname != "/login") && <Header/> }
            <div>{children}</div>
        </div>
        
    )

}

export default AuthCheck