import { auth } from '@/auth'
import React, { Suspense } from 'react'
import { Metadata } from 'next';
import DashboardCardWrapper from '@/app/ui/customComponents/DashboardCardWrapper';
import DashboardCardsWrapperSkeleton from '@/app/ui/cskeletons/DashboardCardsWrapperSkeleton';
import DashboardRecharts from '@/app/ui/customComponents/DashboardRecharts';

export const metadata: Metadata = {
  title: 'Dashboard | JhaeBlog',
};

const page = async() => {
  const session = await auth()
  return (
    <div className=''>
      <Suspense key={session?.user.userid} fallback={<DashboardCardsWrapperSkeleton/>}>
        <DashboardCardWrapper userid={session?.user.userid} />
      </Suspense>
      <Suspense>
        <DashboardRecharts/>
      </Suspense>

    </div>
  )
}

export default page
