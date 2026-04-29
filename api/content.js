export const config = { runtime: "edge" };

const ORIGIN = "https://api.dnstt.art";

const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
  "x-vercel-id",
  "x-vercel-trace",
  "x-vercel-ip",
]);

export default async function handler(req) {
  const slash = req.url.indexOf("/", 8);
  const upstream =
    slash === -1 ? ORIGIN + "/" : ORIGIN + req.url.slice(slash);

  const headers = new Headers();
  let ip = "";

  for (const [k, v] of req.headers) {
    if (k === "x-real-ip") { ip = v; continue; }
    if (k === "x-forwarded-for") { if (!ip) ip = v; continue; }
    if (!HOP_BY_HOP.has(k)) headers.set(k, v);
  }

  if (ip) headers.set("x-forwarded-for", ip);

  const method = req.method;

  try {
    return await fetch(upstream, {
      method,
      headers,
      body: method === "GET" || method === "HEAD" ? undefined : req.body,
      duplex: "half",
      redirect: "manual",
    });
  } catch {
    return new Response(JSON.stringify({ error: "Service unavailable" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
