// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

import react from "@astrojs/react";

// Load environment variables
const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		sanity({
			projectId: env.SANITY_PROJECT_ID,
			dataset: env.SANITY_DATASET,
			apiVersion: "2025-08-11",
			studioBasePath: "/studio",
			useCdn: false,
		}),
		react(),
	],

	env: {
		schema: {
			SANITY_PROJECT_ID: envField.string({
				context: "client",
				access: "public",
				optional: false,
			}),
			SANITY_DATASET: envField.string({
				context: "client",
				access: "public",
				optional: false,
			}),
			SANITY_API_WRITE_TOKEN: envField.string({
				context: "server",
				access: "secret",
				optional: false,
			}),
		},
	},
});
