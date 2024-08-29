'use client'
import { getHomeFeaturedPosts } from '@/app/lib/data';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Link from 'next/link';
import React from 'react'
import Slider from "react-slick";
import { TrapeziumImage } from '../cards/PostCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
})

const MobileFeaturedList = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <MobileSlider />
    </QueryClientProvider>
  )
}

export default MobileFeaturedList

let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

const MobileSlider = () => {
    const {data,isFetching} = useQuery({ queryKey: ['todo'], queryFn: async()=> await getHomeFeaturedPosts() })
  return(
    <Slider className='p-0 md:flex hidden items-center border-b border-b-bgdark/50' {...settings}>
          {data?.map((post, index)=>(
            <Link key={index} className=" mb-3 text-inherit transition-all hover:underline duration-500 hover:text-primary" href={`/detail/${post?.slug}`}>
                <div className='flex gap-3 items-center shadow-md px-3 py-2 rounded-full'>
                    <Image src={post?.image_url} alt={post?.title} width={40} height={40} 
                    className=" h-10 w-10 rounded-3xl" />
                    <p className=" font-semibold text-wrap text-ellipsis text-lg ">
                        {post.title?.slice(0, 20)}... 
                    </p>
                </div>
          </Link>
          ))}
    </Slider>
  )
}