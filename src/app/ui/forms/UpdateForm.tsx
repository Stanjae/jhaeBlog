'use client'
import { updatePost} from '@/app/lib/actions';
import {Input, Button, ThemeProvider, Select, Option, CheckboxListEdited} from '../customComponents/CustomComponents';
import FroalaRichTextEdited from './FroalaRichTextEdited';
import { useForm } from 'react-hook-form';
import { useEffect, useState} from 'react';
import UploadCareFile from './FileUploadCare';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormSchema } from '@/app/lib/zod';
import {CreatePostType} from '@/app/lib/definitions'
import DismissableAlert from '../alerts/DismissableAlert';
import { removeHTMLTags, sluggifyText } from '@/app/hooks/sluggify';
import { useRouter } from 'next/navigation' 




const UpdateForm = ({categories, fetchedData }:any) => {
    const {image_url, slug, title, tags, type, id, user_id, category_id, content} = fetchedData

    const defaultCategory = categories.find((category:any) => category.id === category_id)

    const parsedTags = JSON.parse(tags)

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<CreatePostType>({
    resolver: zodResolver(createFormSchema),
    defaultValues:{title:'', slug:''}
  });


  const [category, setCategory] = useState<any>(defaultCategory.title);
  const [postType, setPostType] = useState<string>(type);
  const [tagso, setTags] = useState<string[]>(parsedTags)
  const [files, setFiles] = useState<string>();
  const [formStatus, setFormStatus] = useState<Boolean>(false)

  /* throw error states */
  const [categoryError, setCategoryError] = useState<string | null>()
  const [postTypeError, setPostTypeError] = useState<string | null>()
  const [fileError, setFileError] = useState<string | null>()
  const [contentError, setContentError] = useState<any | null>()

  const [postResponse, setPostResponse] = useState<any | null>({message:'', status:'', isTrue:false})

  
  const validateOtherFields = () => {
    setCategoryError(null)
    setPostTypeError(null)
    setContentError(null)
    setFileError(null)
    let content: string | null = sessionStorage.getItem("editor")
    if(!category){
      setCategoryError("Please select a category")
      return null
    }
    if(!postType){
      setPostTypeError("Please select a post type")
      return null
    }
    if(!files){
      setFileError("Please select a featured Image")
      return null

    }
    if(content){
      if(content.length < 50){
        setContentError("Please write some more content")
        return null
      }   
    }
    return true
  }

  const router = useRouter()


  const onSubmit = async(data: CreatePostType) => {
    const status = validateOtherFields();
    setFormStatus(true)
    let contento = sessionStorage.getItem("editor")
    let metaData = removeHTMLTags(contento)

    //check other fields validation
    if(!status) return 

    const newSlug = sluggifyText(data.slug)

    const getCategory_id = categories.find((categoy:any) => categoy.title === category)

    const validatedData = {...data, authorId:user_id, postid:id, slug:newSlug, content: contento, category: getCategory_id.id, metaData: metaData,
      postType: postType, featuredImageUrl:files, tags:tagso.length === 0 ? JSON.stringify(["uncategorized"]) : JSON.stringify(tagso)}

    const dataResponse = await updatePost(validatedData);
      setPostResponse(dataResponse)
      if(dataResponse?.status === 'success'){
        sessionStorage.setItem("editor", "")
        router.push('/auth/dashboard/posts', { scroll: false });
      }
     setFormStatus(false);
  }

  useEffect(() => {
      setValue('title', title)
      setValue('slug', slug)
      setFiles(image_url)
  }, [])


  return (
    <ThemeProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postResponse?.isTrue && <DismissableAlert setResponse={setPostResponse} status={postResponse} />}
        <div className=" gap-5 grid grid-cols-12">
          <div className=" flex justify-end col-span-12">
            <Button type='submit' variant="gradient" className=" bg-bgdark">
             { formStatus ? 'Updating...' : 'Update'}
            </Button>
          </div>
          <div className=" col-span-12">
            <Input {...register("title")}
              size="lg" 
              className=' text-6xl font-bold'
              variant="standard" label="Title"
              placeholder="Add a title"
              crossOrigin={undefined}
            />
            {errors?.title?.message && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{errors.title?.message}</p>}
          </div>
          <div className=" grid grid-cols-4 gap-x-10 gap-y-5 col-span-8">
            <div className=" col-span-4">
              <Input
                size="md"
                {...register("slug")}
                variant="standard"
                label="Slug"
                placeholder="slug"
                crossOrigin={undefined}
              />
              {errors?.slug?.message && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{errors.slug?.message}</p>}
            </div>
            {/* category */}
            <div className=" col-span-2">
              <Select size='md' selected={()=> category} value={category} onChange={(e: any) => setCategory(e)} variant="static" placeholder='Select a category' label="Category">
                {categories?.map((item: any) => <Option key={item.id} value={item?.title}>{item?.title}</Option>)}
              </Select>
              {categoryError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{categoryError}</p>}
            </div>

            <div className=" col-span-2">
              <Select selected={()=> postType} value={postType} onChange={(e: any) => setPostType(e)} variant="static" placeholder='Select a Post Type' label="Type of Post">
                <Option value='featured post'>Featured Post</Option>
                <Option value='standard post'>Standard Post</Option>
              </Select>
              {postTypeError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{postTypeError}</p>}
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-center items-center md:col-span-4">
            <UploadCareFile setFiles={setFiles} />
            <p className='text-sm text-pretty my-2 text-center text-gray-500'>{files}</p>
            {fileError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{fileError}</p>}
          </div>
          <div className="col-span-12">
            <CheckboxListEdited tagss={tagso} setTags={setTags}/>
          </div>
          <div className="col-span-12">
          {contentError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{contentError}</p>}
           <FroalaRichTextEdited content={content}/>
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default UpdateForm
