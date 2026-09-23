import { PROXY_HOSTS } from "lib/image-proxy";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ host: string; path: string[] }> },
) {
  const { host, path } = await params;
  const upstreamHost = PROXY_HOSTS[host];
  if (!upstreamHost || !path?.length) {
    return new Response("Not found", { status: 404 });
  }
  const upstream = await fetch(
    `https://${upstreamHost}/${path.map(encodeURIComponent).join("/")}`,
    { headers: { "user-agent": "Mozilla/5.0 (FingerboardLab image cache)" } },
  );
  const type = upstream.headers.get("content-type") || "";
  if (!upstream.ok || !type.startsWith("image/")) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(upstream.body, {
    headers: {
      "Content-Type": type,
      "Cache-Control":
        "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
