import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

type User = {
  address: string,
  name: string,
  avatar: string,
  isAdmin: boolean,
  isCaller: boolean,
}

export const useAddressUser = (address: any) => {
    const [user, setUser] = useState<User>()
    useEffect(() => {
        onSnapshot(doc(db, "users", address), (snapshot) => {
            setUser({
                address: snapshot.id,
                name: snapshot.data()!.name,
                avatar: snapshot.data()!.avatar,
                isAdmin: snapshot.data()!.isAdmin,
                isCaller: snapshot.data()!.isCaller
            })
        });
    }, [user])
    return user!
    
}
