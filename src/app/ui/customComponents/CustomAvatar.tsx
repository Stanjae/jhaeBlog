import React from 'react'

const CustomAvatar = ({name}:any) => {
  return (
    <div className=' outline-4 outline outline-primary h-10 w-10 sm:h-9 sm:w-9 rounded-full text-white flex justify-center items-center bg-textdark'>
      {name}
    </div>
  )
}

export default CustomAvatar
