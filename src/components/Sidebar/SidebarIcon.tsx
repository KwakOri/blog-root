import SVGIcon from "@/components/SVGIcon";
import { IconMapTypes } from "@/icons/icons";
import { cn } from "@/utils/tailwind/cn";
import { cva } from "class-variance-authority";

const sidebarIconVariants = cva("shrink-0 relative z-10", {
  variants: {
    active: {
      false: "fill-primary-strong",
      true: "fill-paper-weak ",
    },
  },
});

interface SidebarIconProps {
  icon: IconMapTypes;
  active: boolean;
}

const SidebarIcon = ({ icon, active }: SidebarIconProps) => {
  return (
    <div className={"p-[10px]"}>
      <SVGIcon
        icon={icon}
        size={"md"}
        className={cn(sidebarIconVariants({ active }))}
      />
    </div>
  );
};

export default SidebarIcon;
