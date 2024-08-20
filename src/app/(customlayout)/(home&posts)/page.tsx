import { Oxanium } from "next/font/google";
import PostCard  from "../../ui/cards/PostCard";
import { homeRecentPosts } from "@/app/lib/data";


const oxanium = Oxanium({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oxanium",
})

export default async function Home() {
  const data = await homeRecentPosts()
  
  return (
    <div>
      <div className=" py-10 pr-16 border-b border-bgdark">
        <h1 className={`${oxanium.className} text-[42px] leading-10 md:leading-none text-wrap 
        md:text-7xl font-bold`}>Discover Our Latest Posts</h1>
      </div>
      <div className=" py-7 space-y-7 border-b border-bgdark">
        {data.map((post: any) => (
          <PostCard alt={post?.slug} key={post?.slug} data={post} width={"250px"} height="250px" />
        ))}
      </div>
    </div>
  );
}
