import { Router } from "express";
import {
  ListCoinsQueryParams,
  GetCoinParams,
} from "@workspace/api-zod";

const router = Router();

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

// Simple in-memory cache to respect CoinGecko free tier rate limits
const cache = new Map<string, { data: unknown; expiresAt: number }>();

function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: unknown, ttlMs: number) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

async function cgFetch(url: string) {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`CoinGecko error: ${res.status}`);
  }
  return res.json();
}

// GET /api/coins — cache 60 seconds
router.get("/coins", async (req, res) => {
  const parsed = ListCoinsQueryParams.safeParse(req.query);
  const limit = parsed.success ? (parsed.data.limit ?? 50) : 50;
  const currency = parsed.success ? (parsed.data.currency ?? "usd") : "usd";
  const cacheKey = `coins:${currency}:${limit}`;

  const cached = getCache(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const data = await cgFetch(
      `${COINGECKO_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`
    );
    setCache(cacheKey, data, 60_000);
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch coins");
    res.status(502).json({ error: "Failed to fetch market data" });
  }
});

// GET /api/coins/:id — cache 60 seconds
router.get("/coins/:id", async (req, res) => {
  const parsed = GetCoinParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }

  const cacheKey = `coin:${parsed.data.id}`;
  const cached = getCache(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const data = await cgFetch(
      `${COINGECKO_BASE}/coins/${parsed.data.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
    );

    const marketData = data.market_data ?? {};
    const coin = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.large ?? data.image?.small ?? "",
      description: data.description?.en ?? null,
      current_price: marketData.current_price?.usd ?? 0,
      market_cap: marketData.market_cap?.usd ?? 0,
      market_cap_rank: data.market_cap_rank ?? 0,
      total_volume: marketData.total_volume?.usd ?? 0,
      price_change_percentage_24h: marketData.price_change_percentage_24h ?? null,
      price_change_percentage_7d: marketData.price_change_percentage_7d ?? null,
      price_change_percentage_30d: marketData.price_change_percentage_30d ?? null,
      ath: marketData.ath?.usd ?? null,
      atl: marketData.atl?.usd ?? null,
      circulating_supply: marketData.circulating_supply ?? null,
      total_supply: marketData.total_supply ?? null,
      sparkline_in_7d: data.market_data?.sparkline_7d ?? null,
      homepage: data.links?.homepage?.[0] ?? null,
    };

    setCache(cacheKey, coin, 60_000);
    res.json(coin);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch coin");
    res.status(502).json({ error: "Failed to fetch coin data" });
  }
});

// GET /api/market-overview — cache 90 seconds
router.get("/market-overview", async (req, res) => {
  const cacheKey = "market-overview";
  const cached = getCache(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const data = await cgFetch(`${COINGECKO_BASE}/global`);
    const d = data.data ?? {};

    const overview = {
      total_market_cap_usd: d.total_market_cap?.usd ?? 0,
      total_volume_usd: d.total_volume?.usd ?? 0,
      btc_dominance: d.market_cap_percentage?.btc ?? 0,
      eth_dominance: d.market_cap_percentage?.eth ?? 0,
      market_cap_change_percentage_24h: d.market_cap_change_percentage_24h_usd ?? 0,
      active_cryptocurrencies: d.active_cryptocurrencies ?? 0,
      markets: d.markets ?? 0,
    };

    setCache(cacheKey, overview, 90_000);
    res.json(overview);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch market overview");
    res.status(502).json({ error: "Failed to fetch market overview" });
  }
});

// GET /api/trending — cache 5 minutes
router.get("/trending", async (req, res) => {
  const cacheKey = "trending";
  const cached = getCache(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const data = await cgFetch(`${COINGECKO_BASE}/search/trending`);
    const coins = (data.coins ?? []).slice(0, 10).map((item: any) => ({
      id: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      market_cap_rank: item.item.market_cap_rank ?? null,
      thumb: item.item.thumb,
      score: item.item.score,
      price_btc: item.item.price_btc ?? null,
    }));

    setCache(cacheKey, coins, 300_000);
    res.json(coins);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch trending");
    res.status(502).json({ error: "Failed to fetch trending coins" });
  }
});

export default router;
