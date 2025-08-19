import { useStore } from "@nanostores/react";
import { interests, isInquiryFormOpen } from "../store/store";
import XMarkOutlinedIcon from "./icons/XMarkOutlinedIcon";
import { useState } from "react";
import HeartIcon from "./icons/HeartIcon";

export default function InquiryForm() {
	const $isInquiryFormOpen = useStore(isInquiryFormOpen);
	const $interests = useStore(interests);
	const [submitting, setSubmitting] = useState(false);
	const [inquiryWasSent, setInquiryWasSent] = useState(false);
	const [errorResponse, setErrorResponse] = useState("");
	const interestsList = Object.values($interests);

	if (!$isInquiryFormOpen) return null;

	function closeForm() {
		isInquiryFormOpen.set(false);
	}

	async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setSubmitting(true);
		const formData = new FormData(event.currentTarget);
		formData.append(
			"items",
			JSON.stringify(interestsList.map((item) => item._id))
		);
		const response = await fetch("/api/inquiry", {
			method: "POST",
			body: formData,
		});
		if (response.ok) {
			setInquiryWasSent(true);
		} else {
			const data = await response.json();
			setErrorResponse(data.message);
		}
		setSubmitting(false);
	}

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
			onClick={closeForm}>
			{!inquiryWasSent && (
				<form
					className="bg-white p-6 rounded shadow-lg w-lg flex flex-col gap-4"
					onClick={(e) => e.stopPropagation()}
					onSubmit={formSubmitHandler}>
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold">Inquiry Form</h2>
						<button
							onClick={closeForm}
							className="text-gray-500 hover:text-gray-700 cursor-pointer">
							<XMarkOutlinedIcon className="w-6 h-auto" />
						</button>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="name">
							Your Name *
						</label>
						<input
							id="name"
							name="name"
							type="text"
							className="w-full p-2 border"
							required
						/>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="whatsapp">
							Your WhatsApp Number *
						</label>
						<input
							type="tel"
							id="whatsapp"
							name="whatsapp_number"
							className="w-full p-2 border"
							required
						/>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="email">
							Email (optional)
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full p-2 border rounded"
						/>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="location">
							Your Location *
						</label>
						<input
							type="text"
							id="location"
							name="location"
							className="w-full p-2 border"
							placeholder="City, State"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Items of Interest
						</label>
						<div className="flex flex-wrap gap-2">
							{interestsList.map((item) => (
								<span
									key={item._id}
									className="bg-gray-100 text-gray-800 px-3 py-1 text-sm">
									{item.title}
								</span>
							))}
						</div>
					</div>
					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="message">
							Message (optional)
						</label>
						<textarea
							className="w-full p-2 border rounded"
							id="message"
							name="message"
							maxLength={1000}
							rows={4}></textarea>
					</div>
					{errorResponse && (
						<p className="text-red-500 text-sm mt-2">
							{errorResponse}
						</p>
					)}
					<button
						type="submit"
						className="w-full bg-primary text-white py-4 rounded hover:bg-primary-dark transition-colors duration-200 font-semibold disabled:cursor-not-allowed"
						disabled={submitting}>
						Submit Inquiry
					</button>
				</form>
			)}
			{inquiryWasSent && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-white p-6 rounded shadow-lg flex flex-col gap-2">
					<HeartIcon className="w-40 h-auto text-primary self-center" />
					<p className="text-gray-700 font-semibold font-lexend">
						Thank you for your inquiry. We will get back to you
						shortly.
					</p>
					<p className="text-sm text-gray-500">
						You can also join our{" "}
						<a
							href="https://chat.whatsapp.com/IMBxX8TVah86rgGIgF1TML"
							className="text-primary hover:underline">
							WhatsApp group
						</a>{" "}
						for updates and offers.
					</p>
					<button
						onClick={closeForm}
						className="mt-2 w-full bg-primary text-white py-4 rounded hover:bg-primary-dark transition-colors duration-200 font-semibold">
						Close
					</button>
				</div>
			)}
		</div>
	);
}
