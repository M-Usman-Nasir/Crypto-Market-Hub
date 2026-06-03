import { useGetMarketOverview, useGetTrending, useListCoins, getGetMarketOverviewQueryKey, getGetTrendingQueryKey, getListCoinsQueryKey } from "@workspace/api-client-react";
import { formatCurrency, formatCompactNumber, formatPercent } from "@/lib/formatters";
import { SparklineChart } from "@/components/charts/sparkline";
import { SkeletonBlock } from "@/components/ui/loading-blocks";
import { ArrowDown, ArrowUp, Activity, Globe, Flame, TrendingUp, Cpu, Server } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: coins, isLoading: coinsLoading } = useListCoins({ limit: 50 }, { query: { queryKey: getListCoinsQueryKey({ limit: 50 }) } });
  const { data: market, isLoading: marketLoading } = useGetMarketOverview({ query: { queryKey: getGetMarketOverviewQueryKey() } });
  const { data: trending, isLoading: trendingLoading } = useGetTrending({ query: { queryKey: getGetTrendingQueryKey() } });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-700">
      
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4 mb-6">
        <Activity className="text-primary w-6 h-6 animate-pulse" />
        <h1 className="font-serif text-3xl font-bold tracking-widest text-primary shadow-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          Market Terminal
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Main Coin Table */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="glass-panel rounded-lg overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-mono text-sm font-semibold tracking-widest text-white/80">Global assets</h2>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-mono text-xs text-primary">LIVE</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs font-mono text-muted-foreground uppercase bg-white/5">
                  <tr>
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">24h Change</th>
                    <th className="px-6 py-4 text-right hidden md:table-cell">Market Cap</th>
                    <th className="px-6 py-4 hidden sm:table-cell">7d Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {coinsLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><SkeletonBlock className="h-8 w-32" /></td>
                        <td className="px-6 py-4"><SkeletonBlock className="h-6 w-20 ml-auto" /></td>
                        <td className="px-6 py-4"><SkeletonBlock className="h-6 w-16 ml-auto" /></td>
                        <td className="px-6 py-4 hidden md:table-cell"><SkeletonBlock className="h-6 w-24 ml-auto" /></td>
                        <td className="px-6 py-4 hidden sm:table-cell"><SkeletonBlock className="h-8 w-24" /></td>
                      </tr>
                    ))
                  ) : (
                    coins?.map((coin) => {
                      const isPositive = (coin.price_change_percentage_24h || 0) >= 0;
                      return (
                        <tr key={coin.id} className="hover:bg-white/5 transition-colors group cursor-pointer relative">
                          <td className="px-6 py-4">
                            <Link href={`/coin/${coin.id}`} className="absolute inset-0 z-10" />
                            <div className="flex items-center gap-3">
                              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full ring-1 ring-white/10 group-hover:ring-primary/50 transition-all" />
                              <div>
                                <div className="font-bold text-white group-hover:text-primary transition-colors">{coin.name}</div>
                                <div className="text-xs font-mono text-muted-foreground uppercase">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-mono font-medium">
                            {formatCurrency(coin.current_price, coin.current_price < 1 ? 4 : 2)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className={cn(
                              "inline-flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded bg-black/20",
                              isPositive ? "text-success border border-success/20" : "text-destructive border border-destructive/20"
                            )}>
                              {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                              {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-mono text-muted-foreground hidden md:table-cell">
                            {formatCompactNumber(coin.market_cap)}
                          </td>
                          <td className="px-6 py-2 hidden sm:table-cell w-32">
                            <SparklineChart 
                              data={coin.sparkline_in_7d?.price} 
                              color={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Market Overview & Trending */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          
          {/* Market Overview */}
          <div className="glass-panel rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Globe className="w-32 h-32" />
            </div>
            
            <h3 className="font-mono text-sm font-semibold tracking-widest text-primary mb-6 flex items-center gap-2">
              <Server className="w-4 h-4" />
              System status
            </h3>

            {marketLoading ? (
              <div className="space-y-4">
                <SkeletonBlock className="h-16 w-full" />
                <SkeletonBlock className="h-16 w-full" />
                <SkeletonBlock className="h-16 w-full" />
              </div>
            ) : market ? (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-1">Total market cap</div>
                  <div className="text-2xl font-sans font-bold text-white tracking-tight">
                    {formatCompactNumber(market.total_market_cap_usd)}
                  </div>
                  <div className={cn(
                    "text-xs font-mono mt-1 flex items-center gap-1",
                    market.market_cap_change_percentage_24h >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {market.market_cap_change_percentage_24h >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(market.market_cap_change_percentage_24h).toFixed(2)}% (24H)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded p-3 border border-white/5">
                    <div className="text-[10px] font-mono text-muted-foreground mb-1">24h volume</div>
                    <div className="text-sm font-mono text-white">{formatCompactNumber(market.total_volume_usd)}</div>
                  </div>
                  <div className="bg-black/20 rounded p-3 border border-white/5">
                    <div className="text-[10px] font-mono text-muted-foreground mb-1">Active assets</div>
                    <div className="text-sm font-mono text-white">{market.active_cryptocurrencies.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono text-muted-foreground">Dominance index</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-white">BTC</span>
                        <span className="text-primary">{market.btc_dominance.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${market.btc_dominance}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-white">ETH</span>
                        <span className="text-[#627EEA]">{market.eth_dominance.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#627EEA]" style={{ width: `${market.eth_dominance}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Trending */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="font-mono text-sm font-semibold tracking-widest text-primary mb-6 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Hot targets
            </h3>

            <div className="space-y-4">
              {trendingLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-12 w-full" />
                ))
              ) : (
                trending?.map((coin) => (
                  <Link key={coin.id} href={`/coin/${coin.id}`}>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{coin.symbol}</div>
                          <div className="text-[10px] font-mono text-muted-foreground truncate w-24">{coin.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-white">
                          #{coin.market_cap_rank || "?"}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          Rank
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
