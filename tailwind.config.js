/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				league: {
					black: "#0D0D0D",
					dark: "#252625",
					mediumdark: "#585957",
					medium: "#8B8C8B",
					light: "#D9D9D9",
				},
			},
		},
	},
	plugins: [],
};
