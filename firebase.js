import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCz8_YmJUOUrUpDK6NWXg-hBt91ZQzYGbU",
    authDomain: "alpha2-4c3cf.firebaseapp.com",
    projectId: "alpha2-4c3cf",
    storageBucket: "alpha2-4c3cf.appspot.com",
    messagingSenderId: "1028058516784",
    appId: "1:1028058516784:web:5a6d63a022302c052f0cf5"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const storage = getStorage(app)



  export {db, storage};