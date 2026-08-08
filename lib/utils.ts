import { ReadonlyURLSearchParams } from "next/navigation";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  // Fingerboard Lab runs on a bundled static catalog + Stripe checkout — no Shopify
  // credentials are required for the storefront to build or run.
  const requiredEnvironmentVariables: string[] = [];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n",
      )}\n`,
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
  ) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.",
    );
  }
};

/**
 * Build a page <title> that survives Google's ~60-character truncation.
 *
 * The global metadata template appends " | Fingerboard Lab" to every title,
 * which pushed 149 of 154 product titles past 60 characters and got them
 * truncated in the SERP. This appends the brand only when it actually fits,
 * and returns an absolute title so the template cannot double it up.
 */
export const BRAND_SUFFIX = " | Fingerboard Lab";

export function pageTitle(title: string, limit = 60): { absolute: string } {
  const clean = title.replace(/\s*\|\s*Fingerboard Lab\s*$/i, "").trim();
  const withBrand = `${clean}${BRAND_SUFFIX}`;
  return { absolute: withBrand.length <= limit ? withBrand : clean };
}
