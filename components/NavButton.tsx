import { useRouter } from 'next/router';
import React from 'react'

interface Props{
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function NavButton({title, isActive, onClick}: Props) {

  return (
    <button onClick={onClick} className={`${isActive && "bg-purple-800 border border-purple-900"} hover:bg-purple-800 text-white py-2 px-4 rounded font-bold transition-all`}>
        {title}
    </button>
  )
}

export default NavButton