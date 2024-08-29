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

  const SkeletonFeatured =()=>{
    return(
      <div className='flex md:hidden gap-3 items-center animate-pulse shadow-md px-3 py-2 rounded-full'>
              <div className='h-10 w-10 bg-gray-400 rounded-3xl'></div>
              <p className=" w-4/5 h-8 bg-gray-400 font-semibold rounded-2xl text-wrap text-ellipsis text-lg ">
                &nbsp; 
              </p>
      </div>
    )
  }

const MobileSlider = () => {
    const {data,isFetching} = useQuery({ queryKey: ['todo'], queryFn: async()=> await getHomeFeaturedPosts() })
  return(
    <Slider className='p-0 md:hidden flex items-center border-b border-b-bgdark/50' {...settings}>
          {isFetching ? <SkeletonFeatured/> : data?.map((post, index)=>(
            <Link key={index} className=" mb-3 text-inherit transition-all hover:underline duration-500 hover:text-primary" href={`/detail/${post?.slug}`}>
                <div className='flex gap-3 items-center shadow-md px-3 py-2 rounded-full'>
                    <Image src={post?.image_url} alt={post?.title} width={40} height={40} 
                    className=" h-10 w-10 rounded-3xl" />
                    <p className=" font-semibold text-wrap text-ellipsis text-lg ">
                        {post.title?.slice(0, 30)}... 
                    </p>
                </div>
          </Link>
          ))}
    </Slider>
  )
}

