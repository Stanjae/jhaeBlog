import Image from "next/image";
import React from "react";
import FeatImage from '../../../../public/wallpaperflare.com_wallpaper.jpg'

const AllPostCard = () => {
  return (
    <div className="relative flex max-w-screen-md flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-blue-gray-500/40 bg-gradient-to-r from-transparent to-primary/0">
            <Image style={{clipPath: 'polygon(12.5% 12.5%, 100% 0%, 100% 100%, 0% 100%)'}} className="object-cover w-full h-full" src={FeatImage} alt="fave"/>
        </div>
        {/* 'polygon(0% 0%, 90% 12.5%, 100% 100%, 0% 100%)' */}
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          Tailwind card
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis
          ligula.
        </p>
      </div>
      <div className=' p-6 text-sm relative flex items-center'>
            <Image className=' h-6 w-6 sm:h-6 sm:w-6 rounded-full object-cover' src={FeatImage} alt='author'/>
            <h5 className=' font-normal border-r border-r-bgdark px-3'>Ryan Mohses</h5>
            <h5 className=' font-normal text-bgdark/75 px-3'>29th Nov 2019</h5>
        </div>
      {/* <div className="p-6 pt-0">
        <button
          data-ripple-light="true"
          type="button"
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Read More
        </button>
      </div> */}
    </div>
  );
};

export default AllPostCard;
