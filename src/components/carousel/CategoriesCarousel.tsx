import { sanityClient } from "sanity:client";
import { useEffect, useRef, useState } from "react";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import ChevronLeft from "../../assets/icons/chevron-left.svg";
import { urlForImage } from "../../utils/sanity-utils";
import type { Category } from "../../../sanity.types";

export default function CategoriesCarousel() {
	const [categories, setCategories] = useState<Category[]>([]);
	const firstId = useRef<string>("");
	const lastId = useRef<string>("");
	const [atEnd, setAtEnd] = useState(false);
	const [atBeginning, setAtBeginning] = useState(true);

	// Initial fetch of categories
	useEffect(() => {
		fetchCategories("next");
	}, []);

	async function fetchCategories(direction: "next" | "prev") {
		if (atEnd && direction === "next") {
			return;
		} else if (atBeginning && direction === "prev") {
			return;
		}

		if (direction === "next") {
			const nextCategories = await sanityClient.fetch<Category[]>(
				`*[_type == "category" && _id > $lastId] | order(_id) [0...4]{_id, title, slug, image, discount}`,
				{ lastId: lastId.current }
			);

			console.log(nextCategories);
			setAtEnd(nextCategories.length < 4);
			if (nextCategories.length > 0) {
				setAtBeginning(false);
				setCategories(nextCategories);
				// Update lastId to the last fetched category's ID
				lastId.current = nextCategories[nextCategories.length - 1]._id;
				firstId.current = nextCategories[0]._id;
			}
		} else if (direction === "prev") {
			const prevCategories = await sanityClient.fetch<Category[]>(
				`*[_type == "category" && _id < $firstId] | order(_id) [0...4]{_id, title, slug, image, discount}`,
				{ firstId: firstId.current }
			);

			console.log(prevCategories);
			if (prevCategories.length > 0) {
				setAtEnd(false);
				setCategories(prevCategories);

				firstId.current = prevCategories[0]._id;
				lastId.current = prevCategories[prevCategories.length - 1]._id;
			} else {
				setAtBeginning(true);
			}
		}
	}

	return (
		<section
			aria-labelledby="categories"
			className="bg-white p-4 sm:p-8 md:p-16 lg:px-32 font-lexend">
			<div className="flex justify-between items-center">
				<h2 id="latest" className="text-2xl font-medium">
					Categories
				</h2>
				<div className="flex items-center gap-4">
					<button
						className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer group disabled:hover:bg-white"
						disabled={atBeginning}
						onClick={() => fetchCategories("prev")}>
						<img
							src={ChevronLeft.src}
							alt="Previous"
							className="w-6 h-6 group-disabled:opacity-50"
						/>
					</button>
					<button
						className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer group disabled:hover:bg-white"
						disabled={atEnd}
						onClick={() => fetchCategories("next")}>
						<img
							src={ChevronRight.src}
							alt="Next"
							className="w-6 h-6 group-disabled:opacity-50"
						/>
					</button>
				</div>
			</div>
			<ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
				{categories.map((category) => (
					<li className="w-full max-w-sm mx-auto" key={category._id}>
						<a href={`/catalog/${category.slug.current}`}>
							<img
								src={urlForImage(category.image).url()}
								alt={category.title}
								className="w-full aspect-[3/4] object-cover"
							/>
						</a>
						<a
							className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg flex items-center gap-2 hover:gap-4 transition-[gap]"
							href={`/catalog/${category.slug.current}`}>
							<span>{category.title}</span>
							<img
								src={ChevronRight.src}
								alt="Go to category"
								className="w-4 h-4"
							/>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
