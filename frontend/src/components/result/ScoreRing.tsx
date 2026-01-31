import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: "sm" | "lg";
}

export function ScoreRing({ score, size = "lg" }: ScoreRingProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-success";
    if (s >= 60) return "text-primary";
    if (s >= 40) return "text-warning";
    return "text-destructive";
  };

  const getRingColor = (s: number) => {
    if (s >= 80) return "stroke-success";
    if (s >= 60) return "stroke-primary";
    if (s >= 40) return "stroke-warning";
    return "stroke-destructive";
  };

  const getLabel = (s: number) => {
    if (s >= 80) return "Strong Buy";
    if (s >= 60) return "Moderate";
    if (s >= 40) return "Caution";
    return "High Risk";
  };

  const dimensions = size === "lg" ? { svg: 180, radius: 78, stroke: 10 } : { svg: 120, radius: 50, stroke: 8 };
  const circumference = 2 * Math.PI * dimensions.radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className={cn("transform -rotate-90", size === "lg" ? "h-44 w-44" : "h-28 w-28")}>
          <circle
            className="stroke-muted"
            strokeWidth={dimensions.stroke}
            fill="none"
            r={dimensions.radius}
            cx={dimensions.svg / 2}
            cy={dimensions.svg / 2}
          />
          <circle
            className={cn("transition-all duration-1000 ease-out", getRingColor(score))}
            strokeWidth={dimensions.stroke}
            strokeLinecap="round"
            fill="none"
            r={dimensions.radius}
            cx={dimensions.svg / 2}
            cy={dimensions.svg / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(
            "font-bold tabular-nums",
            getScoreColor(score),
            size === "lg" ? "text-5xl" : "text-3xl"
          )}>
            {score}
          </span>
          <span className={cn("text-muted-foreground", size === "lg" ? "text-sm" : "text-xs")}>/100</span>
        </div>
      </div>
      <p className={cn(
        "mt-3 font-semibold",
        getScoreColor(score),
        size === "lg" ? "text-xl" : "text-base"
      )}>
        {getLabel(score)}
      </p>
    </div>
  );
}
