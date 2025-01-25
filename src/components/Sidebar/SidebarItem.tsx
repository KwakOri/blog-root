"use client";

import SidebarIcon from "@/components/Sidebar/SidebarIcon";
import { IconMapTypes } from "@/icons/icons";
import { cva } from "class-variance-authority";
import Link from "next/link";

interface SidebarItemProps {
  icon: IconMapTypes;
  text: string;
  path: string;
  isExpanded: boolean;
  active: boolean;
}

const sidebarItemStyles = cva(
  "flex items-center rounded-xl transition-all brightness-100",
  {
    variants: {
      active: {
        true: "bg-primary-strong text-paper-weak pointer-events-none",
        false:
          "bg-paper-weak text-primary-strong hover:brightness-90 cursor-pointer",
      },
    },
  }
);

const textStyles = cva(
  "overflow-hidden transition-transform duration-500 font-semibold",
  {
    variants: {
      expanded: {
        true: "opacity-100 translate-x-0 ml-4",
        false: "opacity-0 -translate-x-4 ml-0",
      },
    },
  }
);

const SidebarItem = ({
  icon,
  text,
  path,
  isExpanded,
  active,
}: SidebarItemProps) => {
  return (
    <Link href={`/${path}`} className={sidebarItemStyles({ active })}>
      <SidebarIcon icon={icon} active={active} />
      <span className={textStyles({ expanded: isExpanded })}>{text}</span>
    </Link>
  );
};

export default SidebarItem;
