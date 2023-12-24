'use client'

import {
    ChevronRight,
    SettingsIcon
} from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ContactCard from '../Utils/ContactCard'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function SideBar() {
    const [contacts, setContacts] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = token ? jwtDecode(token).username : "";

                await axios.get(baseUrl + "/contact/get/" + username)
                    .then(res => {
                        console.log(res.data);
                        setContacts(res.data);
                    })
            }
            catch (e) { }
        }

        fetchContacts();
    }, [])

    return (
        <div className='w-[35%] h-full bg-[#232D3F] flex flex-col'>
            <div className='w-full h-fit p-4 border-b-4 border-zinc-400 flex justify-between items-centers mb-[10px]'>
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
                        contact={{
                            imageUrl: "https://res.cloudinary.com/dydeckwis/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695924851/wihxdvavlfruks3rilqq.jpg",
                            name: item.username
                        }} />
                ))}
            </div>
        </div>
    )
}
