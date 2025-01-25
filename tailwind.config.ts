import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          strong: "#2D2D2D",
          normal: "#686868",
          weak: "#C1C1C1",
        },
        paper: {
          weak: "#FDFDFD",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        ".shadow-small": {
          "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25);",
        },
        ".shadow-small-inset": {
          "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;",
        },
      });
    },
  ],
} satisfies Config;
