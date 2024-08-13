'use client'
import { Oxanium } from 'next/font/google';
import { usePathname } from 'next/navigation';

const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
  })

const CCategoryFeaturedHeader = () => {
    const pathname = usePathname()
  return (
    <h1 className={`${oxanium.className} text-wrap md:text-3xl font-bold`}>
          {pathname === '/posts' ? 'Categories' : 'Featured Posts'}
    </h1>
  )
}

export default CCategoryFeaturedHeader
