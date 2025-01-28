"use client";

import SidebarItem from "@/components/Sidebar/SidebarItem";
import { IconMapTypes } from "@/icons/icons";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems: { icon: IconMapTypes; text: string; path: string }[] = [
  { icon: "ChartSquare1", text: "Dashboard", path: "" },
  { icon: "Monitor1", text: "Blogs", path: "blogs" },
  { icon: "PaperNote", text: "Posts", path: "posts" },
  { icon: "Edit", text: "Write", path: "write" },
  { icon: "Setting1", text: "Settings", path: "settings" },
  { icon: "Login", text: "Logout", path: "logout" },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const pathname = usePathname();
  const currentPage = pathname.split("/")[1];

  return (
    <div
      className={`fixed z-10 top-0 left-0 h-full transition-all duration-300 ${
        isExpanded ? "w-56" : "w-[84px]"
      } bg-white shadow-lg`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="space-y-4 p-4">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            isExpanded={isExpanded}
            active={item.path === currentPage}
            {...item}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
