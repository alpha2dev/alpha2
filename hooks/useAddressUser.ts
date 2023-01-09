import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { User } from '../typings';

export const useAddressUser = async (address: any) => {
    const [user, setUser] = useState<User>()
    

    let dataPromise = new Promise<User>(async function(resolve, reject){
        const userDoc = await getDoc(doc(db, "users", `${address}`));
        let docData: User = {
            address: userDoc.id,
            name: userDoc.data()!.name,
            avatar: userDoc.data()!.avatar,
            isAdmin: userDoc.data()!.isAdmin, 
            isCaller: userDoc.data()!.isCaller
        }
        resolve(docData)
    })

    return dataPromise
}
