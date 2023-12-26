'use client'

import React, { useState } from 'react'
import { useUser } from '../context/context'
import Image from 'next/image';
import {
    Mic,
    Plane,
    PlusCircleIcon,
    Send
} from 'lucide-react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function ChatWindow() {
    const { username } = useUser();
    const [message, setMessage] = useState('');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const sendMessage = async () => {
        try {
            const send_username = (jwtDecode(localStorage.getItem("token") as string) as { username: string }).username;
            const send_name = (jwtDecode(localStorage.getItem("token") as string) as { name: string }).name;

            const data = {
                sender_username: send_username,
                sender_name: send_name,
                receiver_username: username.username,
                receiver_name: username.name,
                message: message,
            };

            // console.log(data);
            await axios.post(baseUrl + "/chat/new-message", data);
            setMessage('');
        }
        catch (e) {
            toast.error("Server Error");

        }
    }

    return (
        <div className='relative w-full h-full bg-grey-700'>
            <div className='w-full px-4 py-2 border-b-4 border-zinc-400 flex gap-10 h-[70px] items-center bg-[#111B21]'>
                <div>
                    <Image
                        src="https://res.cloudinary.com/dydeckwis/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695924851/wihxdvavlfruks3rilqq.jpg"
                        alt="User"
                        width={40}
                        height={40} />
                </div>
                <div className='flex flex-col'>
                    <div className='text-md text-gray-200'>{username.name}</div>
                    <div className='text-sm text-gray-500'>{username.username}</div>
                </div>
            </div>
            {/*Send Message Div*/}
            <div className='absolute bottom-0 w-full px-7 py-3 bg-[#202C33] flex justify-between items-center'>
                <div>
                    <PlusCircleIcon
                        size={30}
                        color='#8696A0' />
                </div>
                <div className='w-[90%]'>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        className='w-full bg-[#2A3942] px-4 py-2 rounded-md outline-none text-gray-300' />
                </div>
                <div>
                    {message.length > 0 ?
                        <Send
                            onClick={sendMessage}
                            size={30}
                            color='#8696A0' />
                        :
                        <Mic
                            size={30}
                            color='#8696A0' />
                    }
                </div>
            </div>
        </div>
    )
}
