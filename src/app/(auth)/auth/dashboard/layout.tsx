import { dummyFunction } from '@/app/lib/actions';
import DashboardSidebar from '@/app/ui/navigation/DashboardSidebar';
import { MobileDashNav } from '@/app/ui/navigation/MobileDashNav';
import DashboardCurrentTypo from '@/app/ui/typography/DashboardCurrentTypo';
import React from 'react'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | JhaeBlog Dashboard',
    default: 'JhaeBlog Dashboard',
  },
  description: 'The official JhaeBlog',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

const layout = async({
    children, 
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    await dummyFunction()
  return (
    <div className='relative bg-gray-100 p-1 overflow-hidden flex min-h-dvh'>
      <div className=' h-full bg-red-400 w-[24%] border-r-bgdark hidden md:block fixed left-0 top-0 '>
        <DashboardSidebar/>
      </div>
      <div className=' md:ml-[24%] bg-gray-100 px-4 flex-1 relative'>
        <div className=' shadow-lg h-14 fixed w-full md:w-[76%] right-0 top-0 z-10 bg-white border-b-bgdark '>
          <div className=' md:hidden block relative z-20'>
            <MobileDashNav/>
          </div>   
        </div>
        <DashboardCurrentTypo/>
        <div className=' mt-1'>
          {children}
        </div>
        
        
      </div>
    </div>
  )
}

export default layout
