/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can add custom styles here if necessary, but this should work for now
    },
  },
  plugins: [
    require('daisyui'),
  ],
  corePlugins: {
    // Enabling smooth scrolling and snap scroll support
    scrollBehavior: true,
  },
}
