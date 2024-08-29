'use client'
import React from "react";
import { Drawer, Button, Typography, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Chip,
} from "../customComponents/CustomComponents";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Oxanium } from "next/font/google";
import { urlLinks } from "./CusNavLinks";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
 
const oxanium = Oxanium({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oxanium",
  })
export function MobileNavBar({session}:any) {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const pathname = usePathname()
 
  return (
    <React.Fragment>
      <Button variant="outlined" className=" inline-block p-1.5 lg:hidden text-textdark" onClick={openDrawer}>
        {open ? <XMarkIcon className="h-8 w-8"/>:<Bars3BottomRightIcon className="h-8 w-8"/>}
      </Button>
      <Drawer placement="right" open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" className={` ${oxanium.className} text-textdark`}>
            <Link className=" no-underline text-inherit" href={'/'}>Jhae-Blog</Link>
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
        {urlLinks.map((item:any)=>(
          <ListItem className={`${pathname == item.url ? 'bg-primary text-white' : 'text-textdark'} mb-2 p-2 hover:bg-gray-400 `} key={item.title}>
            <Link className="flex text-inherit items-center gap-2 no-underline" href={item.url}>
                <ListItemPrefix>
                {item.icon}
                </ListItemPrefix>
                {item.title}   
            </Link>
           </ListItem> 
        ))}
          

        </List>
        {session?.id ?
        <Button onClick={async()=> await signOut()} className="mt-3 ml-5 w-4/5 block" size="sm">
          Logout
        </Button>
        :
        <Link className=" text-textdark hover:text-primary" href={'auth/login'}>Login</Link>
        }
      </Drawer>
    </React.Fragment>
  );
}