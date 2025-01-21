import { cva } from "class-variance-authority";

export const selectLabelVariant = cva(
  "w-[120px] text-base font-semibold transition-all opacity-100 absolute right-[12px]",
  {
    variants: {
      state: {
        ACTIVE: "text-paper-weak",
        INACTIVE: " text-primary-strong",
      },
    },
  }
);

export const selectBoxVariant = cva(
  " p-3 flex items-center gap-3 rounded-xl brightness-100 transition-all relative",
  {
    variants: {
      state: {
        ACTIVE: "bg-primary-strong",
        INACTIVE: "bg-paper-weak hover:brightness-75 cursor-pointer",
      },
    },
  }
);

export const selectIconVariant = cva("", {
  variants: {
    state: {
      ACTIVE: "fill-paper-weak",
      INACTIVE: "fill-primary-strong",
    },
  },
});
