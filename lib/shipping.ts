import {
  DELIVERY_MAX_DAYS,
  DELIVERY_MIN_DAYS,
  FREE_SHIPPING_THRESHOLD,
  HANDLING_DAYS,
  RETURN_WINDOW_DAYS,
  SHIPPING_FEE_USD,
} from "lib/brand";

/** Every country Stripe checkout accepts a shipping address for. */
export const SHIP_COUNTRIES = [
  "US", "CA", "GB", "IE", "AU", "NZ", "DE", "FR", "ES", "IT", "NL", "BE",
  "AT", "CH", "SE", "NO", "DK", "FI", "PT", "PL", "CZ", "SK", "HU", "RO",
  "GR", "LU", "IS", "JP", "KR", "SG", "HK", "MY", "PH", "TH", "ZA", "AE",
  "SA", "IL", "MX", "BR", "CL", "AR",
] as const;

/**
 * Countries we list in Google Merchant Center. KR is excluded: Korean
 * Shopping requires a Korean business registration number we don't have,
 * which disapproves every KR offer.
 */
export const LISTING_COUNTRIES = SHIP_COUNTRIES.filter((c) => c !== "KR");

/** Shipping cost (USD) for a single item at this price. */
export function itemShippingUsd(priceUsd: number): number {
  return priceUsd >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE_USD;
}

/** schema.org OfferShippingDetails for Product JSON-LD. */
export function offerShippingDetails(priceUsd: number) {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: itemShippingUsd(priceUsd).toFixed(2),
      currency: "USD",
    },
    shippingDestination: LISTING_COUNTRIES.map((c) => ({
      "@type": "DefinedRegion",
      addressCountry: c,
    })),
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: HANDLING_DAYS,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: DELIVERY_MIN_DAYS - HANDLING_DAYS,
        maxValue: DELIVERY_MAX_DAYS - HANDLING_DAYS,
        unitCode: "DAY",
      },
    },
  };
}

/** schema.org MerchantReturnPolicy matching /returns. */
export function merchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: LISTING_COUNTRIES,
    returnPolicyCategory:
      "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: RETURN_WINDOW_DAYS,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnShippingFees",
  };
}
