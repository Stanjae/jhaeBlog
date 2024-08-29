import { detailedPageRecentPost } from '@/app/lib/data'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Oxanium } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
})

const DetailPagePreNextSection = async({postSlug}:any) => {
    const recentPosts = await detailedPageRecentPost(postSlug)
    const prevPost = recentPosts?.at(Math.random() * recentPosts?.length)
    const nextPost = recentPosts?.at(Math.floor(Math.random() * recentPosts?.length))
  return (
    <section className=' py-12 bg-primary/10'>
            <div className=' md:gap-x-40 gap-x-20 flex md:flex-row flex-col justify-normal md:justify-between max-w-screen-lg mx-auto'>
                <div className=' pb-0.5 border-b border-b-bgdark space-y-5'>
                    <div className=' gap-x-2 items-center flex'>
                        <Link href={`/detail/${prevPost?.slug}`} className=' p-2 rounded-full border border-bgdark'>
                            <ChevronLeftIcon className=' h-3'/>
                        </Link>
                        <h4 className={`${oxanium.className} font-bold text-2xl`}>Previous Post</h4>
                    </div>
                    <div className=' border-l-4 border-l-bgdark'>
                        <p className=' text-wrap font-semibold px-2 text-lg'>
                        <Link href={`/detail/${nextPost?.slug}`} className=' text-inherit hover:text-primary'>
                               {prevPost?.title}
                        </Link>
                        </p>
                    </div>
                </div>

                <div className=' border-b pb-0.5 border-b-bgdark space-y-5'>
                    <div className=' gap-x-2 items-center justify-end flex'>
                        <h4 className={`${oxanium.className} font-bold text-2xl`}>Next Post</h4>
                        <Link href={`/detail/${nextPost?.slug}`} className=' p-2 rounded-full border border-bgdark'>
                            <ChevronRightIcon className=' h-3'/>
                        </Link>
                    </div>
                    <div className=' border-r-4 border-r-bgdark'>
                        <p className=' text-end text-wrap font-semibold px-2 text-lg'>
                            <Link href={`/detail/${nextPost?.slug}`} className=' text-inherit hover:text-primary'>
                               {nextPost?.title}
                               </Link>
                        </p>
                    </div>
                </div>
                

            </div>
        </section>
  )
}

export default DetailPagePreNextSection