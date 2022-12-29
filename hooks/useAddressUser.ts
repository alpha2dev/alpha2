import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

type User = {
  address: string,
  name: string,
}

export const useAddressUser = (address: any) => {
    const [user, setUser] = useState<User>({address: address, name: ""})
    useEffect(() => {
        onSnapshot(doc(db, "users", address), (snapshot) => {
            setUser({
                address: snapshot.id,
                name: snapshot.data()!.name
            } )
        });
    }, [user])
    return user!
    
}
