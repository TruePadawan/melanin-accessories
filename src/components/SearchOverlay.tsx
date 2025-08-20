import { useStore } from "@nanostores/react";
import { isSearchOverlayOpen } from "../store/store";
import { useState, useEffect, useCallback } from "react";
import { sanityClient } from "sanity:client";
import XMarkOutlinedIcon from "./icons/XMarkOutlinedIcon";
import { urlForImage } from "../utils/sanity-utils";

interface SearchResult {
	_id: string;
	title: string;
	slug: { current: string };
	images: any[];
	price: number;
}

export default function SearchOverlay() {
	const $isSearchOverlayOpen = useStore(isSearchOverlayOpen);
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const performSearch = useCallback(async (term: string) => {
		setIsSearching(true);
		if (term.length < 2) {
			setResults([]);
			setIsSearching(false);
			return;
		}
		try {
			const searchResults = await sanityClient.fetch<SearchResult[]>(
				`*[_type == "product" && title match $term] {
						_id,
						title,
						slug,
						images,
						price
					}`,
				{ term: term + "*" }
			);
			setResults(searchResults);
		} catch (error) {
			console.error("Search failed:", error);
			setResults([]);
		}
		setIsSearching(false);
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			performSearch(searchTerm);
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [searchTerm, performSearch]);

	if (!$isSearchOverlayOpen) return null;

	function closeOverlay() {
		isSearchOverlayOpen.set(false);
		setSearchTerm("");
		setResults([]);
	}

	return (
		<div className="fixed inset-0 bg-black/50 z-50" onClick={closeOverlay}>
			<div
				className="bg-white w-full max-w-2xl mx-auto mt-20 rounded-lg shadow-xl"
				onClick={(e) => e.stopPropagation()}>
				<div className="p-4 border-b flex items-center gap-4">
					<input
						type="search"
						placeholder="Search products..."
						className="w-full p-2 outline-none text-lg"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						autoFocus
					/>
					<button onClick={closeOverlay}>
						<XMarkOutlinedIcon className="w-6 h-6" />
					</button>
				</div>

				<div className="max-h-[60vh] overflow-y-auto">
					{isSearching ? (
						<div className="p-4 text-center text-gray-500">
							Searching...
						</div>
					) : results.length > 0 ? (
						<ul className="p-2">
							{results.map((product) => (
								<li key={product._id}>
									<a
										href={`/products/${product.slug.current}`}
										className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded"
										onClick={closeOverlay}>
										<img
											src={urlForImage(product.images[0])
												.width(60)
												.height(60)
												.url()}
											alt={product.title}
											className="w-15 h-15 object-cover rounded"
										/>
										<div>
											<h3 className="font-medium">
												{product.title}
											</h3>
											<p className="text-primary">
												₦
												{product.price.toLocaleString()}
											</p>
										</div>
									</a>
								</li>
							))}
						</ul>
					) : searchTerm.length > 0 ? (
						<div className="p-4 text-center text-gray-500">
							No products found
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
