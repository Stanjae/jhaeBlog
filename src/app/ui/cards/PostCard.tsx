import Image from 'next/image'
import React from 'react'
import Logo from '../../../../public/wallpaperflare.com_wallpaper.jpg'
import { Fira_Sans } from 'next/font/google';
import { TrapeziumImageMobile } from '../imagemodify/Mobileimg';
import Link from 'next/link';





const fira = Fira_Sans({subsets: ['latin'], weight: '400'});



const PostCard = ({width, height, alt, data}:{width:any, height:string, alt:string,  data:any}) => {
  //console.log(removeHTMLTags(data?.content));
  //const clean = DOMPurify.sanitize(data?.con.trim());
  const newDate = new Date(data?.created_at).toDateString()
  return (
    <div className=' px-4 sm:px-0 block sm:flex border-b pb-4 border-bgdark'>
      <div>
        <div className=' hidden sm:block'>
          <TrapeziumImage width={width} height={height} src={data.image_url} alt={alt}/>
        </div>
        
        <div className='block sm:hidden'>
          <TrapeziumImageMobile width='100%' height='225px' src={data.image_url} alt='mobile image'/>
        </div>
      </div>
      
      <div className={`${fira.className} py-2 sm:py-0 space-y-4 relative`}>
        <h3 className=' font-bold text-wrap text-2xl md:text-3xl '>
          <Link className='text-decoration-none transition-all duration-700 hover:text-primary hover:underline text-inherit' href={`/detail/${data?.slug}`}>
          {data?.title}
          </Link>
        </h3>
        <p className=' font-medium text-base text-wrap '>
          {data?.metadata?.slice(0, 150)}...
        </p>
        <div className=' md:absolute text-bgdark text-sm sm:text-base relative bottom-0 flex items-center'>
          <Image width={100} height={100} className=' h-7 w-7 sm:h-9 sm:w-9 rounded-full object-cover' src={data?.profile_image_url} alt='author'/>
          <h5 className=' font-normal border-r border-r-bgdark px-3'>
            <Link className='text-inherit transition-all duration-700 hover:text-primary hover:underline' 
            href={`/profiles/${data?.user_id}`}>{data?.author}</Link>
          </h5>
          <h5 className=' font-normal px-3'>{newDate}</h5>
        </div>
      </div>
    </div>
  )
}

export default PostCard



export const TrapeziumImage = ({ src, alt, width, height}:
  {alt:string, src:any, width:string, height:string}) => {
  return (
    <div style={{ position: 'relative', width: `${width}`, height: `${height}` }}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <mask id="trapezium-mask" x="0" y="0" width="100%" height="100%">
            <polygon points="0,0 240,25 250,250 0,250" fill="white" />
          </mask>
        </defs>
      </svg>
      <Image
      className='rounded-md'
        src={src}
        alt={alt}
        width={250}
        height={250}
        style={{
          width: '100%',
          height: '100%',
          mask: 'url(#trapezium-mask)',
          WebkitMask: 'url(#trapezium-mask)',
          objectFit: 'cover',
          transform:'rotateY(35deg)'
        }}
      />
    </div>
  );
};



