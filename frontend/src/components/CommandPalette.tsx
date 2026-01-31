import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  LayoutDashboard, 
  Zap, 
  FileText, 
  BarChart3, 
  Settings, 
  Search,
  Plus,
  TrendingUp
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => navigate("/analyze"))}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Analyze New Deal</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘N</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/reports"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search Deals</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/insights"))}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>View Market Trends</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/analyze"))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Analyze Deal</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/reports"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/insights"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Market Insights</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
