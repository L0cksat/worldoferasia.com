// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	redirects: {
		'/world': '/erasia/world',
		'/characters': '/erasia/characters',
		'/sessions': '/erasia/sessions',
	},
});
