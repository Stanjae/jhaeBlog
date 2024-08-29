import { dummyFunction } from '@/app/lib/actions';
import DashboardSidebar from '@/app/ui/navigation/DashboardSidebar';
import { MobileDashNav } from '@/app/ui/navigation/MobileDashNav';
import DashboardCurrentTypo from '@/app/ui/typography/DashboardCurrentTypo';
import React from 'react'
import { Metadata } from 'next';
import CustomAvatarWrapper from '@/app/ui/customComponents/CustomAvatarWrapper';
 
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
    <div className='relative p-1 overflow-hidden flex min-h-dvh'>
      <div className=' h-full w-[21%] border-r-bgdark hidden md:block fixed left-0 top-0 '>
        <DashboardSidebar/>
      </div>
      <div className=' md:ml-[21%] bg-primary/10 px-4 flex-1 relative'>
        <div className=' shadow-lg h-14 pr-16 flex justify-between md:justify-end fixed w-full md:w-[79%] right-0 top-0 z-10 bg-white border-b-bgdark '>
          <div className=' md:hidden block relative z-20'>
            <MobileDashNav/>
          </div>
          <CustomAvatarWrapper/>
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
