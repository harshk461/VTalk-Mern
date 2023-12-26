'use client'

import Loader from '@/app/Utils/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
    password2: string;
    dob: string;
}

export default function Register() {
    const router = useRouter();
    const [data, setData] = useState<RegisterData>({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        dob: '',
    });

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
            if (data.email.trim() === '' || data.dob === '' || data.password.trim() === '' || data.password2.trim() === '' || data.username.trim() === '') {
                toast.error("Enter All Fields");
                return;
            }

            if (data.password !== data.password2) {
                toast.error("Please Enter Both Password same");
                return;
            }

            setLoading(true);
            await axios.post(baseUrl + "/auth/register", data)
                .then(res => {
                    if (res.data.status === 'error') {
                        toast.error(res.data.message);
                        return;
                    }
                    toast.success("Registration Successful");
                    router.replace("/login");
                })
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 w-full">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-xl shadow-black sm:rounded-lg sm:px-10">
                        <div className='text-center mb-[30px] text-3xl font-semibold text-indigo-600'>
                            Sign Up
                        </div>
                        <div>
                            <div className='mb-6'>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required={true}
                                        type="text"
                                        id="name" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="username"
                                        value={data.username}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required={true} type="text" id="username" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required={true} type="email" id="email" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required={true} type="password" id="password" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="password2"
                                        value={data.password2}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required={true} type="password" id="confirm-password" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="dob">
                                    Date of Birth
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="dob"
                                        value={data.dob}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required={true}
                                        type="date"
                                        id="dob"
                                        max={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>

                            {/* <div className="flex items-center justify-center mt-6">
                                <span className="mr-3 text-gray-700 font-medium">Gender:</span>
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio h-5 w-5 text-pink-600" name="gender" value="Male" />
                                    <span className="ml-2 text-gray-700">Male</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input type="radio" className="form-radio h-5 w-5 text-purple-600" name="gender" value="Female" />
                                    <span className="ml-2 text-gray-700">Female</span>
                                </label>
                            </div> */}



                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        type="checkbox"
                                        name="terms-and-condition"
                                        id="terms-and-condition"
                                        required />
                                    <label className="ml-2 block text-sm text-gray-900" htmlFor="terms-and-condition">
                                        I agree to the terms and conditions
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleSubmit}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}
