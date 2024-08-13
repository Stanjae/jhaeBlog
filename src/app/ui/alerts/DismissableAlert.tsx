'use client'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { Alert } from '../customComponents/CustomComponents'
import React from 'react'
import { SignUpFormState } from '@/app/lib/definitions';

const DismissableAlert = ({status, setResponse}:{status:SignUpFormState, setResponse:any}) => {
  return (
    <Alert open={status?.isTrue} onClose={()=>setResponse((prevData:any) => ({...prevData, isTrue: false}))}
      icon={status?.status === 'success' ? <CheckCircleIcon className='h-5 w-5'/> : <ExclamationCircleIcon className='h-5 w-5' /> }
      className={` ${status?.status === 'success' ? 'bg-green-100 text-green-700 border-l-green-700' :
         'bg-red-100 text-red-700 border-l-red-700' } 
      rounded-none border-l-4  font-medium `}>
      {status?.message}
    </Alert>
  )
}

export default DismissableAlert
