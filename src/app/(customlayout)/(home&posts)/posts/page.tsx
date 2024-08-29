import { Oxanium } from 'next/font/google'
import AllPostCard from '@/app/ui/cards/AllPostCard'
import { getAllPosts } from '@/app/lib/data'
import AllPostCardSkeleton from '@/app/ui/cskeletons/AllPostCardSkeleton'


const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
})

const Posts = async({searchParams}:any) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const posts = await getAllPosts(query, currentPage)
  return (
    <div>
      <div className=" py-[38px] pr-20 border-b border-bgdark">
        <h1 className={`${oxanium.className} text-[42px] leading-10 md:leading-none text-wrap md:text-7xl font-bold`}>
            All Posts
        </h1>
      </div>
      <div className=" py-10 pr-10 grid gap-10 grid-cols-6">
        {posts?.map((post:any, index:number)=>(
            <div key={index} className=' col-span-6 sm:col-span-3'>
              {post ? <AllPostCard post={post}/> : <AllPostCardSkeleton/>}
            </div>
        ))}
        

      </div>
    </div>
      )
}

export default Posts
