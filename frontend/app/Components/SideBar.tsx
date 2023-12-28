'use client'

import {
    ChevronRight,
    Plus,
    SettingsIcon
} from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ContactCard from '../Utils/ContactCard'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import NewContactWIndow from '../Utils/NewContactWIndow'

interface ContactData {
    imageUrl: String,
    name: String,
    username: String;
    contactID: String;
}


export default function SideBar({ socket }: { socket: any }) {
    const [contacts, setContacts] = useState<ContactData[]>([]);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [openNewContactWindow, setOpenNewContactWindow] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = token ? (jwtDecode(token) as any)?.username : "";

                await axios.get(baseUrl + "/contact/get/" + username)
                    .then(res => {
                        // console.log(res.data);
                        setContacts(res.data);
                    })
            }
            catch (e) { }
        }

        fetchContacts();
    }, [openNewContactWindow])

    useEffect(() => {
        console.log("Mounted");
    }, [])

    return (
        <div className='relative w-[35%] h-full bg-[#111B21] flex flex-col overflow-hidden rounded-s-xl'>
            <div className='w-full p-4 border-b-4 border-zinc-400 flex justify-between items-centers mb-[10px] h-[70px] bg-[#202C33]'>
                <div>
                    <Image
                        src="https://res.cloudinary.com/dydeckwis/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695924851/wihxdvavlfruks3rilqq.jpg"
                        alt="User"
                        width={40}
                        height={40} />
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <button>
                        <SettingsIcon
                            color='white'
                            size={30} />
                    </button>
                    <button>
                        <ChevronRight
                            color='white'
                            size={30} />
                    </button>
                </div>
            </div>
            <div>
                {contacts.map((item, i) => (
                    <ContactCard
                        key={i}
                        socket={socket}
                        contact={{
                            imageUrl: "https://res.cloudinary.com/dydeckwis/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695924851/wihxdvavlfruks3rilqq.jpg",
                            name: item.name,
                            username: item.username,
                            contactID: item.contactID,
                        }} />
                ))}
            </div>

            <div className={`absolute top-0 left-0 w-full h-full z-10 ${openNewContactWindow ? 'windowO block' : 'windowC'}`}>
                <NewContactWIndow setWindow={setOpenNewContactWindow} />
            </div>



            <div
                onClick={() => setOpenNewContactWindow(true)}
                className='absolute bottom-10 right-10 w-[60px] h-[60px] bg-slate-700 rounded-full
    flex justify-center items-center shadow-lg shadow-black cursor-pointer
    transition duration-200 ease-in-out hover:bg-zinc-500'
            >
                <Plus size={35} color='white' />
            </div>

        </div>
    )
}
