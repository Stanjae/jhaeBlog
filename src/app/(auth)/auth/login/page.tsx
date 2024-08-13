import LoginForm from '@/app/ui/auth/Login'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../../public/siteLogo.png'
import ThirdPartyProviders from '@/app/ui/auth/ThirdPartyProviders'

const Page = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
                <Link href="/">
                    <Image src={Logo} alt='logo' height={55} width={100} className="mx-auto" />
                </Link>
                
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                    <p className="">Don &apos; t have an account? 
                        <Link href="signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up</Link></p>
                </div>
            </div>
            <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
                <ThirdPartyProviders/>
                <div className="relative">
                    <span className="block w-full h-px bg-gray-300"></span>
                    <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
                </div>
                <LoginForm/>
            </div>
            
            <div className="text-center">
                <a href="/" className="hover:text-indigo-600">Forgot password?</a>
            </div>
        </div>
    </main>
   
  )
}

export default Page
