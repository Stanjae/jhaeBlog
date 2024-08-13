'use client'
import { usePathname } from "next/navigation"


const FirstLayoutContainer = ({children}:{children:React.ReactNode}) => {
    const pathname = usePathname()
  return (
    <main className={`${pathname.includes('/detail') ? '':'max-w-screen-lg px-4'}  mt-[91px]  mx-auto`}>
        {children} 
      </main>
  )
}

export default FirstLayoutContainer
