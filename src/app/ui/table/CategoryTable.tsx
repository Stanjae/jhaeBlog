'use server'
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import {Card, CardHeader,Typography, Button, CardBody,Chip,CardFooter, 
  IconButton,Tooltip,Input,} from "../customComponents/CustomComponents";
import { DeleteModal } from "../modals/DeleteModal";
import { SearchParamProps } from "@/app/lib/definitions";
import Link from "next/link";
import { UpdateCategoryModal } from "../modals/UpdateCategoryModal";
import CreateCategoryForm from "../forms/CreateCategoryForm";
import { getAllCategories } from "@/app/lib/data";
import { deleteCategory } from "@/app/lib/actions";
 
const TABLE_HEAD = ["Id", "Title", "Slug", "Date",  "Actions"];
 

 
export async function CategoryTable({deleter, updater}:{deleter:any, updater:any}) {
    const data = await getAllCategories()
  return (
    <Card className="mt-5 h-full w-full">
        {deleter && <DeleteModal deleteFunction={deleteCategory} newParams={'delete_confirmation'}/>}
        {updater && <UpdateCategoryModal newParams={'update_confirmation'}/>}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Create a Category
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <CreateCategoryForm/>         
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
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
            {data?.map(
              (
                {
                  id,
                  title,
                  slug,
                  created_at
                },
                index,
              ) => {
                const newDate = new Date(created_at).toDateString();
                const isLast = index === data?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={id}>
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
                    <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {title}
                        </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {slug}
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
                        <Link href={`?update_confirmation=${title + "@" + slug + "@" + id}`}>
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <Link href={`?delete_confirmation=${title + "@" + id}`}>
                          <IconButton variant="text">
                            <TrashIcon className="h-4 w-4 text-red-500" />
                          </IconButton>
                        </Link>
                        
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}