import { useState, useRef, useEffect } from "react";
import { Search, Bell, Command, LogOut, FileText, BarChart3, Building2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import avatarMale from "@/assets/avatar-male.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock search data
const searchableItems = [
  { id: 1, title: "Skyline Tower Analysis", type: "deal", route: "/deal-result", icon: Building2 },
  { id: 2, title: "Q4 Investment Report", type: "report", route: "/reports", icon: FileText },
  { id: 3, title: "Mumbai Market Insights", type: "insight", route: "/insights", icon: TrendingUp },
  { id: 4, title: "Whitefield Property Deal", type: "deal", route: "/deal-result", icon: Building2 },
  { id: 5, title: "Bengaluru Market Analysis", type: "insight", route: "/insights", icon: BarChart3 },
  { id: 6, title: "Portfolio Performance Report", type: "report", route: "/reports", icon: FileText },
  { id: 7, title: "Gurugram Commercial Property", type: "deal", route: "/deal-result", icon: Building2 },
  { id: 8, title: "Hyderabad Tech Corridor Insights", type: "insight", route: "/insights", icon: TrendingUp },
];

interface TopNavProps {
  onOpenCommand: () => void;
}

export function TopNav({ onOpenCommand }: TopNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredResults = searchQuery.length > 0
    ? searchableItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (route: string) => {
    navigate(route);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="relative w-full max-w-md" ref={searchRef}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search deals, reports, insights..."
          className="h-10 w-full border-border bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:bg-muted"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
        />
        
        {/* Search Results Dropdown */}
        {isSearchOpen && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-popover shadow-lg overflow-hidden z-50">
            {filteredResults.length > 0 ? (
              <div className="py-2">
                <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Results ({filteredResults.length})
                </p>
                {filteredResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearchSelect(item.route)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-3 py-6 text-center">
                <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Command trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenCommand}
          className="hidden h-9 gap-2 border-border bg-muted/50 px-3 text-muted-foreground hover:bg-muted hover:text-foreground md:flex"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="text-xs">Command</span>
          <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <p className="text-sm font-medium">New deal analysis completed</p>
              <p className="text-xs text-muted-foreground">Skyline Tower report is ready to view</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <p className="text-sm font-medium">Market update available</p>
              <p className="text-xs text-muted-foreground">Mumbai real estate prices trending up</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <p className="text-sm font-medium">Weekly report ready</p>
              <p className="text-xs text-muted-foreground">Your portfolio summary for this week</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 border-l border-border pl-3 outline-none">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-foreground">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || "Member"}</p>
              </div>
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={avatarMale} />
                <AvatarFallback className="bg-primary/10 text-primary">{userInitials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
