import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
})


export const clientRegisterSchema = object({
    username: string({ required_error: "Username is required" })
    .min(1, "Username is required"),
    email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
    password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
  })

  export const createFormSchema = object({
    title: string({ required_error: "post title is required" })
    .min(4, "post title is short"),
    slug: string({ required_error: "post slug is required" })
    .min(4, "post slug is short")
  })

  export const CompletePostSchema = object({
    title: string({ required_error: "post title is required" })
    .min(4, "post title is short"),
    slug:string({ required_error: "post slug is required" })
    .min(4, "post slug is short"),
    content: string({ required_error: "post content is required" })
    .min(4, "post content is short"),
    featuredImageUrl:string({ required_error: "post featured image is required" })
    .min(4, "post featured image is short"),
    category:string({ required_error: "post category is required" })
    .min(4, "post category is short"),
    postType:string({ required_error: "post type is required" })
    .min(4, "post type is short"),
    tags:string(),
    metaData:string()
  })

  export const EditCompletePostSchema = object({
    title: string({ required_error: "post title is required" })
    .min(4, "post title is short"),
    slug:string({ required_error: "post slug is required" })
    .min(4, "post slug is short"),
    content: string({ required_error: "post content is required" })
    .min(4, "post content is short"),
    featuredImageUrl:string({ required_error: "post featured image is required" })
    .min(4, "post featured image is short"),
    category:string({ required_error: "post category is required" }),
    postType:string({ required_error: "post type is required" }),
    tags:string(),
    postid:string(),
    authorId:string(),
    metaData:string()
  })

  export const categorySchema = object({
    category: string({ required_error: "category title is required" })
    .min(4, "category title is short"),

  })

  export const categorySchemaUpdated = object({
    category: string({ required_error: "category title is required" })
    .min(4, "category title is short"),
    slug: string().min(4, "category slug is short")

  })

