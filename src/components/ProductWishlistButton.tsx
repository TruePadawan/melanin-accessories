import { useStore } from "@nanostores/react";
import type { Product } from "../../sanity.types";
import { wishlistedProducts } from "../store/store";
import { urlForImage } from "../utils/sanity-utils";
import HeartOutlinedIcon from "./icons/HeartOutlinedIcon";
import HeartIcon from "./icons/HeartIcon";

interface ProductWishlistButtonProps {
	product: Pick<Product, "_id" | "title" | "slug" | "price" | "images">;
	iconMode?: boolean;
	className?: string;
}

export default function ProductWishlistButton({
	product,
	iconMode = true,
	className = "",
}: ProductWishlistButtonProps) {
	const $wishlistedProducts = useStore(wishlistedProducts);
	const productId = product._id;

	function addOrRemoveFromWishlist() {
		if ($wishlistedProducts[productId]) {
			// Remove from wishlist
			wishlistedProducts.setKey(productId, undefined);
		} else {
			// Add to wishlist
			wishlistedProducts.setKey(productId, {
				_id: productId,
				title: product.title,
				price: product.price.toString(),
				slug: product.slug.current.toString(),
				image: urlForImage(product.images[0]).url(),
			});
		}
	}
	const isWishlisted = $wishlistedProducts[productId] !== undefined;
	if (iconMode) {
		return (
			<button
				className={"p-6 cursor-pointer group bg-gray-100 " + className}
				onClick={addOrRemoveFromWishlist}>
				{isWishlisted ? (
					<HeartIcon className="w-8 h-auto text-primary group-hover:text-primary-dark group-active:w-7 transition-all duration-100" />
				) : (
					<HeartOutlinedIcon className="w-8 h-auto text-primary group-hover:text-primary-dark group-active:w-7 transition-all duration-100" />
				)}
			</button>
		);
	} else {
		return (
			<button
				className={
					"cursor-pointer px-10 py-6 bg-primary text-white rounded hover:bg-primary-dark transition-colors duration-200 " +
					className
				}
				onClick={addOrRemoveFromWishlist}>
				{isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
			</button>
		);
	}
}
