'use client'

import React, { useEffect } from 'react'
import SideBar from './Components/SideBar'
import ChatWindow from './Components/ChatWindow'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
      }
    }

    start();
  }, [])
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[85%] h-[95%] flex shadow-xl shadow-black rounded-xl'>
        <SideBar />
        <ChatWindow />
      </div>
    </div>
  )
}
