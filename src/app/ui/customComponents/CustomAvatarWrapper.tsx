import React from 'react'
import { CustomAvatarWithMenu } from './CustomAvatarWithMenu'
import { auth } from '@/auth'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import { Badge } from './CustomComponents'
import { signOut } from "@/auth"

const CustomAvatarWrapper =async () => {
    const session = await auth()

    const aSignOut = async () => {
      "use server"
        await signOut()
    }
  return (
    <div className='flex items-center gap-2'>
        <Badge color='red'>
            <BellAlertIcon className='h-8 w-8 text-gray-500'/>
        </Badge>
        <CustomAvatarWithMenu asignout={aSignOut} session={session?.user}/>
    </div>
  )
}

export default CustomAvatarWrapper