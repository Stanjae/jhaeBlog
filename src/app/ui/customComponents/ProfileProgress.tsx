'use client'
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import {CheckBadgeIcon as CheckBadgeIconOutline} from "@heroicons/react/24/outline";
import { Progress } from "@material-tailwind/react";
import { useMemo } from "react";
 
export function ProfileProgress({profile}:any) {
    const completed = Object.keys(profile).reduce((acc, key) => {
        if (profile[key] !== '') acc++;
        return acc;
      }, 0);

      const total = Object.keys(profile).length;

      const progress = useMemo(() =>{
        return Math.round((Number(completed) / Number(total)) * 100);
      }, [completed, total])

  return (
    <div className=" flex-1 flex justify-center gap-x-5 items-center">
        <Progress value={progress} label="Completed" />
        {progress === 100 && <CheckBadgeIcon className={`h-8 w-8 text-primary`} /> }
    </div>
  )
}