import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'dist/index.js'),
			name: 'WebComponents',
			fileName: 'index',
			formats: ['iife']
		},
		outDir: 'dist/webcomponents'
	},
	plugins: [svelte()]
});