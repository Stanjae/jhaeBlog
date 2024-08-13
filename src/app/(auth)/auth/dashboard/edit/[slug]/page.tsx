import { getAllCategories, getPostById } from '@/app/lib/data'
import UpdateForm from '@/app/ui/forms/UpdateForm'
import React from 'react'


export default async function Page({ params : {slug}}: { params: { slug: string } }) {
  const editpost = await getPostById(slug)
  const data = await getAllCategories()

  const [fetchedData , categories] = await Promise.all([editpost, data])
      return(
        <div>
           <UpdateForm fetchedData={fetchedData}  categories={categories}/>
        </div>
      )
    }
