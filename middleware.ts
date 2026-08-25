import { NextRequest, NextResponse } from "next/server";

/**
 * SEO middleware — canonical-host enforcement.
 *
 * Two behaviours, applied only when the request host ends with .vercel.app:
 *
 * 1. X-Robots-Tag: noindex, nofollow — prevents Googlebot from indexing
 *    preview / legacy Vercel deployment URLs regardless of whether the
 *    redirect below fires.
 *
 * 2. 301 redirect to the equivalent path on https://fingerboardlab.com —
 *    consolidates any residual PageRank / backlinks that still hit the
 *    legacy concave-craft-store.vercel.app host.
 *
 * Safety notes:
 * - We check x-forwarded-host first (set by Vercel's edge) then fall back
 *   to the Host header, so the logic is accurate even behind a proxy.
 * - Vercel's internal health-check pings use the deployment URL but also
 *   set x-vercel-deployment-url; we skip the redirect for those so the
 *   deploy pipeline is never blocked.
 * - next.config.ts already has redirects() entries for both www. and
 *   concave-craft-store.vercel.app, but those run AFTER middleware in the
 *   request lifecycle. This middleware adds the noindex header as a second
 *   safety net and catches any other *.vercel.app preview URLs that the
 *   static redirect list doesn't enumerate.
 */
export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host") ?? "";
  const hostHeader = request.headers.get("host") ?? "";
  const effectiveHost = forwardedHost || hostHeader;

  const isVercelApp = effectiveHost.endsWith(".vercel.app");

  if (!isVercelApp) {
    // Canonical host — pass through untouched.
    return NextResponse.next();
  }

  // Vercel's own deployment health-check; never redirect it.
  const isVercelHealthCheck =
    request.headers.has("x-vercel-deployment-url") ||
    request.headers.get("user-agent")?.includes("vercel-healthcheck");

  if (isVercelHealthCheck) {
    const resp = NextResponse.next();
    resp.headers.set("x-robots-tag", "noindex, nofollow");
    return resp;
  }

  // Build canonical URL — preserve path + query string exactly.
  const url = request.nextUrl.clone();
  const destination = `https://fingerboardlab.com${url.pathname}${url.search}`;

  const response = NextResponse.redirect(destination, {
    status: 301,
  });

  // Belt-and-suspenders: set noindex even on the redirect response so that
  // crawlers that follow slowly still get the signal on the first touch.
  response.headers.set("x-robots-tag", "noindex, nofollow");

  return response;
}

export const config = {
  /*
   * Match every route EXCEPT:
   * - Next.js internals (_next/static, _next/image)
   * - Public static files (favicon, robots.txt, sitemap, etc.)
   *
   * This keeps the matcher cheap — middleware only runs on real page /
   * API requests, not asset fetches.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap.*\\.xml).*)",
  ],
};
