'use client'
import { Tooltip } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileFollowersList = ({followers}:any) => {
    const [count,  setCount] = React.useState(5)

    const handleMoreLess =()=>{
        setCount(count => count === 5? 10 : 5)
    }
  return (
    <div>
       <ul className="list-none mt-4">
        {followers.slice(0, count).map((item:any)=>(
            <li key={item?.follower_id} className="flex items-center gap-4 mb-2">
                <div className="bg-gray-200 rounded-full p-2">
                    <Image src={item?.profile_image_url} width={100} height={100} alt={item?.name} className="h-8 w-8 rounded-full" />
                </div>
                <div>
                    <h4 className="text-gray-600 text-sm">@ {item?.name}</h4>
                </div>
                <Tooltip content="View Profile" placement="top">
                    <Link href={`/profiles/${item?.follower_id}`} className="bg-gray-200 px-2 py-1 rounded-md text-gray-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                </Tooltip>
            </li>
        ))}
        

      <button onClick={handleMoreLess} className="text-gray-600 text-sm">
        {count === 5 ? 'See More':'See Less'} ({followers.length})</button>
    </ul>
    </div>
  )
}

export default ProfileFollowersList
