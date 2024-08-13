
import { getAllCategories } from '@/app/lib/data'
import CreateForm from '@/app/ui/forms/CreateForm'
import React from 'react'

const page = async() => {
  const data = await getAllCategories()
  return (
    <div>
      <CreateForm data={data}/>
    </div>
  )
}

export default page
