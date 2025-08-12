// @ts-check
import { defineConfig } from "astro/config";
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
			projectId: env.PUBLIC_SANITY_PROJECT_ID,
			dataset: env.PUBLIC_SANITY_DATASET,
			apiVersion: "2025-08-11",
			studioBasePath: "/studio",
		}),
		react(),
	],
});
