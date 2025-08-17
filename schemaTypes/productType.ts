import { defineField, defineType } from "sanity";

export const productType = defineType({
	type: "document",
	name: "product",
	title: "Product",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required().min(1).max(100),
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
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "price",
			title: "Price (NGN)",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: "discount",
			title: "Discount",
			type: "number",
			initialValue: 0,
			description: "Discount percentage (0-100)",
			validation: (Rule) => Rule.min(0).max(100),
		}),
		defineField({
			name: "images",
			title: "Product Images",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "alt",
							title: "Alt Text",
							type: "string",
						},
					],
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "interestCount",
			title: "Interest Count",
			type: "number",
			initialValue: 0,
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "availability",
			title: "Availability",
			type: "string",
			options: {
				list: [
					{ title: "In Stock", value: "in_stock" },
					{ title: "Out of Stock", value: "out_of_stock" },
					{ title: "Low Stock", value: "low_stock" },
				],
			},
		}),
		defineField({
			name: "createdAt",
			title: "Created At",
			type: "datetime",
			initialValue: new Date().toISOString(),
			readOnly: true,
		}),
	],
});
