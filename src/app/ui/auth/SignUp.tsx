'use client'
import { registerUser } from "@/app/lib/userActions"
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import React, { useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { clientRegisterSchema } from "@/app/lib/zod";
import { FormData } from "@/app/lib/definitions";
import { useFormStatus } from 'react-dom';
import CustomAlert from "../alerts/CustomAlert";
import { useRouter } from "next/navigation";


function SubmitBtn() {
    const { pending } = useFormStatus();
    return (
      <button disabled={pending} type='submit' className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
      {pending ? "Submitting..." : "Sign up" }
    </button>
    );
  }


const SignupForm = () => {

    const [state, setState] = useState({message:'', status:'', isTrue:false})

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(clientRegisterSchema),
        defaultValues:{ username: "", email: "", password: "" }
    });
    
    const [showpw, setShowpw] = useState<Boolean>(true)

    const router = useRouter()

  const onSubmit = async(data:FormData) => {
    //action(data);
    setState({message:'', status:'', isTrue:false})
    const {isTrue, status, message} = await registerUser(data);
    setState({message, status, isTrue})
    if(status === 'danger'){
      return 
    }
    setTimeout(() => router.push('/auth/login'), 2000)
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
       {state.isTrue && <CustomAlert status={state} />}
      <div>
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <input
          {...register("username")}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
        {errors?.username?.message && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
        {errors?.email?.message && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{errors.email.message}</p>}
      </div>
      <div >
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="relative">
            <input type={showpw ? "password" : "text"}
            {...register("password")}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            <button type="button" onClick={() => setShowpw(!showpw)} className=" absolute right-2 top-[40%]">
            {showpw ? (
                <EyeIcon className="w-5 h-5" />
            ) : (
                <EyeSlashIcon className="w-5 h-5" />
            )}
            </button>
        </div>
        {errors?.password?.message && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{errors.password.message}</p>}
      </div>
      <SubmitBtn/>
    </form>
  );
}

export default SignupForm


