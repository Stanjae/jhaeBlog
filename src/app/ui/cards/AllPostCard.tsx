import Image from "next/image";
import React from "react";
import Link from "next/link";

const AllPostCard = ({post}:any) => {
  const newDate = new Date(post?.created_at).toDateString()
  return (
    <div className="relative flex max-w-screen-md flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border text-white shadow-blue-gray-500/40 ">
            <Image width={200} height={200} quality={100} style={{clipPath: 'polygon(12.5% 12.5%, 100% 0%, 100% 100%, 0% 100%)'}} 
            className="object-cover w-full h-full" src={post?.image_url} alt="fave"/>
        </div>
        <Link className="hover:no-underline hover:text-primary no-underline" href={`/profiles/${post?.user_id}`}>
          <div className=' px-6 py-3 text-sm relative flex items-center'>
              <Image width={50} height={50} className=' h-6 w-6 sm:h-6 sm:w-6 rounded-full object-cover' src={post.profile_image_url} alt='author'/>
              <h5 className=' font-normal px-3'>{post?.author}</h5>
          </div>
        </Link>
        
      <div className="px-6 pt-1 pb-4">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          <Link className="text-inherit text-decoration-none text-primary hover:underline" href={`/detail/${post?.slug}`}>{post?.title}</Link>
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {post?.metadata?.slice(0, 100)}...
        </p>
      </div>
      <div className=' p-6 text-sm relative flex items-center'>
            <h5 className=' font-normal text-bgdark/75'>{newDate}</h5>
        </div>
    </div>
  );
};

export default AllPostCard;
