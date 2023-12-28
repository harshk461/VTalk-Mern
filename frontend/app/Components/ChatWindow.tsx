'use client'

import React, { useState, useEffect } from 'react'
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
import MessageBox from '../Utils/MessageBox';

interface IMsgDataTypes {
    message: String;
    roomId: String;
    user: String;
}


export default function ChatWindow({ socket }: { socket: any }) {
    const { username } = useUser();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<IMsgDataTypes[]>([]);
    const user = jwtDecode(localStorage.getItem("token")).username;
    const sendMessage = async () => {
        console.log(username);
        const messageData = {
            user: user,
            message: message,
            roomId: username.contactID,
        };
        await socket?.emit("send_msg", messageData);
        setMessage('');
    };

    useEffect(() => {
        socket?.on("receive_msg", (data: IMsgDataTypes) => {
            setChat((prevChat) => [...prevChat, data]);
        });
    }, [socket]);

    console.log("Chat Array:", chat);
    return (
        <div className='relative w-full h-full bg-grey-700 flex flex-col'>
            <div className='w-full px-4 py-2 flex gap-10 h-[70px] items-center bg-[#111B21]'>
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

            {/*Messages Window*/}
            <div className='w-full h-full flex flex-col gap-1 p-4 overflow-y-scroll scroll'>
                {chat.map((item, i) => (
                    <MessageBox user={item.user} message={item.message} key={i} />
                ))}
            </div>

            {/*Send Message Div*/}
            <div className='bottom-0 w-full px-7 py-3 bg-[#202C33] flex justify-between items-center'>
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
