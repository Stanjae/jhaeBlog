"use client"
import Link from 'next/link'
import Logo from '../../../../public/siteLogo.png'
import Image from "next/image"
import { Fira_Sans } from 'next/font/google'

const urlLinks = [
    {title:'sell tickets', url:'posts'},
    {title:'about us', url:'/'},
    {title:'contact us', url:'/'}
]

const fira = Fira_Sans({subsets: ['latin'], weight: '400'});

const NavBar = () => {
  return (
    <header className={`z-50 border-b border-bgdark md:fixed w-full bg-white top-0 left-0`} >
        <div className='flex justify-between md:justify-center max-w-screen-lg mx-auto gap-x-5 items-center '>
            <Image src={Logo} alt="logo" width={90} height={90} className=""/>
            <nav className=" font-medium text-lg flex-grow space-x-6 hidden md:flex">
            {urlLinks.map((link, index) => (
                <Link key={index} className={fira.className} href={link.url}>{link.title}</Link>
            ))}
            </nav>
            <div className=' flex items-center space-x-3 '>
                <Link href='/login'>Login</Link>
                <button className='border border-bgdark py-2 px-6 rounded-md transition-colors duration-500 hover:bg-bgdark hover:text-white '>Book a Call</button>
            </div>
        </div>
        
    </header>
    
  )
}

export default NavBar
