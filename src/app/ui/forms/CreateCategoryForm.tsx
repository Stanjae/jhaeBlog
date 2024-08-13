'use client'
import React, { useState } from 'react'
import { createCategory } from '@/app/lib/actions';
import { useForm } from 'react-hook-form';
import {Input, Button} from '../customComponents/CustomComponents'
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from '@/app/lib/zod';
import { CategoryProps, SignUpFormState } from '@/app/lib/definitions';
import DismissableAlert from '../alerts/DismissableAlert';



const CreateCategoryForm = () => {

    const [responsei, setResponsei] = useState<SignUpFormState | any>({message:'', status:'', isTrue:false})

    const { register, handleSubmit, formState: { errors } } = useForm<CategoryProps>({
        resolver: zodResolver(categorySchema),
        defaultValues:{category: "" }
    });
    
    const sluggify = (text: string | null | undefined) => text?.toLowerCase().replace(/ /g, '-');


  const onSubmit = async (data:CategoryProps) => {
    const newSlug = sluggify(data.category)
    const categoryData = {...data, slug:newSlug};
    const response = await createCategory(categoryData)
    setResponsei(response);
    console.log(responsei)
  }

  return (
    <div>
      <form className="flex items-stretch space-x-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full md:w-72">
              <Input
                label="Category"
                {...register("category")}
                type="text"
                placeholder="Add a new category"
                crossOrigin={undefined}
              />
            </div>
            
            <Button type='submit' className="flex items-center gap-3" size="sm">
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Search
            </Button>
        </form>
        {errors?.category?.message && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{errors.category.message}</p>}
        <DismissableAlert setResponse={setResponsei} status={responsei}/>
    </div>
  )
}

export default CreateCategoryForm
