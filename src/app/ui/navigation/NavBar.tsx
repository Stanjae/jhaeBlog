
import Link from 'next/link'
import Logo from '../../../../public/siteLogo.png'
import Image from "next/image"
//import { Fira_Sans } from 'next/font/google'
import {Avatar, Typography} from '../customComponents/CustomComponents'
import { UserSession } from '@/app/lib/definitions'
import { auth } from '@/auth'
import CusNavLinks from './CusNavLinks'



//const fira = Fira_Sans({subsets: ['latin'], weight: '400'});

const NavBar = async() => {
    const session = await auth();
  return (
    <header className={`z-50 border-b border-bgdark md:fixed w-full bg-white top-0 left-0`} >
        <div className='flex justify-between md:justify-center max-w-screen-lg mx-auto gap-x-5 items-center '>
            <Image src={Logo} alt="logo" width={90} height={90} className=""/>
            <CusNavLinks/>
            <div className=' flex items-center space-x-3 '>
                {session?.user?.id ? (
                    <Link href={'/auth/dashboard'}><div className=' flex items-center space-x-3'>
                        <Avatar size='sm' alt={session?.user?.name || ''} src={session?.user?.image || ""} variant="circular"
                        withBorder={true} color="blue-gray" className=" p-0.5"/>
                        <Typography variant='h6' className='font-bold' >Dashboard</Typography>
                </div></Link>)
                :<Link href='/auth/login'>Login</Link>
                }
                <button className='border border-bgdark py-2 px-6 rounded-md transition-colors duration-500 hover:bg-bgdark hover:text-white '>Book a Call</button>
            </div>
        </div>
        
    </header>
    
  )
}

export default NavBar
