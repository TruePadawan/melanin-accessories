import { persistentMap } from "@nanostores/persistent";
import type { Product } from "../../sanity.types";
import { atom } from "nanostores";

export type ProductOfInterest = Pick<Product, "_id" | "title"> & {
	slug: string;
	price: string;
	image: string;
};

export const interests = persistentMap<Record<string, ProductOfInterest>>(
	"interests:",
	{},
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	}
);

export const isSidebarOpen = atom(false);

export const isInquiryFormOpen = atom(false);

export const isSearchOverlayOpen = atom(false);
