import type { Category, Product } from "../sanity.types";

export type ProductWithCategory = Omit<Product, "category"> & {
	category: Category;
};
