import Image from 'next/image'
import React from 'react'

interface ContactData {
    imageUrl: string,
    name: string,
}

export default function ContactCard({ contact }: { contact: ContactData }) {
    return (
        <div className='flex gap-4 items-center p-4'>
            <Image
                src={contact.imageUrl}
                alt='Contact'
                width={40}
                height={40} />

            <div className='text-md font-semibold text-zinc-300'>
                {contact.name}
            </div>
        </div>
    )
}
