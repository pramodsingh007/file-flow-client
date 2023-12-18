/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#6c47ff",
        'secondary':'#f9fafb'
      }
    },
  },
  plugins: [require("daisyui")],
}