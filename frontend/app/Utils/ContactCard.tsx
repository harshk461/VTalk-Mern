import Image from 'next/image'
import React from 'react'
import { useUser } from '../context/context';

interface ContactData {
    imageUrl: string,
    name: string,
    username: string;
}

export default function ContactCard({ contact }: { contact: ContactData }) {
    const { username, updateUsername } = useUser();
    const handleClick = () => {
        updateUsername({ name: contact.name, username: contact.username });
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
