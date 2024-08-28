import React from 'react'
import { CustomAvatarWithMenu } from './CustomAvatarWithMenu'
import { auth } from '@/auth'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import { Badge } from './CustomComponents'

const CustomAvatarWrapper =async () => {
    const session = await auth()
  return (
    <div className='flex items-center gap-4'>
        <Badge color='red'>
            <BellAlertIcon className='h-8 w-8 text-gray-500'/>
        </Badge>
        <CustomAvatarWithMenu session={session?.user}/>
    </div>
  )
}

export default CustomAvatarWrapper