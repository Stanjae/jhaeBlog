import { SearchParamProps } from '@/app/lib/definitions';
import { PostsTable } from '@/app/ui/table/PostsTable';
import React from 'react'

const page = async({searchParams}:SearchParamProps) => {
  

  //fetch my posts
  return (
    <div>
     <PostsTable searchParams={searchParams}/>
    </div>
  )
}

export default page
