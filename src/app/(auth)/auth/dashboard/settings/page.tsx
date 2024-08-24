import { getProfileById } from '@/app/lib/userActions';
import { ProfileProgress } from '@/app/ui/customComponents/ProfileProgress';
import ProfileSettingsForm from '@/app/ui/forms/ProfileSettingsForm'
import { auth } from '@/auth'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};


export default async function page() {
  const session = await auth()
  const user = session?.user
  const profile = await getProfileById(user?.userid) || {}

  return (
    <div>
      <ProfileProgress profile={profile} />
      <ProfileSettingsForm profile={profile} session={user}/>
    </div>
    
  )
}
