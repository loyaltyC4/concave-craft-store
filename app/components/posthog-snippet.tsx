// app/components/posthog-snippet.tsx — no-op placeholder.
//
// The actual PostHog posthog-js loader lives in app/layout.tsx as a raw inline
// script (same pattern as the GA4 bootstrap there, for the same reason: it must
// execute during HTML parse, before any React effect fires events). This file
// is kept so imports have a stable path if the loader is ever extracted.
export default function PosthogSnippet() {
  return null;
}
