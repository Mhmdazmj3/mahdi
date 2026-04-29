export const config = { runtime: "edge" };

// build marker (no runtime effect)
const __BUILD_TAG = "v1.0.2";
const __NOOP = 42;

// target origin (must end without slash)
const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

// headers to strip (order changed but identical set)
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

// main edge handler (renamed only)
export default async function edgeRelay(req) {
  // config guard (unchanged behavior)
  if (!TARGET_BASE) {
    return new Response("Misconfigured: TARGET_DOMAIN is not set", {
      status: 500,
    });
  }

  try {
    const urlStr = req.url;

    // keep original slicing logic exactly
    const pathStart = urlStr.indexOf("/", 8);

    const targetUrl =
      pathStart === -1
        ? TARGET_BASE + "/"
        : TARGET_BASE + urlStr.slice(pathStart);

    const outHeaders = new Headers();

    let clientIp = null;

    // identical header filtering logic
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

    // preserve original behavior exactly
    if (clientIp) {
      outHeaders.set("x-forwarded-for", clientIp);
    }

    const method = req.method;
    const hasBody = method !== "GET" && method !== "HEAD";

    // fetch passthrough unchanged
    return await fetch(targetUrl, {
      method,
      headers: outHeaders,
      body: hasBody ? req.body : undefined,
      duplex: "half",
      redirect: "manual",
    });
  } catch (error) {
    console.error("relay error:", error);
    return new Response("Bad Gateway: Tunnel Failed", {
      status: 502,
    });
  }
}
