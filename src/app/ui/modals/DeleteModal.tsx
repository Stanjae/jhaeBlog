'use client'
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "../customComponents/CustomComponents";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams} from "next/navigation";

 
export function DeleteModal({newParams, deleteFunction}:{newParams:string, deleteFunction:any}) {
  const router = useRouter()
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString()).get(newParams)
  const splitArr = params?.split('@');

  const id = splitArr?.at(1);

  const deleteInvoiceWithId = async()=>{
    await deleteFunction(id);
  }

  const handleOpen = () => "nothing";

 
  return (
    <>
      <Dialog
        open={true}
        className=" py-5"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div><TrashIcon className=" h-12 w-12 text-red-700 mx-auto"/></div>
        <DialogHeader className=' justify-center mx-auto '>Are you sure you want to delete this Item?</DialogHeader>
        <DialogBody className="justify-center text-center">
          {splitArr?.at(0)}
        </DialogBody>
        <DialogFooter className=" justify-center">
          <Button
            variant="text"
            color="red"
            onClick={router.back}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

            <Button onClick={deleteInvoiceWithId} variant="gradient" color="green">
              <span>Confirm</span>
            </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}