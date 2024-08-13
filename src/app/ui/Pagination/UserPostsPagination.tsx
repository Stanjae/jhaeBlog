'use client';
import React, { useEffect, useState } from 'react'
import {Button, CardFooter, IconButton } from "../customComponents/CustomComponents";
import { usePathname, useSearchParams , useRouter} from 'next/navigation';
import {generatePagination} from '../../hooks/sluggify'

const UserPostsPagination = ({totalPages}:{totalPages: number}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const { replace } = useRouter();

    const [changedPage, setChangedPage] = useState(currentPage);
    //const cpage = 10;
    //const totalP = 10

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace( `${pathname}?${params.toString()}`);
      };
    
      useEffect(() => {
            createPageURL(changedPage)
        
      }, [changedPage])

    const pagesArray = generatePagination(currentPage, totalPages);
     
  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button onClick={()=> setChangedPage(prev => (prev === 1 ? prev : prev - 1))} variant="outlined" size="sm">
          Previous {totalPages}
        </Button>
        <div className="flex items-center gap-2">
        {pagesArray?.map((page) => (
            <IconButton key={page} variant={`${page == currentPage ? "gradient" : "outlined"}`} size="sm">
            {page}
          </IconButton>
          
        ))}
        </div>
        <Button className=' z-50' onClick={()=> setChangedPage(prev => (prev == totalPages ? prev : prev + 1))} variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
  )
}

export default UserPostsPagination
