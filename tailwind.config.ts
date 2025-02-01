import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(input|toggle|form).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        secondary: "var(--secondary)"
      },
      boxShadow: {
        default: '0 8px 1px rgba(253, 144, 97, 0.4)',
        hover: '0 8px 1px rgba(206, 107, 64, 0.45)',
        'navbar': '0px 12px 10.2px 4px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        'leaderboard': '0px 8px 8px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [heroui()],
} satisfies Config;
