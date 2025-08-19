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
			name: "customerWhatsAppNumber",
			title: "Customer WhatsApp Number",
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
			name: "customerMessage",
			title: "Customer Message",
			type: "text",
			readOnly: true,
			description: "Message from the customer",
			validation: (Rule) => Rule.max(1000),
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
		defineField({
			name: "inquiryStatus",
			title: "Inquiry Status",
			type: "string",
			options: {
				list: [
					{ title: "New", value: "new" },
					{ title: "Contacted", value: "contacted" },
					{ title: "Closed", value: "closed" },
				],
			},
			initialValue: "new",
			validation: (Rule) => Rule.required(),
		}),
	],
});
