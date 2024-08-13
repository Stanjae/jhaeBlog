import { SearchParamProps } from '@/app/lib/definitions';
import { CategoryTable } from '@/app/ui/table/CategoryTable'
import React from 'react'

export default async function Page({searchParams}:SearchParamProps) {
  const deleter = searchParams?.delete_confirmation;
  const updater = searchParams?.update_confirmation;
  return (
    <div>
      <CategoryTable updater={updater} deleter={deleter}/>
    </div>
  )
}

