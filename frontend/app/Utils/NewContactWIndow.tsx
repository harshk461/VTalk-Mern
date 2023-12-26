import { ChevronLeft, Divide } from 'lucide-react'
import React, { useState } from 'react'
import NewContactCard from './NewContactCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

interface contactData {
    name: string;
    username: string;
}

export default function NewContactWIndow({ setWindow }: { setWindow: Function }) {
    const [contacts, setContacts] = useState<contactData[]>([]);
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [user, setUser] = useState('');
    const findContact = async () => {
        try {
            if (user.trim() === '') {
                toast.error("Enter User");
                return;
            }
            setLoading(true);
            const username = jwtDecode(localStorage.getItem("token")).username;
            await axios.get(baseUrl + "/auth/get/" + user)
                .then(res => {
                    if (res.data.status === 'not-found') {
                        toast.error("User not found");
                        return;
                    }
                    const contactsWithoutCurrentUser = res.data.filter(contact => contact.username !== username);

                    setContacts(contactsWithoutCurrentUser);

                })
        }
        catch (e) {
            console.log(e);
            toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className='w-full h-full flex flex-col bg-slate-400'>
            <div
                onClick={() => setWindow(false)}
                className='flex justify-start cursor-pointer my-[20px] mx-[15px]'>
                <ChevronLeft size={35} />
            </div>

            <div className="flex items-center justify-center w-full px-[15px] py-[20px] mb-[20px]">
                <div className="w-full">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="w-full bg-white p-2 text-base font-semibold outline-0 rounded-md"
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            placeholder="Enter Username..."
                            id="" />
                        <input
                            type="button"
                            value="Search"
                            onClick={findContact}
                            className="bg-blue-500 p-2 rounded-md text-white font-semibold hover:bg-blue-800 transition-colors outline-none" />
                    </div>
                </div>
            </div>

            {loading ?
                <div className='w-[40px] h-[40px] rounded-full border-t-4 border-t-white animate-spin mx-auto'></div>
                :
                <div>
                    {contacts.length > 0 && contacts.map((item, i) => (
                        <NewContactCard
                            key={i}
                            name={item.name}
                            username={item.username}
                            setWindow={setWindow} />
                    ))}
                </div>
            }
        </div>
    )
}
