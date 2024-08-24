
import React from 'react'
import { Typography } from '../customComponents/CustomComponents'

const ProfileCardSkeleton =() => {

  return (
    <div className='animate-pulse'>
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-gray-200 rounded-full p-2">
        <div className=" h-20 w-20 rounded-full bg-gray-300">
          &nbsp;
        </div>
      </div>
      <div>
        <Typography
          as="div"
          variant="h3"
          className="mb-4 text-xl font-bold h-3 w-56 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-4 text-sm text-wrap font-bold h-3 w-72 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
    <Typography as="div" variant="paragraph" 
    className="mb-4 text-sm text-wrap font-bold h-3 w-56 rounded-full bg-gray-300">
          &nbsp;
    </Typography>
    <Typography as="div" variant="h5" className='py-2 mt-3 px-6 rounded-full bg-gray-300 h-3 w-32'>&nbsp;</Typography>
        <Typography as="div" variant="h3"
          className="mt-6 text-lg text-wrap font-bold h-2 mb-4 w-32 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-4 text-sm font-bold h-32 w-72 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
  </div>
  )
}

export default ProfileCardSkeleton
