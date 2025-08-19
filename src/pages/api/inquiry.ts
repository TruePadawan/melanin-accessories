export const prerender = false;
import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { SANITY_API_WRITE_TOKEN } from "astro:env/server";

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();
	const customerName = formData.get("name") as string;
	const customerWhatsAppNumber = formData.get("whatsapp_number") as string;
	const customerMessage = formData.get("message") as string;
	const customerEmail = formData.get("email") as string;
	const customerLocation = formData.get("location") as string;
	const items = JSON.parse(formData.get("items") as string) as string[];

	if (
		!customerName ||
		!customerWhatsAppNumber ||
		!customerLocation ||
		items.length === 0
	) {
		return new Response(
			JSON.stringify({
				message:
					"Name, WhatsApp number, location and items are required.",
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
	const inquiryDocument = {
		_type: "inquiry",
		customerName,
		customerWhatsAppNumber,
		customerLocation,
		customerEmail,
		customerMessage,
		items: items.map((itemId) => ({
			_type: "reference",
			_ref: itemId,
			_key: itemId,
		})),
		inquiryStatus: "new",
	};

	const writeClient = sanityClient.withConfig({
		token: SANITY_API_WRITE_TOKEN,
		useCdn: false,
	});
	await writeClient.create(inquiryDocument);
	return new Response(JSON.stringify({ message: "Inquiry received" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
