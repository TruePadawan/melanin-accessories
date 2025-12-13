import { defineField, defineType } from "sanity";

export const categoryType = defineType({
	type: "document",
	name: "category",
	title: "Category",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required().min(1).max(50),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "discount",
			title: "Category Discount",
			type: "number",
			initialValue: 0,
			description:
				"Discount percentage for products in this category (0-100)",
			validation: (Rule) => Rule.min(0).max(100).required(),
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Category Image",
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alt Text",
				},
			],
			validation: (rule) => rule.required(),
		}),
	],
});
