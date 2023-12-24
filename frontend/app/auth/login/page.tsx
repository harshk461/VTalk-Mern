'use client'

import Loader from '@/app/Utils/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const [data, setData] = useState<LoginData>({
        email: '',
        password: '',
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post(baseUrl + "/auth/login", data)
                .then(res => {
                    console.log(res.data);
                    localStorage.setItem("token", res.data.token);
                    router.replace("/");
                })
                .catch((e) => {
                    toast.error("Enter Fields Properly or Server Error");
                })
        }
        catch (e) {
            console.log((e as Error).message);
            // toast.error("Server Error");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="w-full max-w-[500px] relative flex flex-col px-8 py-8 rounded-md text-black border shadow-lg shadow-black bg-white">
                <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">App</span></div>
                <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
                <div className="flex flex-col gap-3">
                    <div className="block relative">
                        <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                    </div>
                    <div className="block relative">
                        <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />

                    </div>
                    <div>
                        <a className="text-sm text-[#7747ff]" href="/auth/forgot-password">Forgot your password?
                        </a></div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

                </div>
                <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a className="text-sm text-[#7747ff]" href="/auth/register">Sign up!</a></div>
            </div>
            {loading && <Loader />}
        </div>
    )
}
