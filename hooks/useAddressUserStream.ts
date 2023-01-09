import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { User } from '../typings';

export const useAddressUserStream = (address: any) => {
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
