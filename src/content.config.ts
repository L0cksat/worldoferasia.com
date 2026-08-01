import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const characters = defineCollection({
	loader: glob({
		base: './src/content/characters',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		campaign: z.enum(['erasia', 'alabaris']),
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

/**
 * Scrolls: keep frontmatter small (title + image).
 * Long lore goes in the Markdown body below --- (not as text/textSecond/...).
 * Invalid YAML (e.g. JS commas after values) makes content sync fail —
 * then getCollection('scrolls') looks like the collection "doesn't exist".
 */
const scrolls = defineCollection({
	loader: glob({
		base: './src/content/scrolls',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		campaign: z.enum(['erasia', 'alabaris']),
		title: z.string(),
		image: z.string().optional(),
	}),
});

const corporations = defineCollection({
	loader: glob({
		base: './src/content/corporations',
		pattern: '**/*.{md,mdx}',
	}),
	schema: z.object({
		campaign: z.enum(['erasia', 'alabaris']),
		name: z.string(),
		uniform: z.string().optional(),
		emblem: z.string().optional(),
		image: z.string().optional(),
	})
})

export const collections = { characters, scrolls, corporations };
