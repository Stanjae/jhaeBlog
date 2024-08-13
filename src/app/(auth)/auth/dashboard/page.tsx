import { auth } from '@/auth'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | JhaeBlog',
};

const page = async() => {
  const session = await auth()
  return (
    <div>
      page default for dashboard
      <p>{JSON.stringify(session)}</p>

    </div>
  )
}

export default page
