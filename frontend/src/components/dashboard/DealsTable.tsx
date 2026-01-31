import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const deals = [
  {
    id: 1,
    property: "Lodha Altamount, Lower Parel, Mumbai",
    type: "Commercial",
    score: 87,
    roi: "12.4%",
    price: "₹3,50,00,000",
    risk: "Low",
    date: "Jan 28, 2026",
  },
  {
    id: 2,
    property: "DLF Cyber City, Sector 24, Gurugram",
    type: "Office",
    score: 74,
    roi: "9.2%",
    price: "₹2,80,00,000",
    risk: "Moderate",
    date: "Jan 27, 2026",
  },
  {
    id: 3,
    property: "Phoenix Marketcity, Whitefield, Bengaluru",
    type: "Retail",
    score: 62,
    roi: "7.8%",
    price: "₹4,20,00,000",
    risk: "Moderate",
    date: "Jan 26, 2026",
  },
  {
    id: 4,
    property: "Prestige Tech Park, Outer Ring Road, Bengaluru",
    type: "Office",
    score: 91,
    roi: "14.1%",
    price: "₹5,60,00,000",
    risk: "Low",
    date: "Jan 25, 2026",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-primary";
  if (score >= 40) return "text-warning";
  return "text-destructive";
};

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-success/10 text-success border-success/30";
    case "Moderate":
      return "bg-warning/10 text-warning border-warning/30";
    case "High":
      return "bg-destructive/10 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export function DealsTable() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Analyses</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Your latest property evaluations</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Property
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Type
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Price
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                AI Score
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Est. ROI
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Risk
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {deals.map((deal) => (
              <tr
                key={deal.id}
                className="cursor-pointer transition-colors hover:bg-muted/40"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{deal.property}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-xs text-muted-foreground">
                  {deal.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium tabular-nums text-foreground">
                  {deal.price}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={cn("text-base font-semibold tabular-nums", getScoreColor(deal.score))}>
                    {deal.score}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-xs font-medium tabular-nums text-foreground">
                  {deal.roi}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] font-medium", getRiskBadgeVariant(deal.risk))}
                  >
                    {deal.risk}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-xs text-muted-foreground">
                  {deal.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
