'use client'
import { usePathname } from "next/navigation"
import SearchInput from "../forms/SearchInput"


const CSearchInput = () => {
    const pathname = usePathname()
  return (
    <div>
      {pathname === '/posts' && <SearchInput/>}
    </div>
  )
}

export default CSearchInput
