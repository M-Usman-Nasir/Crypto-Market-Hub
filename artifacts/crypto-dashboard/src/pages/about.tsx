import { Shield, Zap, Terminal, Database } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-700">
      
      <div className="text-center mb-16 space-y-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          NEXUS<span className="text-primary">.CORE</span>
        </h1>
        <p className="font-mono text-sm text-primary tracking-widest uppercase">
          Next-Generation Market Intelligence
        </p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-2xl mb-12 border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
        
        <div className="prose prose-invert max-w-none font-sans text-lg text-muted-foreground leading-relaxed">
          <p className="text-xl text-white font-medium mb-6">
            NEXUS.CORE is a high-performance crypto market terminal designed for professionals who demand unfiltered, real-time data in an environment built for focus.
          </p>
          <p>
            Traditional exchanges bury critical metrics under layers of marketing and unnecessary UI. NEXUS strips away the noise, presenting the market exactly as it is—raw, fast, and uncompromising. Built on advanced Web3 data streams, our terminal provides unparalleled visibility into global asset movements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-colors group">
          <Terminal className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-mono text-lg font-bold text-white mb-2">RAW_DATA_ACCESS</h3>
          <p className="text-sm text-muted-foreground font-sans">
            Direct pipeline to global market liquidity, price action, and volume metrics without artificial delays or smoothing.
          </p>
        </div>
        
        <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-colors group">
          <Zap className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-mono text-lg font-bold text-white mb-2">LOW_LATENCY</h3>
          <p className="text-sm text-muted-foreground font-sans">
            Optimized rendering engine built to process thousands of data points simultaneously while maintaining 60fps performance.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-colors group">
          <Database className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-mono text-lg font-bold text-white mb-2">DEEP_INTELLIGENCE</h3>
          <p className="text-sm text-muted-foreground font-sans">
            Comprehensive historical data, circulating supply metrics, and macroeconomic dominance indicators.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl hover:border-primary/40 transition-colors group">
          <Shield className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-mono text-lg font-bold text-white mb-2">FUTURE_READY</h3>
          <p className="text-sm text-muted-foreground font-sans">
            Upcoming modules include algorithmic trading webhooks, AI-driven sentiment analysis, and multi-chain portfolio tracking.
          </p>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground bg-black/40 px-4 py-2 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          SYSTEMS_ONLINE_AND_SECURE
        </div>
      </div>

    </div>
  );
}
