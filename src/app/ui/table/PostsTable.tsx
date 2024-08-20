'use server'
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {Card, CardHeader,Typography, CardBody, IconButton, Tooltip} from "../customComponents/CustomComponents";
import { DeleteModal } from "../modals/DeleteModal";
import Link from "next/link";
import SearchPostsFilter from "../forms/SearchPostsFilter";
import { getAllUserPosts, getAllUserPostsPages } from "@/app/lib/data";
import PostsTableSkeleton from "../cskeletons/PostsTableSkeleton";
import { Suspense } from "react";
import UserPostsPagination from "../Pagination/UserPostsPagination";
import { deletePost } from "@/app/lib/actions";

 
const TABLE_HEAD = ["Id", "Title", "Category", "Post Type", "Date",  "Actions"];
 

 
export async function PostsTable({searchParams}:{searchParams:any}) {
    const deleter = searchParams?.delete_confirmation;

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const data = await getAllUserPosts(query, currentPage)

    const totalPages = await getAllUserPostsPages(query);
    //console.log(data)
  return (
    <Card className="mt-5 h-full w-full">
        {deleter && <DeleteModal deleteFunction={deletePost} newParams={'delete_confirmation'}/>}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Posts
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <SearchPostsFilter/>         
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          <Suspense fallback={<PostsTableSkeleton/>}>
            {data?.map(
              (
                {
                  postid,
                  title,
                  slug,
                  category,
                  type,
                  created_at
                }:any,
                index:any,
              ) => {
                const newDate = new Date(created_at).toDateString();
                const isLast = index === data?.length - 1;
                const classes = isLast ? "p-4": "p-4 border-b border-blue-gray-50";
                const newTitle = title?.length >= 50 ? `${title?.substring(0, 50)}...` : title
                return (
                
                  <tr key={index} >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {index + 1}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content={title}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold capitalize"
                        >
                          {newTitle}
                        </Typography>
                      </Tooltip>
                    <Link className=" font-medium transition-all duration-500 text-sm hover:text-primary" 
                    target="_blank" href={`/detail/${postid}`}>View</Link>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {category}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {type}
                      </Typography>
                    </td>
                    <td className={classes}>
                     {/*  <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "paid"
                              ? "green"
                              : status === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div> */}

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {newDate}
                      </Typography>
                    </td>
                    
                    <td className={classes}>
                      <Tooltip content="Edit">
                        <Link href={`/auth/dashboard/edit/${postid}`}>
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <Link className="" href={`?delete_confirmation=${postid + "@" + slug}`}>
                          <IconButton className=" z-50" variant="text">
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Link>
                        
                      </Tooltip>
                    </td>
                  </tr>
                
                );
              },
            )}
            </Suspense>
          </tbody>
        </table>
      </CardBody>
      <UserPostsPagination totalPages={totalPages}/>
    </Card>
  );
}