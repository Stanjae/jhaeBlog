"use server"
import { sql } from '@vercel/postgres';
import { HomePagePosts } from './definitions';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';



//for homepage
export const homeRecentPosts =async()=>{
   const data =  await sql`
    SELECT posts.id as postId, posts.title, posts.slug, posts.image_url,
    posts.created_at, posts.updated_at, posts.user_id, users.name as author, category.title as category, 
    category.id as category_id, posts.tags, posts.type, posts.metadata, profiles.profile_image_url
    FROM posts
    JOIN category ON category.id = posts.category_id
    JOIN users ON users.userId = posts.user_id
    JOIN profiles ON profiles.user_id = posts.user_id
    ORDER BY posts.created_at DESC
    LIMIT 10`;
    revalidatePath('');
    return data.rows
}

export const getHomeFeaturedPosts =async()=>{
    const featured = 'featured post'
   const data =  await sql`
        SELECT * FROM posts
        WHERE type = ${featured}
        ORDER BY posts.created_at DESC
        LIMIT 5`;
    revalidatePath('');
    return data.rows
}

const ITEMS_PER_PAGE = 10
//all posts
export const getAllPosts =async(query: string, currentPage: number)=>{
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const post = await sql`SELECT posts.id as postId, posts.title, posts.slug, posts.content, posts.image_url,
    posts.created_at, posts.updated_at, posts.user_id, users.name as author, category.title as category, 
    category.id as category_id, posts.tags, posts.type, posts.metadata, profiles.profile_image_url
    FROM posts 
    JOIN category ON category.id = posts.category_id
    JOIN users ON users.userId = posts.user_id
    JOIN profiles ON profiles.user_id = posts.user_id
    WHERE posts.title ILIKE ${`%${query}%`} OR category.title ILIKE ${`%${query}%`}
    ORDER BY posts.created_at DESC
    `;

      if(!post) return null 
      return post.rows;
  
}

// for details page WHERE posts.slug=${slug}
export const detailedPageRecentPost = async(slug:any)=>{
    const posts = await sql`SELECT * FROM posts
    WHERE NOT slug = ${slug}
    ORDER BY created_at DESC
    `;
    if(!posts) return null 
    revalidatePath(`/detail/${slug}`);
    return posts.rows;
}

// AND posts.tags ILIKE ${`%${postTags}%`} 
export const getYouMayAlsoLike =async( postSlug:string | null)=>{
    const post = await sql`SELECT posts.id as postId, posts.title, posts.slug, posts.metadata, posts.image_url,
    posts.created_at, posts.user_id, users.name as author, category.title as category, 
    category.id as category_id, posts.tags, posts.type
    FROM posts 
    JOIN category ON category.id = posts.category_id
    JOIN users ON users.userId = posts.user_id
    WHERE NOT posts.slug = ${postSlug}`;

      if(!post) return null 
      return post.rows;
  
}

export const getDetailedPostBySlug = async(slug:string)=>{
    const post = await sql`SELECT posts.id as postId, posts.title, posts.slug, posts.content, posts.image_url,
    posts.created_at, posts.updated_at, posts.user_id as authorid, users.name as author, category.title as category, 
    category.id as category_id, posts.tags, posts.type, profiles.profile_image_url
    FROM posts 
    JOIN category ON category.id = posts.category_id
    JOIN users ON users.userId = posts.user_id
    JOIN profiles ON profiles.user_id = posts.user_id
    WHERE posts.slug = ${slug}`;

      if(!post) return null 
      return post.rows[0];
  
}

export const getPostById = async(slug:string)=>{
    const post = await sql`SELECT * FROM posts WHERE id=${slug}`;
      if(!post) return null 
      return post.rows[0];
  }

export const getAllCategories =async()=>{
        const data =  await sql`
             SELECT * FROM category
             ORDER BY category.created_at DESC
             `;
         return data.rows
     }


export const getAllUserPosts =async( query: string, currentPage: number)=>{
    const session = await auth()
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const data =  await sql`
             SELECT posts.id as postId, posts.content, posts.title, posts.slug, posts.image_url, posts.tags, 
             posts.user_id, posts.category_id, posts.metadata, posts.type, posts.created_at, category.title as category, category.id
             FROM posts
             JOIN category ON category.id = posts.category_id
             WHERE posts.user_id = ${session?.user?.userid} AND posts.title ILIKE ${`%${query}%`}
             ORDER BY posts.created_at DESC
             LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
             `;
         return data.rows
}

export const getAllUserPostsPages =async( query: string)=>{
    const session = await auth()
    try{
        const count =  await sql` SELECT COUNT(*)
             FROM posts
             JOIN category ON category.id = posts.category_id
             WHERE posts.user_id = ${session?.user?.userid} AND posts.title ILIKE ${`%${query}%`}
             `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
         
}

//get like post
export const getLikePostByPostId =async(postId:string | undefined, userId:string | undefined)=>{
    const likePost = await sql`SELECT * FROM likes WHERE post_id=${postId} AND user_id=${userId}`;
      if(likePost.rowCount === 0) return false
      return true;
  }

  //get all likes by post
  export const getAllLikesByPostId =async(postId:string | undefined)=>{
    const likes = await sql`SELECT COUNT(*) FROM likes WHERE post_id=${postId}`;
      if(!likes) return null
      const numberOflikes = Number(likes.rows[0].count ?? '0');
      return numberOflikes;
  }

  /* for profiles */
  /* for profile card */
  export const getProfileCardByAuthorId = async (userId: string | undefined) => {
    const profile = sql`SELECT profiles.first_name, profiles.last_name, profiles.bio, profiles.profile_image_url
    FROM profiles
    WHERE profiles.user_id = ${userId}`;

    const followersCount = sql`SELECT COUNT(*) FROM followers WHERE author_id=${userId}`;

    const followersArray = sql`SELECT followers.author_id, followers.follower_id, profiles.user_id, 
    profiles.profile_image_url, users.name
    FROM followers
    JOIN profiles ON profiles.user_id = followers.follower_id
    JOIN users ON users.userid = followers.follower_id
    WHERE followers.author_id = ${userId}`;

    const [singleProfile, totalFollowers, followers] = await Promise.all([profile, followersCount, followersArray]);

    /* if (profile.rowCount === 0) {
      throw new Error('User not found');
    } */
    return ({singleProfile, totalFollowers, followers});
  }

  export const getAllAuthorPostsById = async (authorId: string | undefined) => {
      const posts = await sql`SELECT posts.id, posts.title, posts.metadata, posts.slug, posts.type,
       posts.updated_at, posts.image_url, profiles.first_name, profiles.last_name, profiles.profile_image_url
       FROM posts
       JOIN profiles ON profiles.user_id = posts.user_id
       WHERE posts.user_id = ${authorId}
       `
       return posts.rows
  }

  export const getAllAuthorPostsCount = async (authorId: string | undefined) => {
    const posts = await sql`SELECT COUNT(*)
    FROM posts
    WHERE posts.user_id = ${authorId}
    `
    return posts.rows[0].count
  }

  export const getAuthorTotalPostsLIkesCount = async (authorId: string | undefined) => {
    const likes = await sql`SELECT COUNT(*)
    FROM likes
    WHERE author_id = ${authorId}
    `
    return likes.rows[0].count
  }



  //for dashboard data fetching cards
  export const getDashboardCardsInfo =async(authorId:string | undefined)=>{
    const authorPostsCount =  sql`SELECT COUNT(*) FROM posts WHERE posts.user_id = ${authorId}
    `
    const likes = await sql`SELECT COUNT(*) FROM likes WHERE author_id = ${authorId}`

    const followersCount = sql`SELECT COUNT(*) FROM followers WHERE author_id=${authorId}`;

    const [postsCount, likesCount, followers] = await Promise.all([authorPostsCount, likes, followersCount]);

    return ({postsCount, likesCount, followers})
  }

  //recharts

  export const getAuthorPostsByDate =async(date:any)=>{
    const session = await auth()
    const authorPostsCount =  await sql`SELECT COUNT(*) FROM posts 
    WHERE posts.user_id = ${session?.user.userid} AND TO_CHAR(posts.created_at, 'YYYY-MM-DD') = ${date} `
    return authorPostsCount.rows[0].count
  }

  export const getRechartsQuery = async (redd:any) => {
    const reddy = JSON.parse(redd)
    const justin = await Promise.all(reddy.map(async(item:any)=>{
      const pirate = await getAuthorPostsByDate(item.date)
      return {...item, "uv":pirate}
    }))
    const siri = justin.sort(function(a, b){return a.name - b.name}).reverse()
    return siri
  }