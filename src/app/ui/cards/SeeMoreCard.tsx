import { Fira_Sans } from 'next/font/google';
import Image from 'next/image'
import React from 'react'
import Logo from '../../../../public/wallpaperflare.com_wallpaper.jpg'
import { TrapeziumImageMobile } from '../imagemodify/Mobileimg';
import { TrapeziumImage } from './PostCard';
import Link from 'next/link';


const fira = Fira_Sans({subsets: ['latin'], weight: '400'});

const SeeMoreCard = ({width, height, alt, item}:{width:string, height:string, alt:string, item:any}) => {
  const newDate = new Date(item?.created_at).toDateString()
  return (
    <div className=' px-4 sm:px-0 block sm:flex'>
      <div>
        <div className=' hidden sm:block'>
          <TrapeziumImageo width={width} height={height} src={item?.image_url} alt={item?.slug}/>
        </div>
        
        <div className='block sm:hidden'>
          <TrapeziumImageMobile width='100%' height='225px' src={item?.image_url} alt='mobile image'/>
        </div>
      </div>
      
      <div className={`${fira.className} py-2 sm:py-0 space-y-3 relative`}>
        <h3 className=' font-bold text-wrap text-lg md:text-xl '>
          <Link className=' text-inherit text-decoration-none transition-all duration-500 hover:text-primary hover:underline' href={item?.slug}>{item?.title}</Link>
        </h3>
        <p className=' font-mormal text-sm md:text-base'>{item?.metadata}...
        </p>
        <div className=' md:absolute text-bgdark text-sm sm:text-base relative bottom-0 flex items-center'>
          <Image width={100} height={100} className=' h-5 w-5 sm:h-6 sm:w-6 rounded-full object-cover' src={Logo} alt='author'/>
          <h5 className=' font-normal  border-r border-r-bgdark px-3'>{item?.author}</h5>
          <h5 className=' font-normal px-3'>{newDate}</h5>
        </div>
      </div>
    </div>
  )
}

export default SeeMoreCard



export const TrapeziumImageo = ({ src, alt, width, height}:
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
        width={200}
        height={200}
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



