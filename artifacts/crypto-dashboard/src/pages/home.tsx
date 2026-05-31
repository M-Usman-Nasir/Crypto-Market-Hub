import { Link } from "wouter";
import { useListCoins, useGetMarketOverview, getListCoinsQueryKey, getGetMarketOverviewQueryKey } from "@workspace/api-client-react";
import { SparklineChart } from "@/components/charts/sparkline";
import { formatCurrency, formatCompactNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import {
  Activity, ArrowUp, ArrowDown, BarChart2, Shield, Zap,
  Globe, TrendingUp, ChevronRight, Terminal, Layers, Radio
} from "lucide-react";

const FEATURE_CARDS = [
  {
    icon: Terminal,
    title: "LIVE_MARKET_TERMINAL",
    desc: "Real-time price feeds, sparklines, and market cap rankings for the top 50 assets — refreshed continuously.",
  },
  {
    icon: BarChart2,
    title: "DEEP_ASSET_INTELLIGENCE",
    desc: "Per-coin drill-downs: 7-day price trajectory, ATH distance, supply metrics, and full token background.",
  },
  {
    icon: Globe,
    title: "GLOBAL_DOMINANCE_INDEX",
    desc: "BTC and ETH market dominance bars, total market cap shift, and 24h volume — at a glance.",
  },
  {
    icon: Radio,
    title: "TRENDING_HOT_TARGETS",
    desc: "CoinGecko's live trending index surfaced in the sidebar so momentum shifts never go unnoticed.",
  },
  {
    icon: Layers,
    title: "API_EXPANSION_READY",
    desc: "Built on a modular Express backend — new data sources, webhooks, or trading APIs plug straight in.",
  },
  {
    icon: Shield,
    title: "FUTURE_MODULE_PIPELINE",
    desc: "AI sentiment scoring, multi-chain portfolio tracking, and algorithmic alert webhooks coming next.",
  },
];

const STATS = [
  { label: "ASSETS_TRACKED", value: "50+" },
  { label: "DATA_SOURCES", value: "Live" },
  { label: "LATENCY", value: "<1s" },
  { label: "UPTIME_TARGET", value: "99.9%" },
];

export default function Home() {
  const { data: coins } = useListCoins({ limit: 5 }, { query: { queryKey: getListCoinsQueryKey({ limit: 5 }) } });
  const { data: market } = useGetMarketOverview({ query: { queryKey: getGetMarketOverviewQueryKey() } });

  return (
    <div className="relative overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#1C0AC8]/10 blur-[120px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-primary/5 blur-[100px] rounded-full" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-xs tracking-widest animate-in fade-in duration-500">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LIVE_MARKET_DATA_ONLINE
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-none animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-white">THE NEXT-GEN</span>
            <br />
            <span
              className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary))]"
              style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.5)" }}
            >
              CRYPTO TERMINAL
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Institutional-grade market intelligence wrapped in a futuristic interface.
            Real prices. Live trends. Zero noise.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <Link href="/dashboard">
              <button
                data-testid="button-launch-terminal"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-md bg-primary text-background font-mono font-bold tracking-widest text-sm transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 active:scale-100"
              >
                <Activity className="w-4 h-4" />
                LAUNCH_TERMINAL
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="/about">
              <button
                data-testid="button-learn-more"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-md border border-white/10 text-white font-mono font-bold tracking-widest text-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Zap className="w-4 h-4" />
                LEARN_MORE
              </button>
            </Link>
          </div>
        </div>

        {/* Live preview strip */}
        {coins && coins.length > 0 && (
          <div className="relative z-10 mt-20 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="glass-panel rounded-xl overflow-hidden border border-primary/10 shadow-[0_0_40px_rgba(0,240,255,0.06)]">
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-primary/5">
                <span className="font-mono text-xs tracking-widest text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  LIVE_PREVIEW — TOP_ASSETS
                </span>
                <Link href="/dashboard">
                  <span className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                    VIEW_ALL <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {coins.map((coin) => {
                  const pos = (coin.price_change_percentage_24h || 0) >= 0;
                  return (
                    <Link key={coin.id} href={`/coin/${coin.id}`}>
                      <div
                        data-testid={`row-hero-coin-${coin.id}`}
                        className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-4 w-40 md:w-48">
                          <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{coin.name}</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="hidden sm:block w-28">
                          <SparklineChart data={coin.sparkline_in_7d?.price} color={pos ? "hsl(var(--success))" : "hsl(var(--destructive))"} height={40} />
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm font-medium text-white">
                            {formatCurrency(coin.current_price, coin.current_price < 1 ? 4 : 2)}
                          </div>
                          <div className={cn(
                            "font-mono text-xs flex items-center justify-end gap-0.5 mt-0.5",
                            pos ? "text-success" : "text-destructive"
                          )}>
                            {pos ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── MARKET STATS BAR ─────────────────────────────────── */}
      {market && (
        <section className="border-y border-white/5 bg-black/20 py-6 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "TOTAL_MARKET_CAP", value: formatCompactNumber(market.total_market_cap_usd), change: market.market_cap_change_percentage_24h },
                { label: "24H_VOLUME", value: formatCompactNumber(market.total_volume_usd), change: null },
                { label: "BTC_DOMINANCE", value: `${market.btc_dominance.toFixed(1)}%`, change: null },
                { label: "ACTIVE_ASSETS", value: market.active_cryptocurrencies.toLocaleString(), change: null },
              ].map((stat) => (
                <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase()}`}>
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">{stat.label}</div>
                  <div className="font-mono text-lg font-bold text-white">{stat.value}</div>
                  {stat.change !== null && (
                    <div className={cn(
                      "font-mono text-xs flex items-center justify-center gap-0.5 mt-0.5",
                      stat.change >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {stat.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(stat.change).toFixed(2)}% (24H)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/4 blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="font-mono text-xs tracking-[0.3em] text-primary uppercase">PLATFORM_CAPABILITIES</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">
              BUILT FOR PRECISION
            </h2>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto">
              Every feature is engineered for signal over noise. No distractions. Pure market intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  data-testid={`card-feature-${card.title}`}
                  className="glass-panel p-6 rounded-xl group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-mono text-sm font-bold text-white mb-2 tracking-wider">{card.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="py-16 px-4 border-y border-white/5 bg-primary/3 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "100% 24px",
          }}
        />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label} data-testid={`stat-platform-${s.label.toLowerCase()}`}>
                <div
                  className="text-4xl md:text-5xl font-bold font-mono text-primary mb-2"
                  style={{ textShadow: "0 0 20px hsl(var(--primary) / 0.4)" }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/8 blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10 space-y-8">
          <div className="font-mono text-xs tracking-[0.3em] text-primary">ACCESS_TERMINAL</div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
            SEE THE MARKET<br />
            <span className="text-primary">AS IT REALLY IS</span>
          </h2>
          <p className="text-muted-foreground font-sans text-lg max-w-xl mx-auto">
            Join the next generation of crypto market participants who demand clarity over clutter.
          </p>
          <Link href="/dashboard">
            <button
              data-testid="button-cta-terminal"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-md bg-primary text-background font-mono font-bold tracking-widest text-sm transition-all hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:scale-105 active:scale-100"
            >
              <TrendingUp className="w-5 h-5" />
              OPEN_THE_TERMINAL
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
