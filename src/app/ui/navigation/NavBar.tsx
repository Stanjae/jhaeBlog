
import Link from 'next/link'
import Logo from '../../../../public/siteLogo.png'
import Image from "next/image"
import {Avatar, Typography} from '../customComponents/CustomComponents'
import { auth, signOut } from '@/auth'
import CusNavLinks from './CusNavLinks'
import CustomAvatar from '../customComponents/CustomAvatar'
import { MobileNavBar } from './MobileNavBar'


const NavBar = async() => {
    const session = await auth();

    const aSignOut = async () => {
        "use server"
          await signOut()
      }
  return (
    <header className={`z-50 border-b border-bgdark md:fixed w-full bg-white top-0 left-0`} >
        <div className='flex justify-between pr-3 md:justify-center max-w-screen-lg mx-auto gap-x-5 items-center '>
            <Image src={Logo} alt="logo" width={90} height={90} className=""/>
            <CusNavLinks/>
            <div className=' flex items-center space-x-3 '>
                {session?.user?.id ? (
                    <Link href={'/auth/dashboard'}><div className=' flex items-center space-x-3'>
                        {session?.user?.image ? (
                             <Avatar size='sm' alt={session?.user?.name || ''} src={session?.user?.image || ""} variant="circular"
                             withBorder={true} color="blue-gray" className=" p-0.5"/>
                        ) : (
                            <CustomAvatar name={session?.user.name?.toUpperCase().slice(0,2) || ''}/>
                        )
                        }       
                        <Typography variant='h6' className='font-bold hidden lg:inline-block' >Dashboard</Typography>
                </div></Link>)
                :<Link className=' hidden lg:inline-block' href='/auth/login'>Login</Link>
                }
                <button className='border hidden md:inline-block border-bgdark py-2 px-6 rounded-md transition-colors duration-500 hover:bg-bgdark hover:text-white '>Book a Call</button>
                <MobileNavBar aSignOut={aSignOut} session={session?.user}/>
            </div>
        </div>
        
    </header>
    
  )
}

export default NavBar
