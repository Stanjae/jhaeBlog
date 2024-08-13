'use client'
import { createPost } from '@/app/lib/actions';
import {Input, Button, ThemeProvider, Select, Option, CheckboxList} from '../customComponents/CustomComponents';
import FroalaRichText from './FroalaRichText';
import { useForm } from 'react-hook-form';
import { useState} from 'react';
import UploadCareFile from './FileUploadCare';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormSchema } from '@/app/lib/zod';
import {CreatePostType} from '@/app/lib/definitions'
import DismissableAlert from '../alerts/DismissableAlert';
import { removeHTMLTags, sluggifyText } from '@/app/hooks/sluggify';
import { useRouter } from 'next/navigation' 




const CreateForm = ({data}:any) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePostType>({
    resolver: zodResolver(createFormSchema),
    defaultValues:{title:'', slug:''}
  });

  const [category, setCategory] = useState<string>("");
  const [postType, setPostType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([])
  const [files, setFiles] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

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

    let contento = sessionStorage.getItem("editor")
    let metaData = removeHTMLTags(contento)

    //check other fields validation
    if(!status) return 
    setLoading(true)

    const newSlug = sluggifyText(data.slug)
    const smartFile = files + '-/quality/best/-/format/webp/'

    const validatedData = {...data, slug:newSlug, content: contento, category: category, metaData: metaData,
      postType: postType, featuredImageUrl:smartFile, tags:tags.length === 0 ? JSON.stringify(["uncategorized"]) : JSON.stringify(tags)}

     const dataResponse = await createPost(validatedData);
      setPostResponse(dataResponse)
      setLoading(false)
      if(dataResponse?.status === 'success'){
        sessionStorage.setItem("editor", "")
        router.push('/auth/dashboard/posts', { scroll: false });
      }
  }


  return (
    <ThemeProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        {postResponse?.isTrue && <DismissableAlert setResponse={setPostResponse} status={postResponse} />}
        <div className=" gap-5 grid grid-cols-12">
          <div className=" flex justify-end col-span-12">
            <Button type='submit' variant="gradient" className=" bg-bgdark">
              {loading ? "Publishing..." : "Publish"}
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
              <Select size='md' value={category} onChange={(e: any) => setCategory(e)} variant="standard" placeholder='Select a category' label="Category">
                {data?.map((item: any) => <Option key={item.id} value={item?.id}>{item?.title}</Option>)}
              </Select>
              {categoryError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{categoryError}</p>}
            </div>

            <div className=" col-span-2">
              <Select value={postType} onChange={(e: any) => setPostType(e)} variant="standard" placeholder='Select a Post Type' label="Type of Post">
                <Option value='featured post'>Featured Post</Option>
                <Option value='standard post'>Standard Post</Option>
              </Select>
              {postTypeError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{postTypeError}</p>}
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-center items-center md:col-span-4">
            <UploadCareFile setFiles={setFiles} />
            {fileError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{fileError}</p>}
          </div>
          <div className="col-span-12">
          <CheckboxList setTags={setTags}/>
          </div>
          <div className="col-span-12">
          {contentError && <p className="text-red-400 text-sm ml-1 mt-1" role="alert">{contentError}</p>}
           <FroalaRichText />
          </div>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default CreateForm
