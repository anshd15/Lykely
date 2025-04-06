/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				lukso: '#FE005B',
			},
		},
	},
	plugins: [require('daisyui')],
	corePlugins: {
		// Enabling smooth scrolling and snap scroll support
		scrollBehavior: true,
	},
};
