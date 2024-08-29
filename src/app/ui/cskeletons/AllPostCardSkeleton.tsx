import React from 'react'

const AllPostCardSkeleton = () => {
  return (
    <div className="relative animate-pulse flex max-w-screen-md flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border text-white shadow-blue-gray-500/40 ">
            <div style={{clipPath: 'polygon(12.5% 12.5%, 100% 0%, 100% 100%, 0% 100%)'}} 
            className="w-full h-40 bg-gray-400" />
        </div>
          <div className=' px-6 py-3 text-sm relative flex items-center'>
              <div className=' h-6 w-6 sm:h-6 sm:w-6 rounded-full bg-gray-400' />
              <div className=' h-3 w-40 font-normal px-3'> &nbsp;</div>
          </div>
        
        
      <div className="px-6 pt-1 pb-4">
        <h5 className="mb-2 w-72 bg-gray-400 h-5 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"> 
            &nbsp;
        </h5>
        <p className="block w-64 h-2 bg-gray-400 font-sans text-base font-light leading-relaxed text-inherit antialiased">
        &nbsp;
        </p>
      </div>
      <div className=' p-6 text-sm relative flex items-center'>
            <h5 className=' h-2 w-40 font-normal bg-gray-400 text-bgdark/75'>&nbsp;</h5>
        </div>
    </div>
  )
}

export default AllPostCardSkeleton