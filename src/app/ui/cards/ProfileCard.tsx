import { getProfileCardByAuthorId } from '@/app/lib/data'
import Image from 'next/image'
import React from 'react'
import FollowButton from '../follow/FollowButton'
import { auth } from '@/auth'
import ProfileFollowersList from '../customComponents/ProfileFollowersList'
import millify from "millify";

const ProfileCard = async({authorId}:{authorId: string}) => {
  const {singleProfile, totalFollowers, followers} = await getProfileCardByAuthorId(authorId)
  const profile = singleProfile.rows[0]
  const followersCount = millify(totalFollowers.rows[0].count)
  const followersList = followers.rows
  const newFollower = await auth()
  console.log("example: ", followers.rows)
  return (
    <div>
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-gray-200 rounded-full p-2">
        <Image src={profile.profile_image_url} alt={profile.first_name} height={100} width={100} 
        className="h-20 w-20 rounded-full object-cover" />
      </div>
      <div>
        <h3 className="text-xl font-bold">{profile.first_name + ' ' + profile.last_name}</h3>
        <p className="text-gray-500 text-sm">{followersCount} Followers</p>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{profile?.bio}.</p>
    <FollowButton newFollower={newFollower?.user.userid} authorId={authorId} />
    <h3 className="text-lg font-bold mt-6">Following</h3>
    <ProfileFollowersList followers={followersList}/>
  </div>
  )
}

export default ProfileCard
