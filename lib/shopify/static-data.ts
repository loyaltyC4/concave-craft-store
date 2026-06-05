/**
 * Static data layer — products/collections bundled at build time.
 * Activated automatically when SHOPIFY_STORE_DOMAIN is not set.
 * No API tokens. No network requests. Zero Shopify dependency.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const productsRaw: { products: any[] } = require("../../data/products.json");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const collectionsRaw: { collections: any[] } = require("../../data/collections.json");

import type { Collection, Product } from "./types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// ── Transformers ─────────────────────────────────────────────────────────────

function restProductToProduct(p: any): Product {
  const prices = (p.variants ?? [])
    .map((v: any) => parseFloat(v.price ?? "0"))
    .filter((n: number) => !isNaN(n));
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const images = (p.images ?? []).map((img: any) => ({
    url: img.src as string,
    altText: (img.alt as string) || (p.title as string),
    width: (img.width as number) ?? 800,
    height: (img.height as number) ?? 800,
  }));

  const variants = (p.variants ?? []).map((v: any) => {
    const selectedOptions = (
      [
        p.options?.[0] && v.option1
          ? { name: p.options[0].name as string, value: v.option1 as string }
          : null,
        p.options?.[1] && v.option2
          ? { name: p.options[1].name as string, value: v.option2 as string }
          : null,
        p.options?.[2] && v.option3
          ? { name: p.options[2].name as string, value: v.option3 as string }
          : null,
      ] as (null | { name: string; value: string })[]
    ).filter((x): x is { name: string; value: string } => x !== null);

    return {
      id: `gid://shopify/ProductVariant/${v.id as string}`,
      title: v.title as string,
      availableForSale: v.available !== false,
      selectedOptions,
      price: { amount: (v.price as string) ?? "0.00", currencyCode: "USD" },
    };
  });

  const tags =
    typeof p.tags === "string"
      ? p.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(p.tags)
        ? (p.tags as string[])
        : [];

  return {
    id: `gid://shopify/Product/${p.id as string}`,
    handle: p.handle as string,
    availableForSale: p.status === "active",
    title: p.title as string,
    description: stripHtml((p.body_html as string) ?? ""),
    descriptionHtml: (p.body_html as string) ?? "",
    options: (p.options ?? []).map((o: any) => ({
      id: `gid://shopify/ProductOption/${o.id as string}`,
      name: o.name as string,
      values: (o.values as string[]) ?? [],
    })),
    priceRange: {
      minVariantPrice: { amount: minPrice.toFixed(2), currencyCode: "USD" },
      maxVariantPrice: { amount: maxPrice.toFixed(2), currencyCode: "USD" },
    },
    variants,
    featuredImage: images[0] ?? { url: "", altText: "", width: 0, height: 0 },
    images,
    seo: {
      title: p.title as string,
      description: stripHtml((p.body_html as string) ?? "").slice(0, 160),
    },
    tags,
    updatedAt: (p.updated_at as string) ?? new Date().toISOString(),
  };
}

function restCollectionToCollection(c: any): Collection {
  return {
    handle: c.handle as string,
    title: c.title as string,
    description: stripHtml((c.body_html as string) ?? ""),
    seo: {
      title: c.title as string,
      description: stripHtml((c.body_html as string) ?? "").slice(0, 160),
    },
    updatedAt: (c.updated_at as string) ?? new Date().toISOString(),
    path: `/search/${c.handle as string}`,
  };
}

// ── Cached data ───────────────────────────────────────────────────────────────

const allProducts: Product[] = productsRaw.products
  .filter((p: any) => p.status === "active")
  .map(restProductToProduct);

const allCollections: Collection[] = collectionsRaw.collections
  .filter((c: any) => !c.handle.startsWith("hidden"))
  .map(restCollectionToCollection);

// ── Public API ────────────────────────────────────────────────────────────────

export function staticGetProducts({
  query,
  sortKey,
  reverse,
}: {
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Product[] {
  let products = [...allProducts];

  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (sortKey === "PRICE") {
    products.sort((a, b) => {
      const aP = parseFloat(a.priceRange.minVariantPrice.amount);
      const bP = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? bP - aP : aP - bP;
    });
  } else if (sortKey === "CREATED_AT") {
    products.sort((a, b) =>
      reverse
        ? b.updatedAt.localeCompare(a.updatedAt)
        : a.updatedAt.localeCompare(b.updatedAt)
    );
  }

  return products;
}

export function staticGetProduct(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function staticGetCollections(): Collection[] {
  const all: Collection = {
    handle: "",
    title: "All",
    description: "All products",
    seo: { title: "All", description: "All products" },
    path: "/search",
    updatedAt: new Date().toISOString(),
  };
  return [all, ...allCollections];
}

export function staticGetCollectionProducts(handle: string): Product[] {
  // Special hidden collections used by the homepage — return a spread of products
  if (handle === "hidden-homepage-featured-items") {
    return allProducts.slice(0, 3);
  }
  if (handle === "hidden-homepage-carousel") {
    return allProducts.slice(0, 12);
  }

  const raw = collectionsRaw.collections.find(
    (c: any) => c.handle === handle
  );
  // Fall back to all products if collection not found
  if (!raw) return allProducts.slice(0, 48);

  const keyword = (raw.title as string).toLowerCase();
  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword) ||
      p.tags.some((t) => t.toLowerCase().includes(keyword)) ||
      p.description.toLowerCase().includes(keyword)
  );
  // If keyword filter returns nothing, return all products
  return filtered.length > 0 ? filtered : allProducts.slice(0, 48);
}

export function staticGetMenu(handle: string) {
  if (handle === "next-js-frontend-header-menu") {
    return [
      { title: "All", path: "/search" },
      ...allCollections.map((c) => ({ title: c.title, path: c.path })),
    ];
  }
  if (handle === "next-js-frontend-footer-menu") {
    return [
      { title: "Home", path: "/" },
      { title: "All Products", path: "/search" },
    ];
  }
  return [];
}
