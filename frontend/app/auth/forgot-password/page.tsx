import React from 'react'

export default function page() {
    return (
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="w-full max-w-[500px] border-2 rounded-lg p-8">
                <div className="flex flex-col">
                    <div>
                        <h2 className="text-4xl text-black">Reset password</h2>
                    </div>
                </div>
                <form>
                    <input value="https://jamstacker.studio/thankyou" type="hidden" name="_redirect" />
                    <div className="mt-4 space-y-6">
                        <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600"> Email   </label>
                            <input type="email" placeholder="Enter Email..." className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                        </div>
                        <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600"> Username   </label>
                            <input type="text" placeholder="Enter Username..." className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                        </div>

                        <div className="col-span-full">
                            <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"> Submit your request   </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
