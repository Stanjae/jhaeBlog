'use client'
import { followUser, getFollowById } from '@/app/lib/actions'
import React, { useEffect, useState } from 'react'

const FollowButton = ({newFollower, authorId}:any) => {
    const [isFollowing, setIsFollowing] = useState<boolean>()

    useEffect(()=>{
        const checkFollowingStatus = async() => {
            const response = await getFollowById(newFollower, authorId)
            if(response){
                setIsFollowing(true)
            }else{
                setIsFollowing(false)
            }
        }
        checkFollowingStatus()
    }, [])

    const handleFollow = async() => {
     const response = await followUser(newFollower, authorId)
     if(response?.status === 'followed'){
        setIsFollowing(true)
     }else{
        setIsFollowing(false)
     }
        
    }
  return (
    <div>
      <button onClick={handleFollow}
      className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
      {isFollowing ? 'Following' : 'Follow'}
    </button>
    </div>
  )
}

export default FollowButton
