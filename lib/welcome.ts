import { WELCOME_COOKIE, GIFT_COOKIE } from "lib/brand";

export function setWelcomeCookie() {
  try {
    document.cookie = `${WELCOME_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 60}; samesite=lax`;
  } catch {}
}
export function hasWelcomeCookie(): boolean {
  try {
    return document.cookie.split("; ").some((c) => c === `${WELCOME_COOKIE}=1`);
  } catch {
    return false;
  }
}
export function setGiftCookie(handle: string) {
  try {
    document.cookie = `${GIFT_COOKIE}=${encodeURIComponent(handle)}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  } catch {}
}
export function readGiftCookie(): string | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${GIFT_COOKIE}=([^;]*)`));
    return m ? decodeURIComponent(m[1]!) : null;
  } catch {
    return null;
  }
}
