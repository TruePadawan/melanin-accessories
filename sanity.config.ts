// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
	projectId: "alr84u4h",
	dataset: "development",
	plugins: [structureTool()],
	schema: {
		types: schemaTypes,
	},
});
