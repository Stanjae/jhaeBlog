import DashboardSidebar from '@/app/ui/navigation/DashboardSidebar';
import { MobileDashNav } from '@/app/ui/navigation/MobileDashNav';
import React from 'react'

const layout = ({
    children, 
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='relative p-1 overflow-hidden flex min-h-dvh'>
      <div className=' h-full bg-red-400 w-[24%] border-r-bgdark hidden md:block fixed left-0 top-0 '>
        <DashboardSidebar/>
      </div>
      <div className=' md:ml-[24%] bg-gray-800 px-4 flex-1 relative'>
        <div className=' shadow-lg h-14 fixed w-full md:w-[76%] right-0 top-0 z-10 bg-white border-b-bgdark '>
          <div className=' md:hidden block relative z-20'>
            <MobileDashNav/>
          </div>
          
        </div>
        <div className=' mt-24'>
          {children}
        </div>
        
        
      </div>
    </div>
  )
}

export default layout
