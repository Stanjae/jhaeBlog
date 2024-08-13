import { Oxanium } from 'next/font/google'
import Image from 'next/image'
import MailingListForm from '../../../ui/forms/MailingListForm'
import SeeMoreCard from '../../../ui/cards/SeeMoreCard'
import { getAllLikesByPostId, getDetailedPostBySlug, getLikePostByPostId } from '@/app/lib/data'
import DOMPurify from 'isomorphic-dompurify';
import BackButton from '@/app/ui/CustomButton/BackButton'
import DetailPagePreNextSection from '@/app/ui/customComponents/DetailPagePreNextSection'
import { Suspense } from 'react'
import DetailPrevNextSection from '@/app/ui/cskeletons/DetailPrevNextSection'
import { Chip, Tooltip } from '@/app/ui/customComponents/CustomComponents'
import { StarIcon } from '@heroicons/react/24/solid'
import YouMayAlsoLike from '@/app/ui/customComponents/YouMayAlsoLike'
import { YouMayAlsoLikeSkeleton } from '@/app/ui/cskeletons/YoutMayAlsoLikeSkeleton'
import PostLike from '@/app/ui/likes/PostLike'
import { auth } from '@/auth'


const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
})

const Posts = async({ params : {uid}}:{ params: { uid: string } }) => {
    const post = await getDetailedPostBySlug(uid)
    const session = await auth()
    
    //console.log('the current post',post)
    const clean = DOMPurify.sanitize(post?.content.trim());
    const newDate = new Date(post?.created_at).toDateString()
    const initialLiked = await getLikePostByPostId(post?.postid, session?.user.userid)

    const noOfLikes = await getAllLikesByPostId(post?.postid)
    console.log('the number of likes',noOfLikes)

    
  return (
    <main className=" mx-auto h-screen">
        <section className=' mt-[91px] border-b border-b-bgdark pt-8 blog-post'>
            <div className=' space-y-5 mx-auto max-w-screen-lg '>
                <BackButton/>
                <h1 className={`${oxanium.className} text-[42px] leading-10 md:leading-none text-wrap md:text-6xl font-bold`}>
                    {post?.title}
                </h1>
                <div className=' text-sm sm:text-base relative flex items-center'>
                    <Image width={28} height={28} className=' h-7 w-7 sm:h-10 sm:w-10 rounded-full object-cover' src={post?.image_url} alt='author'/>
                    <h5 className=' font-semibold border-r border-r-bgdark px-3'>{post?.author}</h5>
                    <h5 className=' font-normal px-3 border-r border-r-bgdark'>{newDate}</h5>
                    <Chip className='ml-3' size="sm" value={post?.category} />
                    {post?.type == "featured post" && <Tooltip content={post?.type}>
                        <StarIcon className=' h-5 w-5 sm:h-7 sm:w-7 ml-3 text-yellow-700' />
                    </Tooltip>}
                    <PostLike countLikes={noOfLikes} slug={uid} userId={session?.user.userid} initialLiked={initialLiked} postId={post?.postid}/>
                </div>
                <Image quality={100} blurDataURL={post?.image_url} placeholder="blur" priority={true} width={1280} height={1280}  sizes="(min-width: 808px) 50vw, 100vw" style={{clipPath: 'polygon(0% 0%, 90% 12.5%, 100% 100%, 0% 100%)'}}  
                className=' blogstyle w-full h-[300px] rounded-md object-cover mx-auto block' src={post?.image_url } alt={post?.slug}/>
            </div>
            
        </section>
        <section className=' pb-10'>
            <div className=' space-y-2 font-medium py-4 mx-auto max-w-screen-md '>
                <div dangerouslySetInnerHTML={{__html: clean.slice(1, clean.length -1)}}/>
            </div>

            <div className=' space-y-2 font-medium py-4 mx-auto max-w-screen-md '>
                <h6 className={`${oxanium.className} font-bold text-xl`}>Tags</h6>
                <Suspense fallback={'...loading'}>
                    <div className='flex gap-2 flex-wrap'>
                        {JSON.parse(post?.tags || '[]').map((tag: string) => (<Chip key={tag} 
                                            className="bg-primary text-white" size="md" value={tag}/>))}
                    </div>
                    
                </Suspense>
            </div>
            <div className=' border-y border-y-bgdark flex justify-between items-center space-y-2 py-4 mx-auto max-w-screen-md '>
               <h2 className={`${oxanium.className} font-bold text-3xl`}>Share this Post</h2>
               <div className="flex items-center gap-x-6 mt-6">
                    <a className=" p-3 border hover:text-white hover:bg-primary border-bgdark rounded-full" href="/">
                        <svg className="w-5 h-5 duration-150" fill="none" viewBox="0 0 48 48"><g clipPath="url(#a)"><path fill="currentColor" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                    </a>
                    <a className=" p-3 border hover:text-white hover:bg-primary border-bgdark rounded-full" href="">
                        <svg className="w-5 h-5duration-150" fill="none" viewBox="0 0 48 48"><g clipPath="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                    </a>
                    <a className=" p-3 border hover:text-white hover:bg-primary border-bgdark rounded-full" href="">
                        <svg className="w-5 h-5 duration-150" fill="none" viewBox="0 0 48 48">
                            <g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68">
                            <path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                    </a>
                </div>
            </div>
            <div className=' border-y-bgdark space-y-2 py-8 mx-auto max-w-screen-md '>
               <h2 className={`${oxanium.className} mb-5 font-bold text-3xl`}>Join Our Mailing List</h2>
               <MailingListForm/>
            </div>
        </section>
        {/* previous next section */}
        <Suspense  fallback={<DetailPrevNextSection/>}>
            <DetailPagePreNextSection postSlug={uid}/>
        </Suspense>
        
        {/* you may also like section */}
        <section className=' py-12 bg-primary/30'>
            <div className='max-w-screen-lg mx-auto'>
                <h2 className={`${oxanium.className} my-5 border-b-2 border-b-bgdark pb-5 font-bold text-3xl`}>You may also like</h2>
                <Suspense fallback={<YouMayAlsoLikeSkeleton/>}>
                    <YouMayAlsoLike postTags={post?.tags} postSlug={uid}/>
                </Suspense>
            </div>
            
        </section>
    </main>
  )
}

export default Posts
