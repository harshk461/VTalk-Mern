'use client'

import React, { useState, useEffect, useRef } from 'react'
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
    contactID: String;
    user1: String;
    user2: String;
    sender: String;
}

interface Chat {
    sender: String;
    message: String;
}

export default function ChatWindow({ socket }: { socket: any }) {
    const { username } = useUser();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Chat[]>([]);
    const token = localStorage.getItem("token");
    const user1 = token ? jwtDecode(token).username : '';
    const chatContainerRef = useRef();

    useEffect(() => {
        setChat([]);
    }, [username]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat]);

    const sendMessage = async () => {
        const messageData = {
            user1: user1,
            user2: username.username,
            message: message,
            contactID: username.contactID,
            sender: user1,
        };
        await socket?.emit("send_msg", messageData);
        setMessage('');
    };

    useEffect(() => {
        socket?.on("receive_msg", (data) => {
            setChat((prevChat) => [...prevChat, data]);
        });

        // return () => socket.off('receive_msg');
    }, [socket]);

    useEffect(() => {
        socket?.on("all_messages", (data) => {
            setChat((pre) => [...pre, ...data.messages]);
        });

        // return () => socket.off("all_messages");
    }, [socket]);


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
            <div className='w-full h-full flex flex-col gap-1 p-4 overflow-y-scroll scroll' ref={chatContainerRef}>
                {chat.map((item, i) => (
                    <MessageBox
                        user={item.sender}
                        message={item.message}
                        key={i} />
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
