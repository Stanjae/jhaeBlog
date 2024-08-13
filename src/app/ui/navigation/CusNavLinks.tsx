'use client'
import Link from 'next/link'
import React from 'react'
import { Fira_Sans } from 'next/font/google'

const urlLinks = [
    {title:'home', url:'/'},
    {title:'posts', url:'/posts'},
    {title:'contact us', url:'/contact-us'}
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
