export async function apiServer<T>(
  api: string,
  options: RequestInit & { body?: any } = {},
): Promise<T> {
  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${api}`;

  const res = await fetch(fullUrl, {
    ...options,
    body,
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
