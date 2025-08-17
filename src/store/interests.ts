import { persistentMap } from "@nanostores/persistent";
import type { Product } from "../../sanity.types";

export type ItemOfInterest = {
	[id: string]: Pick<Product, "_id" | "title"> & {
		slug: string;
		price: string;
		image: string;
	};
};

export const interests = persistentMap<ItemOfInterest>(
	"interests:",
	{},
	{
		encode: JSON.stringify,
		decode: JSON.parse,
	}
);
