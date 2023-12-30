import Image from 'next/image'
import React, { useEffect } from 'react'
import { useUser } from '../context/context';
import { jwtDecode } from 'jwt-decode';

interface ContactData {
    imageUrl: String,
    name: String,
    username: String;
    contactID: String;
}

export default function ContactCard(
    { contact, socket, index, currentIndex, setCurrentIndex }
        : { contact: ContactData, socket: any, index: Number, currentIndex: Number, setCurrentIndex: Function }) {
    const { username, updateUsername } = useUser();
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token).username : '';
    const handleClick = () => {
        setCurrentIndex(index);
        socket?.emit("join_room", contact.contactID);
        updateUsername({ name: contact.name, username: contact.username, contactID: contact.contactID });
        console.log(currentIndex === index);
    }

    return (
        <div
            onClick={handleClick}
            className={`flex gap-4 items-center p-4 cursor-pointer
            ${index === currentIndex ? 'pointer-events-none' : ''}`}>
            <Image
                src={contact.imageUrl}
                alt='Contact'
                width={40}
                height={40} />

            <div className='flex flex-col'>
                <div className='text-md font-semibold text-zinc-300'>
                    {contact.name}
                </div>
                <div className='text-sm font-semibold text-zinc-500'>
                    {contact.username}
                </div>
            </div>
        </div>
    )
}
