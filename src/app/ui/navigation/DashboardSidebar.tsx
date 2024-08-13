
import Image from 'next/image'
import React from 'react'
import Logo from '../../../../public/siteLogo.png'
import Link from 'next/link'
import { ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/solid'
import { auth } from '@/auth'
import { signOut } from "@/auth"
import DashboardSidePiece from './DashboardSidePiece'



const navsFooter = [
    {
        href: '/',
        name: 'Help',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
        ,
    },
    {
        href: '/auth/dashboard/settings',
        name: 'Settings',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    }
]


const DashboardSidebar = async() => {
    const session = await auth()
  return (
    <div>
        <nav className=" w-full h-svh border-r bg-white space-y-8 ">
            <div className="flex flex-col h-full">
                <div className='h-20 flex items-center px-8'>
                    <Link href='/' className='flex-none'>
                        <Image src={Logo} width={100} height={45} alt='logo dashboard' className="mx-auto" />
                    </Link>
                </div>
                <div className="flex-1 flex flex-col h-full overflow-auto">
                    <DashboardSidePiece/>
                    <div>
                        <ul className="px-4 pb-4 text-sm font-medium">
                            {
                                navsFooter.map((item, idx) => (
                                    <li key={idx}>
                                        <Link href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                            <div className="text-gray-500">{item.icon}</div>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                            <li>
                            <form action={async () => {
                                        "use server"
                                        await signOut()
                                    }}>
                            <button 
                             className="flex w-full bg-textdark text-white items-center gap-x-2 p-2 rounded-lg  hover:bg-textdark/85 active:bg-gray-100 duration-300">
                            <ArrowLeftEndOnRectangleIcon className='h-5 w-5'/> Logout
                                </button>
                                </form>
                                </li>
                        </ul>
                        <div className="py-4 px-4 border-t">
                            <div className="flex items-center relative gap-x-4">
                                <Image height={100} alt={session?.user.name || ''} width={100} src={session?.user.image || ''} className="w-11 h-11 rounded-full" />
                                <div>
                                    <span className="block text-gray-700 text-sm font-semibold">{session?.user?.name}</span>
                                    <Link
                                        href="/"
                                        className="block mt-px text-gray-600 hover:text-indigo-600 text-xs"
                                    >
                                        View profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </nav>
      
    </div>
  )
}

export default DashboardSidebar
