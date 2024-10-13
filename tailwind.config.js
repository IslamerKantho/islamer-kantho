/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  // important: '#_next',
  // prefix: 'd9_',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: `"HNT","Inter","Roboto","Arial",sans-serif`,
      fontFamily: {
        sans: ["HNT", "Inter", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#044f4f",
        secondary: "#D1BB9E",
        error: "#E72929",
        warning: "#ff9800",
        success: "#41B06E",
      }
    },
  },
  plugins: [import('@tailwindcss/forms')],
}

