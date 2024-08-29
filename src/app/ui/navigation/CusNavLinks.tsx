'use client'
import Link from 'next/link'
import React from 'react'
import { Fira_Sans } from 'next/font/google'
import { DocumentIcon, HomeIcon, PhoneIcon } from '@heroicons/react/24/solid'

export const urlLinks = [
    {title:'home', url:'/', icon:<HomeIcon className='h-4 w-4'/>},
    {title:'posts', url:'/posts', icon:<DocumentIcon className='h-4 w-4'/>},
    {title:'contact us', url:'/contact-us', icon:<PhoneIcon className='h-4 w-4'/>}
]
const fira = Fira_Sans({subsets: ['latin'], weight: '400'});

const CusNavLinks = () => {
  return (
    <nav className=" font-medium text-lg flex-grow space-x-6 hidden md:flex">
            {urlLinks.map((link, index) => (
                <Link key={index} className={fira.className} href={link.url}>{link.title}</Link>
            ))}
            </nav>
  )
}

export default CusNavLinks
