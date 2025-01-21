/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  getVariantsWithCommonClass,
  IconMap,
  IconMapTypes,
  IconSizes,
  IconSizeTypes,
} from "@/icons/icons";
import { cn } from "@/utils/tailwind/cn";
import { cva, VariantProps } from "class-variance-authority";

const IconVariants = getVariantsWithCommonClass(
  Object.keys(IconMap) as IconMapTypes[],
  ""
);

const SVGIconVariants = cva("", {
  variants: {
    icon: {
      ...IconVariants,
    },
  },
});

interface SVGIconProps extends VariantProps<typeof SVGIconVariants> {
  size?: IconSizeTypes;
  className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  icon,
  size = "lg",
  className,
}: SVGIconProps) => {
  const Icon = IconMap[icon as IconMapTypes];

  return (
    <Icon
      className={cn(SVGIconVariants({ icon, className }))}
      width={IconSizes[size]}
      height={IconSizes[size]}
    />
  );
};

export default SVGIcon;
