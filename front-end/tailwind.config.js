/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
				lukso: '#FE005B',
			},
      animation: {
        float1: "float 6s ease-in-out infinite",
        float2: "float 8s ease-in-out infinite",
        "gradient-x": "gradientX 6s ease infinite",
        'gradientShift': 'gradientShift 6s ease infinite',

      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  corePlugins: {
    scrollBehavior: true,
  },
}
