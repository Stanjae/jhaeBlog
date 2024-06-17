'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {
    const[authStatus, setAuthStatus] = useState(false)
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
                <Image src="https://floatui.com/logo.svg" alt='logo' height={75} width={150} className="mx-auto" />
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                    <p className="">Don &apos; t have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                </div>
            </div>
            
            <div className="text-center">
                <a href="/" className="hover:text-indigo-600">Forgot password?</a>
            </div>
        </div>
    </main>
   
  )
}

export default Page
