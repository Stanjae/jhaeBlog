import { Oxanium } from 'next/font/google'
import Logo from '../../../../public/wallpaperflare.com_wallpaper.jpg'
import { Blogpost } from '../../ui/imagemodify/Blogpost'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import MailingListForm from '../../ui/forms/MailingListForm'
import SeeMoreCard from '../../ui/cards/SeeMoreCard'
import AllPostCard from '@/app/ui/cards/AllPostCard'


const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
})

const Posts = () => {
  return (
    <div>
      <div className=" py-10 pr-20 border-b border-bgdark">
            <h1 className={`${oxanium.className} text-[42px] leading-10 md:leading-none text-wrap md:text-7xl font-bold`}>
                All Posts
            </h1>
          </div>
          <div className=" pl-5 py-10 pr-10 grid gap-10 grid-cols-6">
            <div className=' col-span-6 sm:col-span-3'>
                <AllPostCard/>
            </div>
            <div className=' col-span-6 sm:col-span-3'>
                <AllPostCard/>
            </div>
          </div>
    </div>
      )
}

export default Posts
