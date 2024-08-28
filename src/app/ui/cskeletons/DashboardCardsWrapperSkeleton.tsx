import React from 'react'

const DashboardCardsWrapperSkeleton = () => {
  return (
    <div className=' animate-pulse gap-4 grid grid-cols-3'>
        {Array(3).fill(0).map((_, i) =>(
            <div key={i} className="relative col-span-3  md:col-span-1 bg-gray-100 py-5 px-5  z-30 rounded-xl shadow-xl">
                <div className={` h-3 w-56 rounded-full bg-gray-100 text-4xl mb-2 font-bold`}> &nbsp;</div>
                <span className='h-1.5 w-24 rounded-full bg-gray-100'> &nbsp;</span>
            </div>
        ))}
        
    </div>
  )
}

export default DashboardCardsWrapperSkeleton