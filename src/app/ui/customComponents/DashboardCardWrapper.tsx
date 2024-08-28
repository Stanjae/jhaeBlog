import React from 'react'
import DashboardCard from '../cards/DashboardCard'
import { getDashboardCardsInfo } from '@/app/lib/data'
import millify from 'millify'

const DashboardCardWrapper = async({userid}:{userid: string | undefined}) => {
    const {postsCount, likesCount, followers} = await getDashboardCardsInfo(userid)
    const allPostsCount = millify(postsCount.rows[0].count)
    const allLikesCount = millify(likesCount.rows[0].count)
    const allFollowersCount = millify(followers.rows[0].count)
  return (
    <div className=' grid grid-cols-3 gap-4'>
        <div className=' col-span-3  md:col-span-1 '>
          <DashboardCard label={'Total Posts'} content={allPostsCount}/>
        </div>
        <div className=' col-span-3  md:col-span-1 '>
          <DashboardCard label='Total Likes' content={allLikesCount}/>
        </div>
        <div className=' col-span-3  md:col-span-1'>
          <DashboardCard label='Total Followers' content={allFollowersCount}/>
        </div>
      </div>
  )
}

export default DashboardCardWrapper