const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const cache = new Map<string, { data: unknown; expiresAt: number }>();

export class CoinGeckoError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`CoinGecko error: ${status}`);
    this.status = status;
  }
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": "Crypto-Market-Hub/1.0",
  };

  const apiKey = process.env.COINGECKO_API_KEY?.trim();
  if (apiKey) {
    const headerName =
      process.env.COINGECKO_API_KEY_TYPE === "pro"
        ? "x-cg-pro-api-key"
        : "x-cg-demo-api-key";
    headers[headerName] = apiKey;
  }

  return headers;
}

export function getCache<T>(key: string, stale = false): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (!stale && Date.now() > entry.expiresAt) return null;
  return entry.data as T;
}

export function setCache(key: string, data: unknown, ttlMs: number) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export async function cgFetch<T>(path: string): Promise<T> {
  const url = path.startsWith("http") ? path : `${COINGECKO_BASE}${path}`;
  const headers = buildHeaders();
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, { headers });

    if (res.ok) {
      return res.json() as Promise<T>;
    }

    const retryable = res.status === 429 || res.status >= 500;
    if (retryable && attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      continue;
    }

    throw new CoinGeckoError(res.status);
  }

  throw new CoinGeckoError(502);
}
