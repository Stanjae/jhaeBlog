'use client'
import React, { useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter,Input} from "../customComponents/CustomComponents";
import { ArrowPathIcon} from "@heroicons/react/24/solid";
import { useRouter, useSearchParams} from "next/navigation";
import { useFormState } from "react-dom";
import { updateCategory } from "@/app/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryPropsObject } from "@/app/lib/definitions";
import { useForm } from "react-hook-form";
import CustomAlert from "../alerts/CustomAlert";
 

const initialState = {status:'', isTrue:false, message:''}
export function UpdateCategoryModal({newParams}:{newParams:string}) {

  const [state, formAction] = useFormState(updateCategory, initialState)

  const router = useRouter()
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString()).get(newParams)
  const splitArr = params?.split('@');

  

  /* useEffect(()=>{
    if(state?.status == 'success'){
      setTimeout(()=>{ router.back}, 1000)
    }
  },[state]) */

  const handleOpen = ()=>{}

 
  return (
    <>
      <Dialog
        open={true}
        size="xs"
        className=" py-4 px-3"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex items-center justify-between">
            <DialogHeader className=' text-lg'>Category Update</DialogHeader>
            <ArrowPathIcon className=" h-8 w-8 text-primary"/>
        </div>
        <form action={formAction}>
            <DialogBody className="justify-center space-y-4">
            <input type="hidden" name="id" defaultValue={splitArr?.at(2)} />
            <Input
              size="md" 
              className=' text-lg font-medium'
              name="title"
              defaultValue={splitArr?.at(0)}
              variant="standard" label="Title"
              placeholder="Add a title"
              crossOrigin={undefined}
            />

            <Input
              size="md"
              defaultValue={splitArr?.at(1)} 
              className=' text-lg font-medium'
              variant="standard" label="Slug"
              name="slug"
              placeholder="Add a slug"
              crossOrigin={undefined}
            />
            </DialogBody>
            {state?.isTrue && <CustomAlert status={state}/>}
            <DialogFooter className=" justify-end">
            <Button
                variant="text"
                color="red"
                type="button"
                onClick={router.back}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient">
                <span>Update</span>
            </Button>
            </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}