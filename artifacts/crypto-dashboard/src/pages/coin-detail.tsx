import { useGetCoin, getGetCoinQueryKey } from "@workspace/api-client-react";
import { formatCurrency, formatCompactNumber, formatPercent } from "@/lib/formatters";
import { SparklineChart } from "@/components/charts/sparkline";
import { SkeletonBlock } from "@/components/ui/loading-blocks";
import { useParams, Link } from "wouter";
import { ArrowDown, ArrowUp, Activity, Globe, Info, CornerUpLeft, Cpu, Activity as ActivityIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoinDetail() {
  const params = useParams();
  const coinId = params.id as string;
  
  const { data: coin, isLoading } = useGetCoin(coinId, { 
    query: { enabled: !!coinId, queryKey: getGetCoinQueryKey(coinId) } 
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <SkeletonBlock className="h-8 w-24" />
        <SkeletonBlock className="h-40 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonBlock className="h-64 lg:col-span-2" />
          <SkeletonBlock className="h-64" />
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="font-mono text-xl text-destructive mb-4">ERROR: ASSET_NOT_FOUND</div>
        <Link href="/" className="text-primary hover:underline font-mono inline-flex items-center gap-2">
          <CornerUpLeft className="w-4 h-4" /> RETURN_TO_TERMINAL
        </Link>
      </div>
    );
  }

  const isPositive24h = (coin.price_change_percentage_24h || 0) >= 0;
  const isPositive7d = (coin.price_change_percentage_7d || 0) >= 0;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      <Link href="/">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-white/5 px-3 py-1.5 rounded-md border border-white/10 hover:border-primary/50">
          <CornerUpLeft className="w-3 h-3" />
          BACK_TO_TERMINAL
        </div>
      </Link>

      {/* Hero Header */}
      <div className="glass-panel p-6 lg:p-10 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-1 bg-white/5 rounded-2xl border border-white/10">
              <img src={coin.image} alt={coin.name} className="w-20 h-20 rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-bold text-white tracking-tight">{coin.name}</h1>
                <span className="px-2 py-1 rounded bg-primary/20 border border-primary/30 text-primary font-mono text-sm">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="px-2 py-1 rounded bg-white/10 text-white font-mono text-sm">
                  RANK #{coin.market_cap_rank}
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                {coin.homepage && (
                  <a href={coin.homepage} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-3.5 h-3.5" /> WEBSITE
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-sm font-mono text-muted-foreground mb-1">CURRENT_PRICE</div>
            <div className="text-5xl font-bold text-white tracking-tighter mb-2 font-mono drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              {formatCurrency(coin.current_price, coin.current_price < 1 ? 4 : 2)}
            </div>
            <div className="flex items-center lg:justify-end gap-3">
              <div className={cn(
                "inline-flex items-center gap-1 font-mono text-sm font-bold px-2.5 py-1 rounded bg-black/40 shadow-inner",
                isPositive24h ? "text-success border border-success/30 shadow-[0_0_8px_rgba(0,255,0,0.1)]" : "text-destructive border border-destructive/30 shadow-[0_0_8px_rgba(255,0,0,0.1)]"
              )}>
                {isPositive24h ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}% (24H)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Chart & Info) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-panel p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-mono text-sm font-semibold tracking-widest text-primary flex items-center gap-2">
                <ActivityIcon className="w-4 h-4" />
                7D_PRICE_TRAJECTORY
              </h2>
              <div className={cn(
                "font-mono text-xs px-2 py-1 rounded",
                isPositive7d ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}>
                7D: {isPositive7d ? "+" : ""}{(coin.price_change_percentage_7d || 0).toFixed(2)}%
              </div>
            </div>
            
            <div className="pt-4 h-[300px] w-full">
              <SparklineChart 
                data={coin.sparkline_in_7d?.price} 
                height="100%"
                color={isPositive7d ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
              />
            </div>
          </div>

          {coin.description && (
            <div className="glass-panel p-6 rounded-xl">
              <h2 className="font-mono text-sm font-semibold tracking-widest text-primary mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                ASSET_INTELLIGENCE
              </h2>
              <div 
                className="prose prose-invert max-w-none prose-p:text-sm prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline font-sans text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: coin.description }}
              />
            </div>
          )}
        </div>

        {/* Sidebar (Stats) */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-mono text-sm font-semibold tracking-widest text-primary mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              MARKET_METRICS
            </h3>
            
            <div className="space-y-5">
              <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-muted-foreground mb-1">MARKET_CAP</div>
                <div className="text-lg font-mono text-white font-medium">{formatCurrency(coin.market_cap)}</div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-muted-foreground mb-1">24H_VOLUME</div>
                <div className="text-lg font-mono text-white font-medium">{formatCurrency(coin.total_volume)}</div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-muted-foreground mb-1">ALL_TIME_HIGH</div>
                <div className="text-lg font-mono text-white font-medium">{formatCurrency(coin.ath)}</div>
                {coin.ath && (
                  <div className="text-xs font-mono text-destructive mt-1 flex items-center gap-1">
                    <ArrowDown className="w-3 h-3" />
                    {(((coin.current_price - coin.ath) / coin.ath) * 100).toFixed(2)}% from ATH
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] font-mono text-muted-foreground mb-1">CIRCULATING</div>
                  <div className="text-sm font-mono text-white">{formatCompactNumber(coin.circulating_supply)}</div>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] font-mono text-muted-foreground mb-1">TOTAL_SUPPLY</div>
                  <div className="text-sm font-mono text-white">{coin.total_supply ? formatCompactNumber(coin.total_supply) : '∞'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
