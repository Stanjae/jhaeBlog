
import { getProfileById, getUserByUserId } from '@/app/lib/userActions';
import ProfileCard from '@/app/ui/cards/ProfileCard';
import ProfileCardSkeleton from '@/app/ui/cskeletons/ProfileCardSkeleton';
import ProfilePostsList from '@/app/ui/customComponents/ProfilePostsList';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Oxanium } from 'next/font/google';
import Image from 'next/image';
import {Spinner} from '@/app/ui/customComponents/CustomComponents'
import { Suspense } from 'react';

const oxanium = Oxanium({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-oxanium",
})

export default async function Page({params}:{ params: { uid: string } }) {

  const newProfile = await getProfileById(params.uid) || {}

  const newDate = new Date(newProfile?.updated_at).toDateString()

  const completed = Object.keys(newProfile).reduce((acc, key) => {
    if (newProfile[key] !== '') acc++;
    return acc;
  }, 0);

  const user = await getUserByUserId(params.uid)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div style={{backgroundImage: `url(${newProfile.cover_image_url})`}} className=" bg-blend-overlay bg-black/50 bg-cover bg-center flex px-4 py-16 items-start gap-3 mb-6">
            <div className="bg-gray-200 rounded-full hidden p-2">
              <Image src="" alt="Medium logo" className="h-10 w-10" />
            </div>
            <div>
              <h3 className={`${oxanium.className} text-white text-4xl text-wrap font-bold`}>@{user?.name.replace(' ','_' )}</h3>
              <p className="text-gray-500 font-semibold text-base">{newDate} - <span>19 posts</span></p>
            </div>
            {completed === 14 && <CheckBadgeIcon className={`h-8 w-8 text-primary`} /> }
          </div>
          {/* gillie */}
          <div className="flex items-center gap-4 mb-6">
            <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9 9 0 0 1-9-8 9 9 0 0 1 9-8z" /></svg>
            </button>
            <p className="text-gray-600 text-sm">417</p>
          </div>
          <Suspense fallback={<Spinner className='h-5 w-5'/>} key={params.uid}>
            <ProfilePostsList authorId={params.uid}/>
          </Suspense>
          
        </div>
        <div className="w-full md:w-1/3">
        <Suspense key={params.uid} fallback={<ProfileCardSkeleton/>}>
          <ProfileCard authorId={params.uid} />
        </Suspense>
        </div>
      </div>
    </div>
  );
}
