'use client'
import React from 'react'
import CategoryList from '../sidebars/CategoryList'
import FeaturedList from '../sidebars/FeaturedList'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient({defaultOptions: 
  {queries: {
    refetchOnWindowFocus: false
  }}});
  // This is a conditional render that will render the CategoryList component if the pathname is '/posts' and the FeaturedList component if the pathname is anything else.
const CCategoryFeaturedlist = () => {
  const pathname = usePathname()
  return (
    <QueryClientProvider client={queryClient}>
      <div>
      {pathname === '/posts' ? <CategoryList/> : <FeaturedList/>}
    </div>
    </QueryClientProvider>
    
  )
}

export default CCategoryFeaturedlist
