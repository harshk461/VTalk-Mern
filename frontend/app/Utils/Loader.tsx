import React from 'react'

export default function Loader() {
    return (
        <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-55 z-10'>
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
        </div>
    )
}
