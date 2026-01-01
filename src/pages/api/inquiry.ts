export const prerender = false;
import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";
import { SANITY_API_WRITE_TOKEN, RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);
export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();
	const customerName = formData.get("name") as string;
	const customerWhatsAppNumber = formData.get("whatsapp_number") as string;
	const customerMessage = formData.get("message") as string;
	const customerEmail = formData.get("email") as string;
	const customerLocation = formData.get("location") as string;
	const items = JSON.parse(formData.get("items") as string) as { id: string; title: string }[];

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
		items: items.map((item) => ({
			_type: "reference",
			_ref: item.id,
			_key: item.id,
		})),
		inquiryStatus: "new",
	};

	const writeClient = sanityClient.withConfig({
		token: SANITY_API_WRITE_TOKEN,
		useCdn: false,
	});
	await writeClient.create(inquiryDocument);

	// Send email to site owner
    await resend.emails.send({
      from: "Melanin Accessories <inquiries@notifications.melaninaccessories.live>",
      to: ["melaninaccessories539@gmail.com", "adeyemofaridah7@gmail.com"],
      subject: `New Inquiry from ${customerName}`,
      html: `
        <h1>New Product Inquiry</h1>
        <p><strong>Customer:</strong> ${customerName} (${customerWhatsAppNumber}) ${customerEmail ?? ""}</p>
        <p><strong>Message:</strong> ${customerMessage}</p>
        <h2>Wishlisted Products:</h2>
        <ul>
          ${items.map((item) => `<li>${item.title}</li>`).join('')}
        </ul>
      `,
    });

	return new Response(JSON.stringify({ message: "Inquiry received" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
