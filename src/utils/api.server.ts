export async function apiServer<T>(
  api: string,
  options: RequestInit & { body?: any } = {},
): Promise<T> {
  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${api}`;

  try {
    const res = await fetch(fullUrl, {
      ...options,
      body,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; NextJS/14.0; +https://nextjs.org)",
        Accept: "application/json",
        ...options.headers,
      },
      cache: options.cache || "no-store",
    });

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(
        error.message || `API Error: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error(`API Server Error - URL: ${fullUrl}`, error);
    throw new Error(
      `Failed to fetch from ${fullUrl}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
