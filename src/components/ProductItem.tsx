import type { Product } from "../../sanity.types";
import { urlForImage } from "../utils/sanity-utils";
import ProductWishlistButton from "./ProductWishlistButton";

interface ProductItemProps {
	product: Pick<
		Product,
		"_id" | "title" | "slug" | "price" | "images" | "discount"
	>;
}

export default function ProductItem({ product }: ProductItemProps) {
	const productPrice = product.discount
		? product.price * (1 - product.discount / 100)
		: product.price;
	return (
		<li className="w-full max-w-sm mx-auto">
			<a
				href={`/products/${product.slug.current}`}
				className="block overflow-hidden relative">
				<img
					src={urlForImage(product.images[0]).url()}
					alt={product.title}
					className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-110"
				/>
				{product.discount > 0 && (
					<span className="absolute top-2 left-2 bg-primary text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
						{product.discount}% OFF
					</span>
				)}
			</a>
			<div className="flex">
				<div className="grow py-3 sm:py-4 px-2 bg-black/10">
					<a
						href={`/products/${product.slug.current}`}
						className="block">
						<h3 className="text-base sm:text-lg">
							{product.title}
						</h3>
					</a>
					<p className="text-gray-600 font-semibold">
						₦{productPrice.toFixed(2)}
					</p>
				</div>
				<ProductWishlistButton product={product} />
			</div>
		</li>
	);
}
