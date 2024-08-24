import React from 'react'
import { getAllAuthorPostsById } from '@/app/lib/data'
import ProfileListTabs from './ProfileListTabs'

const ProfilePostsList = async({authorId}: {authorId: string}) => {
    const posts = await getAllAuthorPostsById(authorId)
  return (
    <section>
        <ProfileListTabs posts={posts}/>
    </section>
  )
}

export default ProfilePostsList
