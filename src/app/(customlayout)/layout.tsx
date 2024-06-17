'use client'
import { Oxanium } from "next/font/google";
import Image from "next/image";
import PostCard, { TrapeziumImage } from "../ui/cards/PostCard";
import SearchInput from "../ui/forms/SearchInput";
import glass from '../../../public/wallpaperflare.com_wallpaper.jpg'
import { usePathname } from "next/navigation";
import FeaturedList from "../ui/sidebars/FeaturedList";
import CategoryList from "../ui/sidebars/CategoryList";
import NavBar from "../ui/navigation/NavBar";

const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
  })

export default function FirstLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className="h-screen" >
      <NavBar/>
      <main className={`${pathname.includes('/detail') ? '':'max-w-screen-lg px-4'}  mt-[91px]  mx-auto`}>
        {children} 
      </main>
    </div>
  );
}
