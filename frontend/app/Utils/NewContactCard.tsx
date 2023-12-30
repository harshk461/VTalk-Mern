import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';


export default function NewContactCard({ name, username, setWindow }: { name: string, username: string, setWindow: Function }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [loading, setLoading] = useState(false);
    const AddContact = async () => {
        const token = localStorage.getItem("token");
        const name2 = token ? (jwtDecode(token) as { name: string }).name : '';
        const user_id = token ? (jwtDecode(token) as { username: string }).username : '';
        const data = { username: username, name: name, name2: name2 };

        try {
            setLoading(true);
            const response = await axios.post(baseUrl + "/contact/add/" + user_id, data);
            console.log(response.data); // Log the response data for debugging

            if (response.data.status === 'already-exists') {
                toast.error("Contact Already Exists");
            } else {
                setWindow(false);
            }
        } catch (error) {
            toast.error("Error: " + error.message);
            console.error("Error in AddContact:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div
            onClick={AddContact}
            className='w-[92%] m-auto rounded-md bg-slate-200 flex justify-between p-2 mb-4'>
            <div className=' px-2 flex gap-3 items-center'>
                <div className='w-[40px] h-[40px] rounded-full bg-yellow-50'>
                    {/* <Image
                    src="https://res.cloudinary.com/dydeckwis/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695924851/wihxdvavlfruks3rilqq.jpg"
                    alt="User"
                    width={40}
                    height={40} /> */}
                </div>
                <div className='flex flex-col'>
                    <div className='text-md font-bold'>{name}</div>
                    <div className='text-sm text-zinc-600 font-semibold'>{username}</div>
                </div>
            </div>

            <button className='px-6 flex items-center  bg-green-500 rounded-md text-white font-semibold cursor-pointer'>
                {loading ?
                    <div className='w-[30px] h-[30px] border-t-2 animate-spin rounded-full'></div>
                    :
                    "Add"}
            </button>
        </div >
    )
}
