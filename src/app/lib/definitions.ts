export type HomePagePosts = {
    id:string;
    title:string;
    content:string;
    image_url:string;
    username:string;
    name:string;
    slug:string;
}


export type FormData = {
    email: string;
    username: string;
    password: string;
  };

  export type LoginFormData = {
    email: string;
    password: string;
  };

 export type SignUpFormState = {
    message: string;
    status:string;
    isTrue: boolean;
  }

  export type UserSession = {
    name: string;
    email: string;
    image: string | undefined;
    id: string;
    userid: string;
    role: string
  }

  export type CreatePostType ={
    title:string
    slug:string
  }

  export type CompletePostType ={
    title:string | null;
    slug:string | null | undefined;
    content: string | null;
    featuredImageUrl:string | undefined;
    category:string | null;
    postType:string | null;
    metaData:string | null;
    tags:string | null;

  }

  export type EditCompletePostType = CompletePostType & {
    postid:string | null;
    authorId:string | null;
  }

  export type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

  export type CategoryProps ={
    category:string | null;
  }

  export type CategoryPropsObject ={
    category:string | null | undefined;
    slug:string | null | undefined;
  }


  export type LikeButtonProps = {
    postId: string | undefined;
    userId: string | undefined;
    slug:string | undefined;
    countLikes: any;
    authorid:string | undefined;
    initialLiked: boolean;
}