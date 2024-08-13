import { Typography } from '../customComponents/CustomComponents'
import React from 'react'

const PostsTableSkeleton = ({classes, id}:any) => {
  return (
    <tr className='animate-pulse' key={id}>
    <td className={classes}>
      <div className="flex items-center gap-3">
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      </div>
    </td>
    <td className={classes}>
    <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </td>
    <td className={classes}>
    <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </td>
    <td className={classes}>
    <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
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
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </td>
    
    <td className={classes}>
    <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-5 w-56 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </td>
  </tr>
  )
}

export default PostsTableSkeleton
