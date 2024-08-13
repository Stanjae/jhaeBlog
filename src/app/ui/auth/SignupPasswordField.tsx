'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

const SignupPasswordField = () => {
    const [showpw, setShowpw] = useState(true)
  return (
    <div className='relative'>
        <label htmlFor="password" className="font-medium">
            Password
        </label>
        <input type={showpw ? "password" : "text"} required name="password"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
        <button type='button' onClick={() => setShowpw(!showpw)} className=' absolute right-2 top-[60%]'>
            {showpw ? <EyeIcon className='w-5 h-5'/> : <EyeSlashIcon className='w-5 h-5'/>}
        </button>
</div>
  )
}

export default SignupPasswordField
