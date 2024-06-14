import React from "react";
import { TrapeziumImage } from "../cards/PostCard";
import glass from '../../../../public/wallpaperflare.com_wallpaper.jpg'

const FeaturedList = () => {
  return (
    <div>
      <ul>
        <li className=" flex px-2 border-b border-b-bgdark/50 flex-1 items-center py-5 gap-x-4">
          <TrapeziumImage
            src={glass}
            alt="featured"
            width="50px"
            height="50px"
          />
          <h5 className=" font-semibold text-pretty text-lg ">
            Dragon Glass is very Dangerous
          </h5>
        </li>
      </ul>
    </div>
  );
};

export default FeaturedList;
