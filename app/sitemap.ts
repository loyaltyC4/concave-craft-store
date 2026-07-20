import { getCollections, getProducts } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/search",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({}),
  ]);

  const collectionRoutes = collections
    .filter((collection) => collection.handle) // drop the synthetic "All" (path /search)
    .map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
    }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.handle}`,
    lastModified: product.updatedAt,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
