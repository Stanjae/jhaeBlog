'use client'
import * as React from "react";
import { useRef } from "react";
import { SVGMotionProps, motion, sync, useCycle } from "framer-motion";
import { useDimensions } from "./usedimension";
import { navigation } from "./DashboardSidePiece";
import Link from "next/link";


const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const MobileDashNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
    className="absolute top-0 w-[400px] left-0 bottom-0 "
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className=" absolute top-0 h-svh bg-white w-[275px] left-0 bottom-0" variants={sidebar} />
      <Navigation />
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
    </motion.nav>
  );
};




const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, item}:any) => {
  const style = { border: `2px solid ${colors[i]}` };
  const styles = {color:`${colors[i]}`}
  return (
    <motion.li
        className="li hover:bg-primary py-3 px-5 rounded-md hover:text-white"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link className="no-underline text-inherit flex items-center gap-2" href={item?.href}>
        {item?.icon}
        <span>{item?.name}</span>
      </Link>
      
    </motion.li>
  );
};



const Path = (props: any) => (
  <motion.path
    fill="#000"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

/* menu toogle */

export const MenuToggle = ({ toggle , isOpen}:{toggle:any, isOpen:any}) => (
  <button className={` cursor-pointer ${isOpen ? 'bg-primary':'bg-white'} rounded-full p-5 top-2 left-2.5 relative z-50`}
   onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);


/* navigation */
const variants2 = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <motion.ul className=" ul" variants={variants2}>
    {navigation.map((item:any, index:number) => (
      <MenuItem i={index} item={item} key={index} />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];

