'use client'
import { useDebounce } from '@/app/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedValue = useDebounce(searchQuery, 500);

  const handleSearch =(q:any)=>{
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset page to 1 when search query changes
    if (q != '') {
      params.set('query', q);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleType =(q:any)=>{
    setSearchQuery(q)
    const params = new URLSearchParams(searchParams); 
    if(q.length === 0){
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if(debouncedValue){
      handleSearch(debouncedValue)
      //console.log(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <form action={''} className="max-w-md mx-auto mt-12">
      <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
              type="search"
              onChange={(e) => {
                handleType(e.target.value);
              }}
              placeholder="Read aloud"
              defaultValue={searchParams.get('query')?.toString()}
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-bg-primary"
          />
      </div>
    </form>
  )
}

export default SearchInput
