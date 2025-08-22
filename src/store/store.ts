import { persistentMap } from "@nanostores/persistent";
import type { Product } from "../../sanity.types";
import { atom } from "nanostores";

export type WishlistedProduct = Pick<Product, "_id" | "title"> & {
	slug: string;
	price: string;
	image: string;
};

export const wishlistedProducts = persistentMap<
	Record<string, WishlistedProduct>
>(
	"wishlist:",
	{},
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	}
);

export const isSidebarOpen = atom(false);

export const isInquiryFormOpen = atom(false);

export const isSearchOverlayOpen = atom(false);
