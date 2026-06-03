import { Link, useLocation } from "wouter";
import { Activity, Home, LayoutDashboard, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNav() {
  const [location] = useLocation();

  const navItems = [
    { id: "home", href: "/", label: "Home", icon: Home, exact: true },
    { id: "terminal", href: "/dashboard", label: "Terminal", icon: LayoutDashboard, exact: false },
    { id: "intel", href: "/about", label: "Intel", icon: Info, exact: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/30 text-primary group-hover:bg-primary/20 transition-colors">
              <Activity className="h-5 w-5" />
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
            </div>
            <div className="font-serif text-xl font-bold tracking-wider flex items-center gap-1">
              <span className="text-white group-hover:text-white/90 transition-colors">NEXUS</span>
              <span className="text-primary">.CORE</span>
            </div>
          </div>
        </Link>

        <nav className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location === item.href
              : location.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  data-testid={`nav-${item.id}`}
                  className={cn(
                    "relative px-4 py-2 text-sm font-mono tracking-widest cursor-pointer transition-all duration-300 rounded-md group flex items-center gap-2",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_8px_hsl(var(--primary))] animate-in fade-in zoom-in" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
