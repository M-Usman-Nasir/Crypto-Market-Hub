/** Minimal CoinGecko API shapes used by market routes. */

export interface CoinGeckoCoinDetail {
  id: string;
  symbol: string;
  name: string;
  image?: { large?: string; small?: string };
  description?: { en?: string };
  market_cap_rank?: number;
  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    total_volume?: { usd?: number };
    price_change_percentage_24h?: number | null;
    price_change_percentage_7d?: number | null;
    price_change_percentage_30d?: number | null;
    ath?: { usd?: number | null };
    atl?: { usd?: number | null };
    circulating_supply?: number | null;
    total_supply?: number | null;
    sparkline_7d?: { price?: number[] } | null;
  };
  links?: { homepage?: string[] };
}

export interface CoinGeckoGlobalResponse {
  data?: {
    total_market_cap?: { usd?: number };
    total_volume?: { usd?: number };
    market_cap_percentage?: { btc?: number; eth?: number };
    market_cap_change_percentage_24h_usd?: number;
    active_cryptocurrencies?: number;
    markets?: number;
  };
}

export interface CoinGeckoTrendingItem {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank?: number | null;
    thumb: string;
    score: number;
    price_btc?: number | null;
  };
}

export interface CoinGeckoTrendingResponse {
  coins?: CoinGeckoTrendingItem[];
}
