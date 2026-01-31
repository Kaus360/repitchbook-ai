import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "positive" | "negative" | "neutral";
}

export function InsightCard({ title, value, description, icon: Icon, trend = "neutral" }: InsightCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            trend === "positive" && "bg-success/10 text-success",
            trend === "negative" && "bg-destructive/10 text-destructive",
            trend === "neutral" && "bg-muted text-muted-foreground"
          )}
        >
          {trend === "positive" ? "↑" : trend === "negative" ? "↓" : "—"}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
