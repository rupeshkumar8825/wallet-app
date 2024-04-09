/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // adding the path for the tailwind to know that we will also be writing the 
    // tailwing code inside the packages folder inside the UI  part for this purpose 
    // hence the tailwind should also know that we have to use that particular path as well and it will compile this for this purpose 
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"  
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

