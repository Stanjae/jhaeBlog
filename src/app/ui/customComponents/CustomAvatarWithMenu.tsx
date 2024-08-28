'use client'
import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "./CustomComponents";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import CustomAvatar from "./CustomAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react"
 
// profile menu component

 
export function CustomAvatarWithMenu({session}:any) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      href:`/profiles/${session?.userid}`
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      href:'/auth/dashboard/settings'
    }
  ];
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          {session?.image ?
          <Avatar
            variant="circular"
            size="md"
            alt={session?.name}
            withBorder={true}
            color="blue-gray"
            className=" h-10 w-10 p-0.5"
            src={session?.image}
          />
          :
          <CustomAvatar name={session?.name?.toUpperCase().slice(0,2) || ''}/>
        }
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, href }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
            <Link className=" no-underline flex items-center gap-2 text-inherit" href={href}>
              {React.createElement(icon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={"inherit"}
              >
                {label}
              </Typography>
            </Link>
            
            </MenuItem>
          );
        })}
        <Button onClick={()=> signOut()} className=" flex w-full text-red-400 items-center gap-2 " variant="text">
              <PowerIcon className="h-4 w-4" />
              Logout</Button>
      </MenuList>
    </Menu>
  );
}