import { LayoutDashboard, FileText, BarChart3, Settings, Zap } from "lucide-react";
import logoImage from "@/assets/logo.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Analyze Deal", href: "/analyze", icon: Zap, primary: true },
  { title: "Reports", href: "/reports", icon: FileText },
  { title: "Market Insights", href: "/insights", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <img src={logoImage} alt="REPitchBook Logo" className="h-8 w-8 rounded-lg object-cover" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">REPitchBook</span>
            <span className="text-xs text-muted-foreground">AI Platform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  item.primary && !isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? "text-primary" : item.primary ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span>{item.title}</span>
                {item.primary && (
                  <span className="ml-auto rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    AI
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}
