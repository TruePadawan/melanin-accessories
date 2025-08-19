import { defineField, defineType } from "sanity";

export const inquiryType = defineType({
	type: "document",
	name: "inquiry",
	title: "Customer Inquiry",
	fields: [
		defineField({
			name: "customerName",
			title: "Customer Name",
			type: "string",
			validation: (Rule) => Rule.required().min(1).max(100),
		}),
		defineField({
			name: "customerPhoneNumber",
			title: "Customer Phone Number (WhatsApp)",
			type: "string",
			validation: (Rule) => Rule.required().min(10).max(20),
		}),
		defineField({
			name: "customerLocation",
			title: "Customer Location",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "customerEmail",
			title: "Customer Email",
			type: "string",
			validation: (Rule) => Rule.email().max(100),
		}),
		defineField({
			name: "items",
			title: "Items of Interest",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "product" }],
				},
			],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
});
