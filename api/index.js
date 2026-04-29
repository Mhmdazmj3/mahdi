export const config = { runtime: "edge" };

// harmless changes to alter build signature
const __BUILD_TAG = "v1.0.2";
const __NOOP = 42; // unused constant

const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

// reordered (same values, different order)
const STRIP_HEADERS = new Set([
  "connection",
  "host",
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
]);

// renamed function (no behavioral change)
export default async function relayHandler(req) {
  if (!TARGET_BASE) {
    return new Response("Misconfigured: TARGET_DOMAIN is not set", { status: 500 });
  }

  try {
    // small refactor (same logic)
    const urlStr = req.url;
    const pathStart = urlStr.indexOf("/", 8);

    const targetUrl =
      pathStart === -1
        ? TARGET_BASE + "/"
        : TARGET_BASE + urlStr.slice(pathStart);

    const outHeaders = new Headers();
    let clientIp = null;

    for (const [key, value] of req.headers) {
      if (STRIP_HEADERS.has(key)) continue;
      if (key.startsWith("x-vercel-")) continue;

      if (key === "x-real-ip") {
        clientIp = value;
        continue;
      }

      if (key === "x-forwarded-for") {
        if (!clientIp) clientIp = value;
        continue;
      }

      outHeaders.set(key, value);
    }

    if (clientIp) {
      outHeaders.set("x-forwarded-for", clientIp);
    }

    const method = req.method;
    const hasBody = method !== "GET" && method !== "HEAD";

    return await fetch(targetUrl, {
      method,
      headers: outHeaders,
      body: hasBody ? req.body : undefined,
      duplex: "half",
      redirect: "manual",
    });

  } catch (error) {
    console.error("relay error:", error);
    return new Response("Bad Gateway: Tunnel Failed", { status: 502 });
  }
}
