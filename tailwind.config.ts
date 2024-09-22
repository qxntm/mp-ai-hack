import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#F4F7FE',
        'primary-navy-blue': '#062F6E',
        'primary-blue': '#00AEEF',
        'green': '#14CA74',
        'secondary-green': '#05C168',
        'red': '#FF5A65',
        'secondary-red': '#FF5A65'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Set Inter as the default sans-serif font
      },
    },
  },
  plugins: [],
};
export default config;
