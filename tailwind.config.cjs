/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',

	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],

  theme: {
    extend: {
		colors: {
			highlight: "#f43e5c"
		  }
	},
  },

	plugins: [
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
};

module.exports = config;