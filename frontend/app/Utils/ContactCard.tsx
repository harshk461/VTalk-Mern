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

export default function ContactCard({ contact, socket }: { contact: ContactData, socket: any }) {
    const { username, updateUsername } = useUser();
    const user = jwtDecode(localStorage.getItem("token")).username;
    const handleClick = () => {
        socket?.emit("join_room", contact.contactID);
        updateUsername({ name: contact.name, username: contact.username, contactID: contact.contactID });
    }

    return (
        <div
            onClick={handleClick}
            className='flex gap-4 items-center p-4 cursor-pointer'>
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
