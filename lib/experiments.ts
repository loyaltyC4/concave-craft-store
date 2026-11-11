/**
 * A/B experiments (started 2026-11-11 on branch cro-tests-nov11).
 *
 * Two independent 50/50 tests, assigned per browser and kept for 90 days:
 *
 *   exp_theme      "dark" (control) | "light"
 *                  Sitewide colour theme. Measured on product pages and the
 *                  cart: view_item -> add_to_cart -> begin_checkout -> purchase.
 *   exp_home_hero  "lanes" (control) | "showcase"
 *                  Home page hero. "showcase" leads with one proven seller
 *                  (adapted from the 21st.dev "Featured Product Showcase").
 *
 * Why an inline <head> script instead of middleware or server rendering:
 * the home and product pages are statically cached (revalidate=300), so the
 * server cannot read a per-visitor cookie. The script runs before first
 * paint, sets data-theme / data-hero on <html>, and CSS shows the right
 * version, so there is no flash of the wrong one.
 *
 * QA override: add ?exp_theme=light or ?exp_home_hero=showcase (or the
 * control values) to any URL. The choice is saved to the cookie.
 *
 * Analytics: after posthog.init the layout calls posthog.register(...) with
 * both values, so every PostHog event carries exp_theme and exp_home_hero.
 * Split any funnel by those properties.
 */

export const EXPERIMENTS = {
  exp_theme: ["dark", "light"],
  exp_home_hero: ["lanes", "showcase"],
} as const;

export type ExperimentName = keyof typeof EXPERIMENTS;

const COOKIE_DAYS = 90;

/** Inline script for <head>. Keep it tiny, dependency-free and try/catch'd. */
export const EXPERIMENT_BOOT_SCRIPT = `(function(){try{
var E=${JSON.stringify(EXPERIMENTS)},d=document,h=d.documentElement,q=new URLSearchParams(location.search),out={};
function rc(n){var m=d.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}
function wc(n,v){d.cookie=n+'='+encodeURIComponent(v)+'; path=/; max-age=${COOKIE_DAYS * 86400}; SameSite=Lax'}
for(var n in E){var opts=E[n],v=q.get(n);
if(!v||opts.indexOf(v)<0){v=rc(n)}
if(!v||opts.indexOf(v)<0){v=opts[Math.random()<0.5?0:1]}
wc(n,v);out[n]=v}
h.setAttribute('data-theme',out.exp_theme);
h.setAttribute('data-hero',out.exp_home_hero);
if(out.exp_theme==='light'){h.classList.remove('dark');h.style.colorScheme='light'}
window.__flExp=out;
}catch(e){}})();`;

/**
 * Snippet run right after posthog.init, so every event carries the
 * variants. Reads window.__flExp set by the boot script.
 */
export const EXPERIMENT_POSTHOG_REGISTER =
  "try{if(window.__flExp){window.posthog.register(window.__flExp)}}catch(_){}";
