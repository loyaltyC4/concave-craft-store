# taobao-scraper

Stealth renderer for Taobao/1688 listings, deployed on Railway. Uses CloakBrowser
(source-patched Chromium) to load listing pages and hand back rendered HTML, so
sourcing for the fingerboard store doesn't depend on Taobao-blocking datacenter
scrapers.

Endpoints:
- `GET /health`
- `POST /render` `{url, wait_ms?, full?}` → rendered HTML
- `POST /login` `{user, password}` → best-effort Taobao password login, saves
  storage state to the /data volume; reports if slider/SMS verification is required.

Credentials live in Railway service variables, never in the repo.
