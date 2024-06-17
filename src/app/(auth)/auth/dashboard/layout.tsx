import React from 'react'

const layout = ({
    children, 
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className=' bg-slate-800 relative flex flex-1 h-screen'>
      <div className=' z-50 w-[25%] fixed left-0 top-0 bg-orange-600'></div>
      <div className=' ml-[25%] flex-grow bg-green-400'>
        {children}
      </div>
    </div>
  )
}

export default layout
