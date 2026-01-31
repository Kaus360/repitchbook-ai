import { cn } from "@/lib/utils";

interface AIScoreWidgetProps {
  score: number;
  label: string;
  trend?: "up" | "down" | "stable";
}

export function AIScoreWidget({ score, label }: AIScoreWidgetProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-success";
    if (s >= 60) return "text-primary";
    if (s >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = (s: number) => {
    if (s >= 80) return "from-success/20 to-success/5";
    if (s >= 60) return "from-primary/20 to-primary/5";
    if (s >= 40) return "from-warning/20 to-warning/5";
    return "from-destructive/20 to-destructive/5";
  };

  const getRingColor = (s: number) => {
    if (s >= 80) return "stroke-success";
    if (s >= 60) return "stroke-primary";
    if (s >= 40) return "stroke-warning";
    return "stroke-destructive";
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border border-border bg-gradient-to-br p-6",
      getScoreGradient(score)
    )}>
      <div className="flex items-center gap-6">
        {/* Score Ring */}
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90 transform">
            <circle
              className="stroke-muted"
              strokeWidth="8"
              fill="none"
              r="54"
              cx="64"
              cy="64"
            />
            <circle
              className={cn("transition-all duration-1000 ease-out", getRingColor(score))}
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              r="54"
              cx="64"
              cy="64"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-4xl font-bold tabular-nums", getScoreColor(score))}>
              {score}
            </span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">AI Investment Score</p>
          <p className={cn("mt-1 text-2xl font-semibold", getScoreColor(score))}>{label}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on 23 market signals and historical data patterns
          </p>
        </div>
      </div>
    </div>
  );
}
