import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  MapPin, 
  BarChart3, 
  Lightbulb,
  Download,
  Bookmark,
  Share2,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/result/ScoreRing";
import { InsightCard } from "@/components/result/InsightCard";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { useDealAnalysis } from "@/contexts/DealAnalysisContext";
import { formatCurrency, formatPercent } from "@/lib/api";

const expenseBreakdown = [
  { name: "Mortgage", value: 42, color: "hsl(var(--chart-1))" },
  { name: "Operating", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Insurance", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Reserves", value: 15, color: "hsl(var(--chart-4))" },
];

export default function DealResult() {
  const navigate = useNavigate();
  const { analysisResult, propertyData, resetAnalysis } = useDealAnalysis();

  // Redirect if no analysis result
  useEffect(() => {
    if (!analysisResult) {
      navigate("/analyze");
    }
  }, [analysisResult, navigate]);

  if (!analysisResult) {
    return null;
  }

  // Transform ROI projection data for chart
  const roiProjection = analysisResult.roi_projection.map((value, index) => ({
    year: `Y${index + 1}`,
    value: Math.round(((value - analysisResult.roi_projection[0]) / analysisResult.roi_projection[0]) * 100 * 10) / 10 || analysisResult.roi_percent / analysisResult.roi_projection.length * (index + 1),
  }));

  // Use actual values if projection seems off
  const chartData = roiProjection.length > 0 ? roiProjection : [
    { year: "Y1", value: analysisResult.roi_percent * 0.2 },
    { year: "Y2", value: analysisResult.roi_percent * 0.4 },
    { year: "Y3", value: analysisResult.roi_percent * 0.6 },
    { year: "Y4", value: analysisResult.roi_percent * 0.8 },
    { year: "Y5", value: analysisResult.roi_percent },
  ];

  const getCityLabel = (city: string) => {
    const cityMap: Record<string, string> = {
      mumbai: "Mumbai",
      bangalore: "Bangalore",
      hyderabad: "Hyderabad",
    };
    return cityMap[city.toLowerCase()] || city;
  };


  const handleDownloadReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    const addCenteredText = (text: string, fontSize: number, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.text(text, pageWidth / 2, y, { align: "center" });
      y += fontSize * 0.5;
    };

    const addText = (text: string, fontSize: number, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * fontSize * 0.5;
    };

    const addDivider = () => {
      y += 5;
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;
    };

    // Title
    doc.setTextColor(30, 64, 175);
    addCenteredText("REPITCHBOOK INVESTMENT REPORT", 18, true);
    y += 5;
    doc.setTextColor(0, 0, 0);

    // Property Info
    addCenteredText(`${getCityLabel(propertyData.city)} Investment Property`, 14, true);
    y += 2;
    doc.setTextColor(100, 100, 100);
    addCenteredText(`Listed Price: ${formatCurrency(parseFloat(propertyData.purchasePrice) || 0)}`, 10);
    addCenteredText(`Report Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, 10);
    doc.setTextColor(0, 0, 0);

    addDivider();

    // AI Investment Score
    addText("AI INVESTMENT SCORE", 12, true);
    y += 3;
    const scoreColor = analysisResult.investment_score > 75 ? [34, 139, 34] : analysisResult.investment_score > 50 ? [255, 165, 0] : [220, 53, 69];
    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    addText(`Overall Score: ${analysisResult.investment_score}/100 (${analysisResult.verdict})`, 11, true);
    doc.setTextColor(0, 0, 0);

    addDivider();

    // Executive Summary
    addText("EXECUTIVE SUMMARY", 12, true);
    y += 3;
    addText(analysisResult.executive_summary, 10);

    addDivider();

    // Key Metrics
    addText("KEY METRICS", 12, true);
    y += 5;
    
    const metrics = [
      ["Projected ROI:", `${analysisResult.roi_percent}%`],
      ["Rental Yield:", `${analysisResult.rental_yield}%`],
      ["Annual Cash Flow:", formatCurrency(analysisResult.cash_flow)],
      ["Risk Level:", analysisResult.risk_level],
      ["Market Sentiment:", analysisResult.market_snapshot.market_sentiment],
      ["Liquidity Score:", `${analysisResult.market_snapshot.liquidity_score}/10`],
    ];

    metrics.forEach(([label, value]) => {
      doc.setFont("helvetica", "normal");
      doc.text(label, margin, y);
      doc.setFont("helvetica", "bold");
      doc.text(value, margin + 70, y);
      y += 7;
    });

    addDivider();

    // Market Snapshot
    addText("MARKET SNAPSHOT", 12, true);
    y += 5;
    
    const marketData = [
      ["Avg Price/Sqft:", `₹${analysisResult.market_snapshot.avg_price_per_sqft.toLocaleString('en-IN')}`],
      ["Avg Rental Yield:", `${analysisResult.market_snapshot.avg_rental_yield}%`],
      ["Avg Appreciation:", `${analysisResult.market_snapshot.avg_appreciation}%`],
      ["Vacancy Rate:", `${analysisResult.market_snapshot.vacancy_rate}%`],
    ];

    marketData.forEach(([label, value]) => {
      doc.setFont("helvetica", "normal");
      doc.text(label, margin, y);
      doc.setFont("helvetica", "bold");
      doc.text(value, margin + 50, y);
      y += 7;
    });

    // Check if we need a new page
    if (y > 200) {
      doc.addPage();
      y = 20;
    }

    addDivider();

    // AI Investment Memo
    addText("AI INVESTMENT MEMO", 12, true);
    y += 5;
    const memoLines = doc.splitTextToSize(analysisResult.ai_investment_memo, pageWidth - margin * 2);
    memoLines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(line, margin, y);
      y += 5;
    });

    // Disclaimer
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    addDivider();
    doc.setTextColor(100, 100, 100);
    addText("DISCLAIMER", 10, true);
    y += 2;
    addText("This report is generated by REPitchBook AI and is for informational purposes only. It does not constitute financial advice. Please consult with qualified professionals before making investment decisions.", 8);
    y += 5;
    addText(`Report ID: RPB-${Date.now().toString(36).toUpperCase()}`, 8);
    addText("Generated by REPitchBook AI Platform", 8);

    // Save the PDF
    doc.save(`REPitchBook_Report_${getCityLabel(propertyData.city)}_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast.success("PDF report downloaded successfully!");
  };

  const handleSaveDeal = () => {
    toast.success("Deal saved to your portfolio!");
  };

  const handleShareAnalysis = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleNewAnalysis = () => {
    resetAnalysis();
    navigate("/analyze");
  };

  // Determine trend based on score
  const getTrend = (value: number, type: "score" | "percent" | "risk"): "positive" | "negative" | "neutral" => {
    if (type === "risk") {
      return value === 0 ? "positive" : "neutral"; // Low risk is positive
    }
    if (type === "score") {
      return value > 75 ? "positive" : value > 50 ? "neutral" : "negative";
    }
    return value > 5 ? "positive" : value > 0 ? "neutral" : "negative";
  };

  const riskTrend = analysisResult.risk_level === "Low" ? "positive" : analysisResult.risk_level === "Moderate" ? "neutral" : "negative";

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-6 lg:p-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={handleNewAnalysis}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Analysis
        </Button>

        {/* Header with Score */}
        <div className="mb-8 rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
            <ScoreRing score={analysisResult.investment_score} size="lg" />
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-xl font-semibold text-foreground">
                {getCityLabel(propertyData.city)} Investment Property
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatCurrency(parseFloat(propertyData.purchasePrice) || 0)}
              </p>
              
              {/* Executive Summary */}
              <div className="mt-6 rounded-lg border border-border bg-muted/30 p-5">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  AI Investment Summary
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {analysisResult.executive_summary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Cards Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InsightCard
            title="Projected ROI"
            value={formatPercent(analysisResult.roi_percent)}
            description={`${propertyData.investmentHorizon}-year total return projection`}
            icon={TrendingUp}
            trend={getTrend(analysisResult.roi_percent, "percent")}
          />
          <InsightCard
            title="Risk Assessment"
            value={analysisResult.risk_level}
            description={`Based on ${analysisResult.investment_score > 75 ? "strong" : analysisResult.investment_score > 50 ? "moderate" : "weak"} fundamentals`}
            icon={AlertTriangle}
            trend={riskTrend}
          />
          <InsightCard
            title="Rental Yield"
            value={formatPercent(analysisResult.rental_yield)}
            description="Annual rental income vs property value"
            icon={DollarSign}
            trend={getTrend(analysisResult.rental_yield, "percent")}
          />
          <InsightCard
            title="Annual Cash Flow"
            value={formatCurrency(analysisResult.cash_flow)}
            description="Net income after operating costs"
            icon={DollarSign}
            trend={analysisResult.cash_flow > 0 ? "positive" : "negative"}
          />
          <InsightCard
            title="Market Sentiment"
            value={analysisResult.market_snapshot.market_sentiment}
            description={`Liquidity score: ${analysisResult.market_snapshot.liquidity_score}/10`}
            icon={BarChart3}
            trend={analysisResult.market_snapshot.liquidity_score >= 8 ? "positive" : "neutral"}
          />
          <InsightCard
            title="Verdict"
            value={analysisResult.verdict}
            description={analysisResult.recommendation}
            icon={Lightbulb}
            trend={analysisResult.verdict === "Strong Buy" || analysisResult.verdict === "Buy" ? "positive" : analysisResult.verdict === "Hold" ? "neutral" : "negative"}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ROI Projection Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Property Value Projection</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Expected property values over investment horizon</p>
            <div className="mt-6 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={analysisResult.roi_projection.map((value, index) => ({
                    year: `Y${index + 1}`,
                    value: value / 100000, // Convert to lakhs
                  }))} 
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="roiGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickFormatter={(value) => `₹${value}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`₹${(value * 100000).toLocaleString('en-IN')}`, "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#roiGradient2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Snapshot */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">Market Snapshot - {getCityLabel(propertyData.city)}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Current market conditions and benchmarks</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Avg. Price/Sqft</span>
                <span className="text-sm font-medium text-foreground">₹{analysisResult.market_snapshot.avg_price_per_sqft.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Avg. Rental Yield</span>
                <span className="text-sm font-medium text-foreground">{analysisResult.market_snapshot.avg_rental_yield}%</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Avg. Appreciation</span>
                <span className="text-sm font-medium text-foreground">{analysisResult.market_snapshot.avg_appreciation}%</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Vacancy Rate</span>
                <span className="text-sm font-medium text-foreground">{analysisResult.market_snapshot.vacancy_rate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Market Sentiment</span>
                <span className="text-sm font-medium text-success">{analysisResult.market_snapshot.market_sentiment}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Investment Memo */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            AI Investment Memo
          </h3>
          <div className="mt-4 prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed bg-transparent p-0 m-0">
              {analysisResult.ai_investment_memo}
            </pre>
          </div>
        </div>
      </div>

      {/* Sticky Action Panel */}
      <div className="hidden w-72 border-l border-border bg-card/50 p-6 lg:block">
        <div className="sticky top-24 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</h3>
          
          <Button 
            className="w-full justify-start gap-3 bg-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={handleDownloadReport}
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 border-border text-foreground hover:bg-muted"
            onClick={handleSaveDeal}
          >
            <Bookmark className="h-4 w-4" />
            Save Deal
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 border-border text-foreground hover:bg-muted"
            onClick={handleShareAnalysis}
          >
            <Share2 className="h-4 w-4" />
            Share Analysis
          </Button>

          <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs font-medium text-foreground">Need a deeper analysis?</p>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
              Upgrade to Pro for comprehensive due diligence reports and market comparables.
            </p>
            <Button size="sm" className="mt-3 w-full bg-primary/10 text-xs text-primary hover:bg-primary/20">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
