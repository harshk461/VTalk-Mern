import { jwtDecode } from 'jwt-decode';
import React from 'react'

export default function MessageBox({ user, message }: { user: String, message: String }) {
    const username = jwtDecode(localStorage.getItem("token")).username;
    return (
        <div className={`flex ${user === username ? 'justify-end' : 'justify-start'}`}>
            <div className={`w-fit max-w-[30%] px-3 py-2 rounded-md ${user === username ? 'bg-green-400 justify-end' : 'bg-blue-400 justify-start'}`}>
                {message}
            </div>
        </div>
    )
}
