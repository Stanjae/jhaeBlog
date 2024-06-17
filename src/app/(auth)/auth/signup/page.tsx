'use client'
import LoginForm from '@/app/ui/auth/Login'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import Logo from '../../../../../public/siteLogo.png'
import SignupForm from '@/app/ui/auth/SignUp';

const Page = () => {
    const[authStatus, setAuthStatus] = useState(false)
  return (
    <main className="w-full  flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
                <Image src={Logo} alt='logo' height={55} width={100} className="mx-auto" />
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign Up to your account</h3>
                    <p className="">Do you have an account? 
                        <Link href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login</Link></p>
                </div>
            </div>
            <SignupForm/>
            <div className="text-center">
                <a href="/" className="hover:text-indigo-600">Forgot password?</a>
            </div>
        </div>
    </main>
   
  )
}

export default Page
