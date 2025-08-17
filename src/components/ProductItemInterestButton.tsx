import { useStore } from "@nanostores/react";
import type { Product } from "../../sanity.types";
import { interests } from "../store/interests";
import { urlForImage } from "../utils/sanity-utils";
import HeartOutlinedIcon from "./icons/HeartOutlinedIcon";
import HeartIcon from "./icons/HeartIcon";

interface ProductItemInterestButtonProps {
	product: Pick<Product, "_id" | "title" | "slug" | "price" | "images">;
}

export default function ProductItemInterestButton({
	product,
}: ProductItemInterestButtonProps) {
	const $interests = useStore(interests);
	const productId = product._id;

	function toggleInterest() {
		if ($interests[productId]) {
			// Remove from interests
			interests.setKey(productId, undefined);
		} else {
			// Add to interests
			interests.setKey(productId, {
				_id: productId,
				title: product.title,
				price: product.price.toString(),
				slug: product.slug.current.toString(),
				image: urlForImage(product.images[0]).url(),
			});
		}
	}
	const isInterested = $interests[productId] !== undefined;
	return (
		<button
			className="p-6 cursor-pointer group bg-gray-100"
			onClick={toggleInterest}>
			{isInterested ? (
				<HeartIcon className="w-8 h-auto text-primary group-hover:text-primary-dark group-active:w-7 transition-all duration-100" />
			) : (
				<HeartOutlinedIcon className="w-8 h-auto text-primary group-hover:text-primary-dark group-active:w-7 transition-all duration-100" />
			)}
		</button>
	);
}
