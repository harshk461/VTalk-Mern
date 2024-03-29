'use client'

import React, { useEffect } from 'react'
import SideBar from './Components/SideBar'
import ChatWindow from './Components/ChatWindow'
import { useRouter } from 'next/navigation'
import { io } from "socket.io-client";
import { useUser } from './context/context'

export default function Page() {
  const router = useRouter();
  const { username } = useUser();
  useEffect(() => {
    const start = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
      }
    }

    start();
  }, [])

  var socket: any;
  socket = io("http://localhost:8000", {
    withCredentials: true,
  })


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[85%] h-[95%] flex shadow-xl shadow-black rounded-xl'>
        <SideBar socket={socket} />
        <ChatWindow socket={socket} />
      </div>
    </div>
  )
}
