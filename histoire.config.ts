import { defineConfig } from 'histoire'
import { HstSvelte } from '@histoire/plugin-svelte'
import { defaultColors } from 'histoire';

export default defineConfig({
	outDir: 'dist-histoire',
	plugins: [
		HstSvelte(),
	],
	setupFile: '/stories/histoire.setup.ts',
	theme: {
		title: "Lab. ANSSI - UI Kit",
		favicon: 'favicon.ico',
		logo: {
			square: '/static/ANSSI-sombre.svg',
			light: '/static/ANSSI.svg',
			dark: '/static/ANSSI-sombre.svg',
		},
		colors: {
			primary: {
				50: '#aca6fe',
				100: '#9b94fd',
				200: '#8a82fd',
				300: '#7970fd',
				400: '#695efc',
				500: '#584cfc',
				600: '#4f44e3',
				700: '#463dca',
				800: '#3e35b0',
				900: '#352e97',
			},
		},
		logoHref: 'https://acme.com',
	}
})
