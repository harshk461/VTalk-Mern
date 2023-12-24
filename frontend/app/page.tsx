import React from 'react'
import SideBar from './Components/SideBar'
import ChatWindow from './Components/ChatWindow'

export default function page() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[85%] h-[95%] flex'>
        <SideBar />
        <ChatWindow />
      </div>
    </div>
  )
}
