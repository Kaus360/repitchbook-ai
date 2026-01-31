import { Building2, TrendingUp, DollarSign, MapPin } from "lucide-react";
import { AIScoreWidget } from "@/components/dashboard/AIScoreWidget";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DealsTable } from "@/components/dashboard/DealsTable";
import { ROIChart } from "@/components/dashboard/ROIChart";
import { RiskHeatmap } from "@/components/dashboard/RiskHeatmap";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8">
      {/* Hero Section */}
      <div className="mb-8 rounded-xl border border-border bg-card p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Turn Property Data into{" "}
              <span className="text-gradient-primary">Investor Intelligence</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              AI-powered analysis for smarter real estate decisions. Evaluate deals, assess risk, 
              and generate institutional-grade investment reports in seconds.
            </p>
          </div>
          <Button 
            onClick={() => navigate("/analyze")}
            className="h-11 bg-gradient-primary px-6 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90"
          >
            Analyze New Deal
          </Button>
        </div>
      </div>

      {/* AI Score + Metrics */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AIScoreWidget score={84} label="Strong Buy" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <MetricCard
            title="Active Deals"
            value="12"
            change="+3 this week"
            changeType="positive"
            icon={Building2}
          />
          <MetricCard
            title="Avg. ROI"
            value="11.2%"
            change="+2.4% vs last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricCard
            title="Total Portfolio Value"
            value="₹11.8 Cr"
            change="+₹1.5 Cr YTD"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Markets Tracked"
            value="24"
            change="5 new markets"
            changeType="neutral"
            icon={MapPin}
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <ROIChart />
        <RiskHeatmap />
      </div>

      {/* Deals Table */}
      <DealsTable />
    </div>
  );
}
