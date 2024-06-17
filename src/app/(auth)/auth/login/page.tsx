'use client'
import LoginForm from '@/app/ui/auth/Login'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import Logo from '../../../../../public/siteLogo.png'

const Page = () => {
    const[authStatus, setAuthStatus] = useState(false)
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
                <Image src={Logo} alt='logo' height={55} width={100} className="mx-auto" />
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                    <p className="">Don &apos; t have an account? 
                        <Link href="signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up</Link></p>
                </div>
            </div>
            <LoginForm/>
            <div className="text-center">
                <a href="/" className="hover:text-indigo-600">Forgot password?</a>
            </div>
        </div>
    </main>
   
  )
}

export default Page
