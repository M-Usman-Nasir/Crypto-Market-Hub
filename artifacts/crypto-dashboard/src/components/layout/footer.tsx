import { Link } from "wouter";
import { Activity } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Terminal", href: "/dashboard" },
  { label: "Intel", href: "/about" },
];

const COMING_SOON = [
  "AI Sentiment Engine",
  "Portfolio Tracker",
  "Trading Webhooks",
  "Multichain Support",
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/30 mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/30 text-primary">
                <Activity className="h-5 w-5" />
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider">
                <span className="text-white">NEXUS</span>
                <span className="text-primary">.CORE</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-xs">
              Next generation crypto market intelligence. Real-time data, zero noise, built for professionals.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              All systems operational
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs tracking-widest text-primary uppercase">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coming Soon */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs tracking-widest text-primary uppercase">Coming Soon</h4>
            <ul className="space-y-3">
              {COMING_SOON.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} NEXUS.CORE. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Market data provided by{" "}
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              CoinGecko
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
