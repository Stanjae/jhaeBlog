'use client'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()
  return (
    <button onClick={()=> router.back()} className=' z-50 inline-flex item-center font-bold text-lg pr-6 py-2'> 
    <ChevronLeftIcon className=' h-5 w-5'/>
    Go Back
</button>
  )
}

export default BackButton
