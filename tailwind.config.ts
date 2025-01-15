import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },

      boxShadow: {
        default: '0 8px 1px rgba(253, 144, 97, 0.4)',
        hover: '0 8px 1px rgba(206, 107, 64, 0.45)',
      }
    },
  },
  plugins: [],
} satisfies Config;
