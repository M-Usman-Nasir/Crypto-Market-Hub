import { useListCoins, getListCoinsQueryKey } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export function PriceTicker() {
  const { data: coins } = useListCoins(
    { limit: 20 },
    { query: { queryKey: getListCoinsQueryKey({ limit: 20 }) } }
  );

  if (!coins || coins.length === 0) return null;

  const items = [...coins, ...coins];

  return (
    <div
      className="w-full border-b border-white/5 bg-black/40 overflow-hidden relative"
      style={{ height: "34px" }}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

      <div className="ticker-track flex items-center h-full gap-0">
        {items.map((coin, i) => {
          const pos = (coin.price_change_percentage_24h ?? 0) >= 0;
          return (
            <div
              key={`${coin.id}-${i}`}
              data-testid={i < coins.length ? `ticker-item-${coin.id}` : undefined}
              className="flex items-center gap-1.5 px-5 border-r border-white/5 h-full flex-shrink-0 cursor-default select-none"
            >
              <img
                src={coin.image}
                alt={coin.symbol}
                className="w-4 h-4 rounded-full flex-shrink-0"
              />
              <span className="font-mono text-[11px] font-bold text-white/80 uppercase">
                {coin.symbol}
              </span>
              <span className="font-mono text-[11px] text-white">
                {formatCurrency(coin.current_price, coin.current_price < 1 ? 4 : 2)}
              </span>
              <span
                className={cn(
                  "font-mono text-[10px] font-bold flex items-center gap-0.5",
                  pos ? "text-success" : "text-destructive"
                )}
              >
                {pos ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                {Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
