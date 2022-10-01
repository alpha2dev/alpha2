import { query, collection, getDocs, where, getDoc, doc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import React from 'react'
import Header from '../../components/Header';
import { db } from '../../firebase'

interface Props{
  caller: string
}

function Caller({caller}: Props) {

  return (
    <main className="flex min-h-screen flex-col py-2 bg-slate-900 text-white space-y-10">
        <Header />
        {caller}
    </main>
  )
}



export default Caller;

export const getStaticPaths = async () => {
  const callers = await getDocs(query(collection(db, "callers")));


  const paths = callers.docs.map(caller => ({
    params: {
      slug: caller.id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }

};

export const getStaticProps: GetStaticProps = async (context) => {

  const callerSlug = context.params?.slug;

  const docRef = doc(db, "callers", `${callerSlug}`);

  const call = await getDoc(docRef);

  const caller = call.id
  if(!call.exists()){
    return {
      notFound: true
    }
  }

  return {
    props:{
      caller
    }
  }
}