import { getYouMayAlsoLike } from "@/app/lib/data"
import SeeMoreCard from "../cards/SeeMoreCard"


const YouMayAlsoLike = async({postSlug, postTags}:{postSlug:string | null, postTags:string})=>{
    const realTags = JSON.parse(postTags || '[]') ;
    const posts = await getYouMayAlsoLike(postSlug)
    const filteredPosts = posts?.filter(item => 
        realTags.every((tag:any) => JSON.parse(item.tags).includes(tag))
      )?.slice(0,3);
    return(
            <div className=' py-4 space-y-7'>
                {filteredPosts?.map((item:any, index:number) => (
                    <SeeMoreCard item={item} key={index} alt='see more' width='150px' height='150px' />
                ))}
                
            </div>
    )
}

export default YouMayAlsoLike