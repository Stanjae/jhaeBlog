'use client'
import { getHomeFeaturedPosts } from '@/app/lib/data';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Link from 'next/link';
import React from 'react'
import Slider from "react-slick";
import { TrapeziumImage } from '../cards/PostCard';


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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

const MobileSlider = () => {
    const {data,isFetching} = useQuery({ queryKey: ['todo'], queryFn: async()=> await getHomeFeaturedPosts() })
  return(
    <Slider className=' md:hidden flex items-center' {...settings}>
          {data?.map((post, index)=>(
            <li key={index} className=" flex px-2 border-b border-b-bgdark/50 flex-1 items-center py-5 gap-x-4">
            <TrapeziumImage
              src={post.image_url}
              alt="featured"
              width="50px"
              height="50px"
            />
            <h5 className=" font-semibold text-pretty text-lg ">
             <Link className=" text-inherit transition-all hover:underline duration-500 hover:text-primary" href={`/detail/${post?.slug}`}>
             {post.title}</Link> 
            </h5>
          </li>
          ))}
    </Slider>
  )
}