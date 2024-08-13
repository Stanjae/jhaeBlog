'use client'
import { Oxanium } from 'next/font/google'
import { usePathname } from 'next/navigation'
import React from 'react'

const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
  })

const DashboardCurrentTypo = () => {
    const pathname = usePathname()
    //console.log(pathname)
  return (
    <div className=' py-5 px-2 mt-16 border-b border-b-bgdark'>
      <h1 className={`${oxanium.className} text-4xl font-semibold`}>{pathname === '/auth/dashboard' ? 'Dashboard': pathname === '/auth/dashboard/create-post' ?
       'Create Post' : pathname.includes('edit') ? 'Edit Post' : pathname === '/auth/dashboard/posts' ? "Posts" :  pathname === '/auth/dashboard/categories' ? "Categories" : pathname === '/auth/dashboard/settings' ? 'Settings' : 'Others'}</h1>
    </div>
  )
}

export default DashboardCurrentTypo
