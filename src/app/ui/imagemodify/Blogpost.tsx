import Image from "next/image";

export const Blogpost = ({ src, alt, width, height }:
    {alt:string, src:any, width:string, height:string}) => {
    return (
      <div style={{ position: 'relative', width: `${width}`, height: `${height}`, zIndex:4 }}>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <mask id="trapezium-maskmobile" x="0" y="0" width="100%" height="100%">
              <polygon points={`0,0 300,35 0,900 0,400`} fill="white" />
            </mask>
          </defs>
        </svg>
        <Image className='rounded-md' src={src} alt={alt}
          style={{
            width: '100%',
            height: '100%',
            mask: 'url(#trapezium-maskmobile)',
            WebkitMask: 'url(#trapezium-maskmobile)',
            objectFit: 'cover',
            /* transform:'rotateY(35deg)' */

          }}
        />
      </div>
    );
  };