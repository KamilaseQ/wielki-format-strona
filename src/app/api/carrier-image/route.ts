const UPSTREAM_ORIGIN = "http://billboard.wielkiformat.pl";
const UPSTREAM_PATH_PREFIX = "/billboards/";
const UPSTREAM_TIMEOUT_MS = 12_000;
const UPSTREAM_ATTEMPTS = 2;

function resolveUpstreamUrl(path: string | null): URL | null {
  if (!path || path.length > 2048 || !path.startsWith(UPSTREAM_PATH_PREFIX)) {
    return null;
  }

  const url = new URL(path, UPSTREAM_ORIGIN);
  if (
    url.origin !== UPSTREAM_ORIGIN ||
    !url.pathname.startsWith(UPSTREAM_PATH_PREFIX)
  ) {
    return null;
  }

  return url;
}

async function fetchUpstreamImage(url: URL): Promise<Response | null> {
  for (let attempt = 0; attempt < UPSTREAM_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
      const contentType = response.headers.get("content-type") ?? "";

      if (response.ok && contentType.toLowerCase().startsWith("image/")) {
        return response;
      }

      await response.body?.cancel();
    } catch {
      // Retry transient errors from the legacy image server.
    }
  }

  return null;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const upstreamUrl = resolveUpstreamUrl(requestUrl.searchParams.get("path"));

  if (!upstreamUrl) {
    return new Response("Invalid image path.", { status: 400 });
  }

  const upstreamResponse = await fetchUpstreamImage(upstreamUrl);
  if (!upstreamResponse) {
    return new Response("Image is temporarily unavailable.", {
      status: 502,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const headers = new Headers({
    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    "Content-Type":
      upstreamResponse.headers.get("content-type") ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
  });

  for (const name of ["content-length", "etag", "last-modified"]) {
    const value = upstreamResponse.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new Response(upstreamResponse.body, {
    status: 200,
    headers,
  });
}
