// sanityImageUrl.ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";

// Create an image URL builder using the client
const builder = imageUrlBuilder(sanityClient);

// Export a function that can be used to get image URLs
export function urlForImage(source: SanityImageSource) {
	return builder.image(source);
}
