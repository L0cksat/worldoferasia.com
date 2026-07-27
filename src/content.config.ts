import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Mentorship notes (why getCollection('characters') failed before):
 * 1. This file must live at src/content.config.ts (not project root).
 * 2. The glob base must be './src/content/characters' (you had '.src/...').
 * 3. defineCollection is imported from 'astro:content'.
 * 4. The folder src/content/characters/ must exist (even before you fill every entry).
 */
const characters = defineCollection({
	loader: glob({
		base: './src/content/characters',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		name: z.string(),
		playedBy: z.string().optional(),
		age: z.number().optional(),
		race: z.string().optional(),
		sex: z.string().optional(),
		birthPlace: z.string().optional(),
		pcClass: z.string().optional(),
		profession: z.string().optional(),
		image: z.string().optional(),
		images: z.array(z.string()).optional(),
	}),
});

export const collections = { characters };
