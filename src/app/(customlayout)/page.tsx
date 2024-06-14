import { Oxanium } from "next/font/google";
import Image from "next/image";
import PostCard, { TrapeziumImage } from "../ui/cards/PostCard";
import SearchInput from "../ui/forms/SearchInput";
import glass from '../../../public/wallpaperflare.com_wallpaper.jpg'


const oxanium = Oxanium({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oxanium",
})

export default function Home() {
  return (
    <div>
      <div className=" py-10 pr-20 border-b border-bgdark">
            <h1 className={`${oxanium.className} text-[42px] leading-10 md:leading-none text-wrap md:text-7xl font-bold`}>Discover Our Latest Posts</h1>
          </div>
          <div className=" py-7 border-b border-bgdark">
            <PostCard alt={'sorry'} width="250px" height="250px" />
          </div>
    </div>
  );
}
