'use client'
import React from "react";
import { TrapeziumImage } from "../cards/PostCard";
import { getHomeFeaturedPosts } from "@/app/lib/data";
import { HomePagePosts } from "@/app/lib/definitions";
import { FeaturedSkeletonContainer } from "../loaders/cskeletons/FeaturedSkeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const FeaturedList = () => {
  const queryClient = useQueryClient()

  // Queries
  const {data,isFetching} = useQuery({ queryKey: ['todos'], queryFn: async()=> await getHomeFeaturedPosts() })
  
  return (
    <div>
      {isFetching ? <FeaturedSkeletonContainer/>:
        <ul>
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
        </ul>
      }
    </div>
  );
};

export default FeaturedList;








