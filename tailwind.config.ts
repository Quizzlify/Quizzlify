import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(alert|input|toggle|button|ripple|spinner|form).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        "background-tertiary": "var(--background-tertiary)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-secondary": "var(--accent-secondary)",
        success: "var(--success)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        "card-bg": "var(--card-bg)",
        "nav-bg": "var(--nav-bg)",
        border: "var(--border)"
      },
      boxShadow: {
        default: '0 8px 20px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 15px rgba(15, 16, 18, 0.8)',
        'navbar': '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      dropShadow: {
        'leaderboard': '0 8px 8px rgba(0, 0, 0, 0.3)',
        'text': '0 2px 4px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(to right, var(--accent), var(--accent-hover))',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;