import Analytics from "/public/icons/analytics.svg";

export const IconMap = {
  Analytics,
} as const;

export type IconMapTypes = keyof typeof IconMap;

export const getVariantsWithCommonClass = (
  icons: IconMapTypes[],
  commonClass: string
) => {
  return icons.reduce((acc, icon) => {
    acc[icon] = `${commonClass}`;
    return acc;
  }, {} as { [key in IconMapTypes]: string });
};

export const IconSizes = {
  lg: 40,
  md: 32,
  sm: 24,
  xs: 16,
};

export type IconSizeTypes = keyof typeof IconSizes;
