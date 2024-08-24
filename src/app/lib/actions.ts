'use server'
import { sql } from '@vercel/postgres';
import { CategoryPropsObject, SignUpFormState, CompletePostType, EditCompletePostType} from "./definitions"
import { categorySchemaUpdated, CompletePostSchema, EditCompletePostSchema } from "./zod";
import { db } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getProfileById } from './userActions';



export const dummyFunction =async()=>{
  const session = await auth()
}



const client = await db.connect();


export const getPostBySlug = async(slug:string)=>{
  const post = await sql`SELECT * FROM posts WHERE slug=${slug}`;
    if(!post) return null 
    return post.rows[0];
}

export const getLikePostById =async(postId:string | undefined, userId:string | undefined)=>{
  const likePost = await sql`SELECT * FROM likes WHERE post_id=${postId} AND user_id=${userId}`;
    if(!likePost) return null 
    return likePost.rows[0];
}


export async function deletePost(id: string | undefined) {
  await sql`DELETE FROM posts WHERE id = ${id}`;
  revalidatePath('/auth/dashboard/posts');
  redirect('/auth/dashboard/posts')
}

export const createPost = async(formData:CompletePostType)=> {
  const session = await auth()

  const singleProfile = await getProfileById(session?.user?.userid);
  if(!singleProfile?.profile_image_url){
    return {message: "Update your Profile picture before creating posts", status:'danger', isTrue:true}
  }
  const validatedData = CompletePostSchema.safeParse(formData);
    if (!validatedData.success) {
      return {message: "Invalid Data", status:'danger', isTrue:true}
    }
    const {title, tags, content, category, slug, featuredImageUrl, postType, metaData} = validatedData.data

    //check if post doesn't exist
    const isPost = await getPostBySlug(slug)
    if (isPost) return {message:"Post slug exists", status:'danger', isTrue:true}

    //check if user is authenticated
   if(!session) return {message:"User not authenticated", status:'danger', isTrue:true}

   const userId = session.user.userid
  
  try {
    await client.sql`
    INSERT INTO posts (title, slug, content, category_id, tags, image_url, type, user_id, metadata)
    VALUES (${title}, ${slug}, ${content}, ${category}, ${tags}, ${featuredImageUrl}, ${postType}, ${userId}, ${metaData})
    `
    
  } catch (error) {
    console.log("error:",error)
      return {message: `${error}`, status:'danger', isTrue:true};
  }  

  revalidatePath('/auth/dashboard/posts')
  revalidatePath('/posts')
  revalidatePath('/')
  return {message: `post created Sucessfully`, status:'success', isTrue:true} 
}


export const updatePost = async(formData:EditCompletePostType)=> {
  const session = await auth()
  const validatedData = EditCompletePostSchema.safeParse(formData);
    if (!validatedData.success) {
      return {message: "Invalid Data", status:'danger', isTrue:true}
    }
    const {title, tags, postid, content, authorId, category, slug, featuredImageUrl, postType, metaData} = validatedData.data

    //check if post does exist
    const isPost = await getPostBySlug(slug)
    if (isPost) return {message:"Post slug exists", status:'danger', isTrue:true}

    //check if user is authenticated
   if(!session) return {message:"User not authenticated", status:'danger', isTrue:true}

   const userId = session.user.userid

   if(userId !== authorId) return {message:"User not authorized", status:'danger', isTrue:true}
  
  try {
    await client.sql`
    UPDATE posts SET
    title = ${title}, slug=${slug}, content=${content}, category_id=${category}, tags=${tags}, 
    image_url=${featuredImageUrl}, type=${postType}, user_id=${userId}, metadata=${metaData}
    WHERE id = ${postid}
    `
    
  } catch (error) {
    console.log("error:",error)
      return {message: `${error}`, status:'danger', isTrue:true};
  }  

  revalidatePath('/auth/dashboard/posts')
  revalidatePath('/posts')
  revalidatePath('/')
  return {message: `post updated Sucessfully`, status:'success', isTrue:true} 
}


export const getCategory = async(slug:string)=>{
  const category = await sql`SELECT * FROM category WHERE slug=${slug}`;
    if(!category) return null
    
    return category.rows[0];
}


export const createCategory = async(formData:CategoryPropsObject)=> {
  const validatedData = categorySchemaUpdated.safeParse(formData);
    if (!validatedData.success) {
      return {message: "Category is too short", status:'danger', isTrue:true}
    }
    const {category, slug} = validatedData.data
    const isCategory = await getCategory(slug)
    if(isCategory) return {message:"category already exists", status:'danger', isTrue:true}
   
  //check if category exists
  try {
    await client.sql`
    INSERT INTO category (title, slug)
    VALUES (${category}, ${slug})
    `
    revalidatePath('/auth/dashboard/categories')
    revalidatePath('/auth/dashboard/create-post')
    return {message: `${category} created Sucessfully`, status:'success', isTrue:true} 
  } catch (error) {
    console.log("error:",error)
      return {message: 'Something went wrong.', status:'danger', isTrue:true};
  }  
}


export const updateCategory =async(prevState:any, formData:any)=>{
  const validatedData = categorySchemaUpdated.safeParse({category:formData.get('title'), slug:formData.get('slug')});
    if (!validatedData.success) {
      return {message: "Category is too short", status:'danger', isTrue:true}
    }
    const {category, slug} = validatedData.data

    const isCategory = await getCategory(slug)
    if(isCategory) return {message:"category already exists", status:'danger', isTrue:true}
    
    const sluggify =  slug?.toLowerCase().replace(/ /g, '-');
    try{
      await client.sql`
      UPDATE category
      SET title = ${category}, slug = ${sluggify}
      WHERE id = ${formData.get('id')}
      `
    }catch(error){
      return {message: 'Something went wrong.', status:'danger', isTrue:true};
    }
    revalidatePath('/auth/dashboard/categories');
    setTimeout(()=> {redirect('/auth/dashboard/categories')}, 1000);
}


export async function deleteCategory(id: string | undefined) {
  await sql`DELETE FROM category WHERE id = ${id}`;
  revalidatePath('/auth/dashboard/categories');
  redirect('/auth/dashboard/categories')
}
// Adjust the import according to your project structure

export async function likePost(userId: string | undefined, postId: string | undefined, slug:string | undefined, authorid:string | undefined) {
    try {
        // Check if the user has already liked the post
        const existingLike = await getLikePostById(postId, userId);

        if (existingLike) {
            // If the like exists, remove it (unlike)
            await sql`DELETE FROM likes WHERE id = ${existingLike.id}`;
            revalidatePath(`/detail/${slug}`);
            return { status: 'unliked' };
        } else {
            // Otherwise, create a new like
            await client.sql`
            INSERT INTO likes (post_id, user_id, author_id)
            VALUES (${postId}, ${userId}, ${authorid})
            `
            revalidatePath(`/detail/${slug}`);
            return { status: 'liked' };
        }
    } catch (error) {
        console.error('Error liking/unliking post:', error);
    }
   
}

export const getFollowById = async (userId: string | undefined, authorId: string | undefined) => {
  const existingFollow = await sql`
    SELECT * FROM followers
    WHERE follower_id = ${userId} AND author_id = ${authorId}
  `;
  return existingFollow.rows[0];
}

export const followUser = async (userId: string | undefined, authorId: string | undefined) => {
  console.log('operation:', userId, authorId)
  try{
    const existingFollow = await getFollowById(userId, authorId);
    console.log('dung: ', existingFollow)

   if(existingFollow){
      await sql`DELETE FROM followers WHERE author_id = ${authorId}`;
      revalidatePath(`/profiles/${authorId}`);
      return {status: 'unfollowed'};
    }else{
      await sql`
      INSERT INTO followers (follower_id, author_id)
      VALUES (${userId}, ${authorId})
      `
      revalidatePath(`/profiles/${authorId}`);
      return {status: 'followed'};
    }
  }catch(error){
    console.log(error)
  }
  
}
