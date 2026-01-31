import { ReactNode, useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";
import { CommandPalette } from "@/components/CommandPalette";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="pl-64">
        <TopNav onOpenCommand={() => setCommandOpen(true)} />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
