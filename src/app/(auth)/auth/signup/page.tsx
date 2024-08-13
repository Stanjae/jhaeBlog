import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../../public/siteLogo.png'
import SignupForm from '@/app/ui/auth/SignUp';
import ThirdPartyProviders from '@/app/ui/auth/ThirdPartyProviders';


const Page = async() => {
  return (
    <main className="w-full  flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
            <div className="text-center">
                <Image src={Logo} alt='logo' height={55} width={100} className="mx-auto" />
                <div className="mt-3 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign Up to your account</h3>
                    <p className="">Do you have an account? 
                        <Link href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login</Link></p>
                </div>
            </div>
            <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
                <ThirdPartyProviders/>
                <div className="relative">
                    <span className="block w-full h-px bg-gray-300"></span>
                    <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
                </div>

                {/* signup form */}
                <SignupForm/>

                {/* end signup form */}
        </div>
        </div>
    </main>
   
  )
}

export default Page
