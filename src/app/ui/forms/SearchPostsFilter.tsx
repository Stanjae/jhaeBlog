'use client'
import React, { useEffect, useState } from 'react'
import { createCategory } from '@/app/lib/actions';
import {Input, Button} from '../customComponents/CustomComponents'
import { MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryProps, SignUpFormState } from '@/app/lib/definitions';
import DismissableAlert from '../alerts/DismissableAlert';
import { usePathname, useSearchParams, useRouter  } from 'next/navigation';
import { useDebounce } from '@/app/hooks/useDebounce';



const SearchPostsFilter = () => {
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
    <div>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                type="text"
                placeholder="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                onChange={(e) => {
                    handleType(e.target.value);
                  }}
                  defaultValue={searchParams.get('query')?.toString()}
                crossOrigin={undefined}
              />
            </div>
        {/* <DismissableAlert setResponse={setResponsei} status={responsei}/> */}
    </div>
  )
}

export default SearchPostsFilter
