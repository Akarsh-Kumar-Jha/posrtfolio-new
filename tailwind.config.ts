import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  // This tells Tailwind to look at all your files to find CSS classes
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ensure these match your global CSS variables
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        card: "var(--card)",
      },
    },
  },
  plugins: [
    typography, // This is required for Markdown styling
  ],
};

export default config;