import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const marketData = [
  { name: "Bandra, Mumbai", medianPrice: "₹45,000/sqft", rentalYield: "3.2%", trend: "up", demandScore: 96 },
  { name: "Whitefield, Bengaluru", medianPrice: "₹12,500/sqft", rentalYield: "4.8%", trend: "up", demandScore: 91 },
  { name: "Golf Course Road, Gurugram", medianPrice: "₹18,000/sqft", rentalYield: "3.9%", trend: "up", demandScore: 88 },
  { name: "Hitech City, Hyderabad", medianPrice: "₹9,800/sqft", rentalYield: "5.2%", trend: "stable", demandScore: 85 },
  { name: "Koregaon Park, Pune", medianPrice: "₹15,500/sqft", rentalYield: "4.1%", trend: "up", demandScore: 82 },
  { name: "Anna Nagar, Chennai", medianPrice: "₹11,200/sqft", rentalYield: "4.5%", trend: "stable", demandScore: 78 },
];

const trendData = [
  { month: "Aug", commercial: 4.2, multifamily: 5.1, retail: 3.8 },
  { month: "Sep", commercial: 4.5, multifamily: 5.3, retail: 3.6 },
  { month: "Oct", commercial: 4.3, multifamily: 5.6, retail: 3.9 },
  { month: "Nov", commercial: 4.8, multifamily: 5.8, retail: 4.1 },
  { month: "Dec", commercial: 4.6, multifamily: 6.0, retail: 3.7 },
  { month: "Jan", commercial: 5.1, multifamily: 6.2, retail: 4.0 },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

export default function MarketInsights() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Market Insights</h1>
        <p className="mt-1 text-muted-foreground">Real-time market intelligence across key investment regions</p>
      </div>

      {/* Trend Chart */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-foreground">Yield Trends by Sector</h3>
          <p className="mt-1 text-sm text-muted-foreground">Average cap rates over the past 6 months</p>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="commercialGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="multifamilyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="retailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="commercial" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#commercialGrad)" name="Commercial" />
              <Area type="monotone" dataKey="multifamily" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#multifamilyGrad)" name="Multifamily" />
              <Area type="monotone" dataKey="retail" stroke="hsl(var(--chart-3))" strokeWidth={2} fill="url(#retailGrad)" name="Retail" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">Commercial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Multifamily</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-3" />
            <span className="text-sm text-muted-foreground">Retail</span>
          </div>
        </div>
      </div>

      {/* Markets Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-base font-semibold text-foreground">Top Markets</h3>
          <p className="mt-1 text-sm text-muted-foreground">Performance metrics across monitored regions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Market
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Median Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Rental Yield
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Demand Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marketData.map((market) => (
                <tr key={market.name} className="transition-colors hover:bg-muted/50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-medium text-foreground">{market.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {market.medianPrice}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {market.rentalYield}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <TrendIcon trend={market.trend} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            market.demandScore >= 85
                              ? "bg-success"
                              : market.demandScore >= 75
                              ? "bg-primary"
                              : "bg-warning"
                          )}
                          style={{ width: `${market.demandScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{market.demandScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
