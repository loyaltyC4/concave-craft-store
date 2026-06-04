/**
 * Static data layer — serves product/collection data from bundled JSON files.
 * Used automatically when SHOPIFY_STOREFRONT_ACCESS_TOKEN is not configured.
 * No API tokens required. Zero external requests.
 */
import { readFileSync } from "fs";
import { join } from "path";
import type { Collection, Product } from "./types";

// ── Helpers ─────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

let _products: any[] | null = null;
let _collections: any[] | null = null;

function loadProducts(): any[] {
  if (!_products) {
    const raw = readFileSync(join(process.cwd(), "data/products.json"), "utf-8");
    _products = JSON.parse(raw).products ?? [];
  }
  return _products!;
}

function loadCollections(): any[] {
  if (!_collections) {
    const raw = readFileSync(join(process.cwd(), "data/collections.json"), "utf-8");
    _collections = JSON.parse(raw).collections ?? [];
  }
  return _collections!;
}

// ── Transformers ─────────────────────────────────────────────────────────────

export function restProductToProduct(p: any): Product {
  const prices = (p.variants ?? [])
    .map((v: any) => parseFloat(v.price ?? "0"))
    .filter((n: number) => !isNaN(n));
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const images = (p.images ?? []).map((img: any) => ({
    url: img.src,
    altText: img.alt || p.title,
    width: img.width ?? 800,
    height: img.height ?? 800,
  }));

  const variants = (p.variants ?? []).map((v: any) => {
    const selectedOptions = [
      p.options?.[0] && v.option1
        ? { name: p.options[0].name, value: v.option1 }
        : null,
      p.options?.[1] && v.option2
        ? { name: p.options[1].name, value: v.option2 }
        : null,
      p.options?.[2] && v.option3
        ? { name: p.options[2].name, value: v.option3 }
        : null,
    ].filter(Boolean) as { name: string; value: string }[];

    return {
      id: `gid://shopify/ProductVariant/${v.id}`,
      title: v.title,
      availableForSale: v.available !== false,
      selectedOptions,
      price: { amount: v.price ?? "0.00", currencyCode: "USD" },
    };
  });

  const tags =
    typeof p.tags === "string"
      ? p.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(p.tags)
        ? p.tags
        : [];

  return {
    id: `gid://shopify/Product/${p.id}`,
    handle: p.handle,
    availableForSale: p.status === "active",
    title: p.title,
    description: stripHtml(p.body_html ?? ""),
    descriptionHtml: p.body_html ?? "",
    options: (p.options ?? []).map((o: any) => ({
      id: `gid://shopify/ProductOption/${o.id}`,
      name: o.name,
      values: o.values ?? [],
    })),
    priceRange: {
      minVariantPrice: { amount: minPrice.toFixed(2), currencyCode: "USD" },
      maxVariantPrice: { amount: maxPrice.toFixed(2), currencyCode: "USD" },
    },
    variants,
    featuredImage: images[0] ?? { url: "", altText: "", width: 0, height: 0 },
    images,
    seo: {
      title: p.title,
      description: stripHtml(p.body_html ?? "").slice(0, 160),
    },
    tags,
    updatedAt: p.updated_at ?? new Date().toISOString(),
  };
}

export function restCollectionToCollection(c: any): Collection {
  return {
    handle: c.handle,
    title: c.title,
    description: stripHtml(c.body_html ?? ""),
    seo: {
      title: c.title,
      description: stripHtml(c.body_html ?? "").slice(0, 160),
    },
    updatedAt: c.updated_at ?? new Date().toISOString(),
    path: `/search/${c.handle}`,
  };
}

// ── Public API (mirrors lib/shopify/index.ts exports) ────────────────────────

export function staticGetProducts({
  query,
  sortKey,
  reverse,
}: {
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Product[] {
  let products = loadProducts()
    .filter((p: any) => p.status === "active")
    .map(restProductToProduct);

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
  const p = loadProducts().find((p: any) => p.handle === handle);
  return p ? restProductToProduct(p) : undefined;
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
  const rest = loadCollections()
    .filter((c: any) => !c.handle.startsWith("hidden"))
    .map(restCollectionToCollection);
  return [all, ...rest];
}

export function staticGetCollectionProducts(handle: string): Product[] {
  // Without a collection-products map from Shopify, fall back to tag-matching
  const colls = loadCollections();
  const coll = colls.find((c: any) => c.handle === handle);
  if (!coll) return [];

  // Use the collection title as a tag/type filter (best-effort)
  const keyword = coll.title.toLowerCase();
  return loadProducts()
    .filter(
      (p: any) =>
        p.status === "active" &&
        (p.product_type?.toLowerCase().includes(keyword) ||
          (typeof p.tags === "string"
            ? p.tags.toLowerCase().includes(keyword)
            : (p.tags ?? []).some((t: string) =>
                t.toLowerCase().includes(keyword)
              )))
    )
    .map(restProductToProduct);
}

export function staticGetMenu(handle: string) {
  if (handle === "next-js-frontend-header-menu") {
    return [
      { title: "All", path: "/search" },
      ...loadCollections()
        .filter((c: any) => !c.handle.startsWith("hidden"))
        .map((c: any) => ({
          title: c.title,
          path: `/search/${c.handle}`,
        })),
    ];
  }
  return [];
}
