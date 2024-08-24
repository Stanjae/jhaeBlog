'use client'
import { getAllLikesByPostId } from '@/app/lib/data'
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import millify from 'millify'
import { Oxanium } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Spinner } from '../customComponents/CustomComponents'

const oxanium = Oxanium({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oxanium",
})

const ProfilePostCard = ({post}:any) => {

  const { isPending, data } = useQuery({
    queryKey: ['totalLikes', post?.id],
    queryFn: () => getAllLikesByPostId(post?.id),
  })
  const newMeta = post?.metadata.slice(0, 45)
  const newDate = new Date(post?.updated_at).toDateString()
  return (
    <div className="flex flex-1 items-end px-2 py-3 border-b gap-x-5 border-b-gray-200">
      <div className=' grow space-y-3'>
        <div className='flex items-center gap-2'>
          <Image className='rounded-full h-5 w-5' src={post?.profile_image_url} alt={post?.slug} width={50} height={50}/>
          <p className='font-semibold text-sm'>{post?.first_name + " " + post?.last_name}</p>
        </div>
        <h1 className={`${oxanium.className} text-2xl text-textdark text-wrap font-bold`}>
          <Link href={`/detail/${post?.slug}`} className='hover:underline hover:text-primary  text-inherit transition-all duration-200 ease-in'> 
            {post?.title}</Link></h1>
        <p className='text-bgdark'>{newMeta}...</p>
        <div className='flex text-bgdark items-center gap-3'>
          {post?.type === "featured post" && <StarIcon className='h-4 w-4 text-yellow-600'/>}
          <p className=' font-semibold text-sm'>{newDate}</p>
          <div className=' flex items-center gap-x-1'>
            <HeartIcon className='h-4 w-4 text-gray-600'/>
            <span className='text-sm text-gray-600'>{isPending ? < Spinner className='h3 w-3' />: millify(data || 0)}</span>
          </div>
        </div>
      </div>
      <Image className=' object-cover rounded w-40 h-32' width={160} height={250} src={post?.image_url} alt={post?.title}/>
    </div>
  )
}

export default ProfilePostCard
