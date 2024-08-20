'use client'
import React, { useEffect, useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { createProfile } from '@/app/lib/userActions'
import { CountrySelect } from './CountrySelect'
import { Button } from '../customComponents/CustomComponents'
import { useFormState, useFormStatus } from 'react-dom'
import { AuthorProfile} from './ProfileFilesUpload'
import Image from 'next/image'
import FixedAlert from '../alerts/FixedAlert'
import { CoverProfile } from './CoverProfile'
import Link from 'next/link'


function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' variant="gradient" className=" bg-bgdark z-50">
    {pending ? "Updating..." : "Update" }
    </Button>
  );
}

const ProfileSettingsForm = ({session, profile}:any) => {

  const [state, action] = useFormState(createProfile, {message:'', status:'', isTrue:false})
 
  const newDate = new Date(profile?.date_of_birth)?.toISOString()?.split('T')[0]; //format date to yyyy-mm-dd

  const defaultDate = new Date().toISOString().split('T')[0]; //format date to yyyy-mm-dd

  const [country, setCountry] = useState<string>('')
  const [authorFile, setAuthorFile] = useState<string>('')
  const [coverPics, setCoverPics] = useState<string>('')

  useEffect(()=>{
    setCountry(profile.country)
    setAuthorFile(profile.profile_image_url)
    setCoverPics(profile.cover_image_url)
  }, [])

    const handleSubmit = (e:any) => {
      const paris = Object.fromEntries(e.entries());
      const validatedData = {firstname:paris.firstname, lastname:paris.lastname, country:country, author:authorFile,
        cover:coverPics, zipcode:paris.zipcode, city:paris.city, address:paris.address, bio:paris.bio, gender:paris.gender,
        userid:session.userid, dob:paris.date_of_birth}

      action(validatedData)
    }
  return (
    <div>
      <form action={action} method="POST">
      <div className="space-y-12">
       {state?.isTrue && <FixedAlert status={state}/>}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          <div>
            <input type='text' name='userid' defaultValue={session?.userid || ''} hidden/>
            <input type='text' name='author' value={authorFile || ''} hidden/>
            <input type='text' name='cover' value={coverPics  || ''} hidden/>
            <input type='text' name='country' value={country || ''} hidden/>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={session?.name || ''}
                    disabled
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={profile?.bio || ''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Author Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {authorFile ?
                <Image src={authorFile} width={100} height={100} alt={'author'} className="h-12 w-12 rounded-full" />
                :
                <UserCircleIcon className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-50" />}
                <AuthorProfile setFiles={setAuthorFile}/>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 gap-x-2 items-center justify-center flex text-sm leading-6 text-gray-600">
                      <CoverProfile setFiles={setCoverPics}/>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="pl-1 my-1 font-bold">{coverPics}</p>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 1MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* first name */}
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  defaultValue={profile?.first_name || ''}
                  className="block  px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* last name */}
            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  defaultValue={profile?.last_name || ''}
                  autoComplete="family-name"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  disabled
                  type="email"
                  defaultValue={session?.email}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* gender */}
            <div className="sm:col-span-2">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  defaultValue={profile?.gender || 'select'}
                  className="block w-full pl-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={'male'}>Male</option>
                  <option value={'female'}>Female</option>
                </select>
              </div>
            </div>


            <div className="sm:col-span-2">
              <label htmlFor="date_of_birth" className="block text-sm font-medium leading-6 text-gray-900">
              Date of Birth
              </label>
              <div className="mt-2">
                <input defaultValue={newDate || ''}  name="date_of_birth" type='date'
                className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Country
              </label>
              <div className="mt-2">
               <CountrySelect country={country} setCountry={setCountry}/>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  defaultValue={profile?.city || ''}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-4">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="street-address"
                  autoComplete="street-address"
                  defaultValue={profile?.address || ''}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zipcode"
                  id="postal-code"
                  defaultValue={profile?.zip_code || ''}
                  autoComplete="postal-code"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We &apos; ll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {profile?.id && <Link href={``} className="text-sm font-semibold leading-6 text-primary">
          View Profile
        </Link>}
        <SubmitBtn/>
      </div>
    </form>
    </div>
  )
}

export default ProfileSettingsForm