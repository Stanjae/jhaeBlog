import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { Alert } from '../customComponents/CustomComponents'
import React, {useState} from 'react'
import { SignUpFormState } from '@/app/lib/definitions';

const FixedAlert = ({status}:{status:SignUpFormState}) => {
    const [open, setOpen] = useState(status?.isTrue);
  return (
    <Alert open={open} onClose={()=>setOpen(false)}
      icon={status.status === 'success' ? <CheckCircleIcon className='h-5 w-5'/> : <ExclamationCircleIcon className='h-5 w-5' /> }
      className={` ${status.status === 'success' ? 'bg-green-100 text-green-700 border-l-green-700' :
         'bg-red-100 text-red-700 border-l-red-700' } 
      rounded-none border-l-4 fixed w-[500px] right-5 font-medium `}
    >
      {status.message}
    </Alert>
  )
}

export default FixedAlert
