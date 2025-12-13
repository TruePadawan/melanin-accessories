import { useState } from "react";
import ChevronRight from "../../assets/icons/chevron-right.svg";
import ChevronLeft from "../../assets/icons/chevron-left.svg";
import { urlForImage } from "../../utils/sanity-utils";
import type { Category } from "../../../sanity.types";

interface CategoriesCarouselProps {
	categories: Category[];
}

export default function CategoriesCarousel({
	categories,
}: CategoriesCarouselProps) {
	const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = 4;
	const totalPages = Math.ceil(categories.length / itemsPerPage);
	const currentCategories = categories.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);

	const goToPrevious = () => {
		setCurrentPage((prev) => Math.max(0, prev - 1));
	};

	const goToNext = () => {
		setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
	};

	const isAtBeginning = currentPage === 0;
	const isAtEnd = currentPage === totalPages - 1 || categories.length === 0;

	if (categories.length === 0) {
		return (
			<section className="bg-white p-4 sm:p-8 md:px-16 xl:px-32 font-lexend">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-playfair">
						Categories
					</h2>
				</div>
				<p className="text-gray-500 text-center py-8">
					No categories available.
				</p>
			</section>
		);
	}

	return (
		<section
			aria-labelledby="categories"
			className="bg-white p-4 sm:p-8 md:px-16 xl:px-32 font-lexend">
			<div className="flex justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
				<h2
					id="categories"
					className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-playfair">
					Categories
				</h2>

				{/* Navigation Controls */}
				<div className="flex items-center gap-2 sm:gap-4">
					{/* Page Indicator */}
					<span className="text-sm text-gray-500 hidden sm:inline">
						{currentPage + 1} of {totalPages}
					</span>

					{/* Navigation Buttons */}
					<div className="flex items-center gap-2">
						<button
							className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer group disabled:hover:bg-white disabled:cursor-not-allowed"
							disabled={isAtBeginning}
							onClick={goToPrevious}
							aria-label="Previous categories">
							<img
								src={ChevronLeft.src}
								alt="Previous"
								className="w-5 h-5 sm:w-6 sm:h-6 group-disabled:opacity-50"
							/>
						</button>
						<button
							className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer group disabled:hover:bg-white disabled:cursor-not-allowed"
							disabled={isAtEnd}
							onClick={goToNext}
							aria-label="Next categories">
							<img
								src={ChevronRight.src}
								alt="Next"
								className="w-5 h-5 sm:w-6 sm:h-6 group-disabled:opacity-50"
							/>
						</button>
					</div>
				</div>
			</div>

			{/* Categories Grid */}
			<ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 sm:gap-y-10 gap-x-3 sm:gap-x-4">
				{currentCategories.map((category) => (
					<li className="w-full max-w-sm mx-auto" key={category._id}>
						<a
							href={`/catalog/${category.slug.current}`}
							className="block overflow-hidden group relative">
							<img
								src={urlForImage(category.image)
									.width(400)
									.url()}
								alt={category.title}
								className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-110"
								loading="lazy"
							/>
							{category.discount > 0 && (
								<span className="absolute top-2 left-2 bg-primary text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
									{category.discount}% OFF
								</span>
							)}
						</a>
						<a
							className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg flex items-center gap-2 hover:gap-4 transition-[gap] group"
							href={`/catalog/${category.slug.current}`}>
							<span className="group-hover:text-primary transition-colors">
								{category.title}
							</span>
							<img
								src={ChevronRight.src}
								alt="Go to category"
								className="w-4 h-4 transition-transform group-hover:translate-x-1"
							/>
						</a>
					</li>
				))}
			</ul>

			{/* Mobile Page Indicator */}
			<div className="flex justify-center mt-6 sm:hidden">
				<span className="text-sm text-gray-500">
					{currentPage + 1} of {totalPages}
				</span>
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center gap-2 mt-4 sm:mt-6">
					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full transition-colors ${
								index === currentPage
									? "bg-primary"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
							onClick={() => setCurrentPage(index)}
							aria-label={`Go to page ${index + 1}`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
