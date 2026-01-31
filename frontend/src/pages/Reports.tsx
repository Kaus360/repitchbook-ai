import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const reports = [
  {
    id: 1,
    property: "Lodha Altamount, Lower Parel, Mumbai",
    type: "Commercial",
    price: "₹3,50,00,000",
    score: 87,
    roi: "12.4%",
    risk: "Low",
    date: "Jan 28, 2026",
    status: "complete",
  },
  {
    id: 2,
    property: "DLF Cyber City, Sector 24, Gurugram",
    type: "Office",
    price: "₹2,80,00,000",
    score: 74,
    roi: "9.2%",
    risk: "Moderate",
    date: "Jan 27, 2026",
    status: "complete",
  },
  {
    id: 3,
    property: "Phoenix Marketcity, Whitefield, Bengaluru",
    type: "Retail",
    price: "₹4,20,00,000",
    score: 62,
    roi: "7.8%",
    risk: "Moderate",
    date: "Jan 26, 2026",
    status: "complete",
  },
  {
    id: 4,
    property: "Prestige Tech Park, Outer Ring Road, Bengaluru",
    type: "Office",
    price: "₹5,60,00,000",
    score: 91,
    roi: "14.1%",
    risk: "Low",
    date: "Jan 25, 2026",
    status: "complete",
  },
  {
    id: 5,
    property: "Godrej BKC, Bandra Kurla Complex, Mumbai",
    type: "Mixed Use",
    price: "₹8,40,00,000",
    score: 78,
    roi: "10.3%",
    risk: "Low",
    date: "Jan 24, 2026",
    status: "complete",
  },
  {
    id: 6,
    property: "Embassy Golf Links, Domlur, Bengaluru",
    type: "Office",
    price: "₹1,25,00,000",
    score: 45,
    roi: "5.2%",
    risk: "High",
    date: "Jan 23, 2026",
    status: "complete",
  },
];

const propertyTypes = ["Commercial", "Office", "Retail", "Mixed Use"];
const riskLevels = ["Low", "Moderate", "High"];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-primary";
  if (score >= 40) return "text-warning";
  return "text-destructive";
};

const getRiskBadgeClass = (risk: string) => {
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

export default function Reports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(report.type);
    const matchesRisk = selectedRisks.length === 0 || selectedRisks.includes(report.risk);
    return matchesSearch && matchesType && matchesRisk;
  });

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleRiskToggle = (risk: string) => {
    setSelectedRisks((prev) =>
      prev.includes(risk) ? prev.filter((r) => r !== risk) : [...prev, risk]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedRisks([]);
  };

  const handleExportAll = () => {
    // Create CSV content
    const headers = ["Property", "Type", "Price", "Investment Score", "ROI", "Risk Level", "Date"];
    const rows = filteredReports.map((report) => [
      report.property,
      report.type,
      report.price,
      report.score.toString(),
      report.roi,
      report.risk,
      report.date,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `REPitchBook_Reports_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredReports.length} reports to CSV`);
  };

  const activeFilterCount = selectedTypes.length + selectedRisks.length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">View and manage your deal analyses</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 border-border bg-muted/30 pl-10 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "gap-2 border-border text-xs hover:text-foreground",
                  activeFilterCount > 0 ? "text-primary border-primary/50" : "text-muted-foreground"
                )}
              >
                <Filter className="h-3.5 w-3.5" />
                Filter
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Property Type</DropdownMenuLabel>
              {propertyTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeToggle(type)}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Risk Level</DropdownMenuLabel>
              {riskLevels.map((risk) => (
                <DropdownMenuCheckboxItem
                  key={risk}
                  checked={selectedRisks.includes(risk)}
                  onCheckedChange={() => handleRiskToggle(risk)}
                >
                  <span className={cn(
                    risk === "Low" && "text-success",
                    risk === "Moderate" && "text-warning",
                    risk === "High" && "text-destructive"
                  )}>
                    {risk}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
              {activeFilterCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full justify-center text-xs text-muted-foreground"
                  >
                    Clear all filters
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-border text-xs text-muted-foreground hover:text-foreground"
            onClick={handleExportAll}
          >
            <Download className="h-3.5 w-3.5" />
            Export All
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {selectedTypes.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="cursor-pointer gap-1 text-xs"
              onClick={() => handleTypeToggle(type)}
            >
              {type}
              <span className="ml-1">×</span>
            </Badge>
          ))}
          {selectedRisks.map((risk) => (
            <Badge
              key={risk}
              variant="secondary"
              className={cn(
                "cursor-pointer gap-1 text-xs",
                risk === "Low" && "bg-success/10 text-success",
                risk === "Moderate" && "bg-warning/10 text-warning",
                risk === "High" && "bg-destructive/10 text-destructive"
              )}
              onClick={() => handleRiskToggle(risk)}
            >
              {risk} Risk
              <span className="ml-1">×</span>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Property
                </th>
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Type
                </th>
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Price
                </th>
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Investment Score
                </th>
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  ROI
                </th>
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Risk Level
                </th>
                <th className="px-6 py-3.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => navigate("/deal-result")}
                  className="cursor-pointer transition-colors hover:bg-muted/40"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="text-sm font-medium text-foreground">{report.property}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs text-muted-foreground">
                    {report.type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium tabular-nums text-foreground">
                    {report.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            report.score >= 80
                              ? "bg-success"
                              : report.score >= 60
                              ? "bg-primary"
                              : report.score >= 40
                              ? "bg-warning"
                              : "bg-destructive"
                          )}
                          style={{ width: `${report.score}%` }}
                        />
                      </div>
                      <span className={cn("text-sm font-semibold tabular-nums", getScoreColor(report.score))}>
                        {report.score}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium tabular-nums text-foreground">
                    {report.roi}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant="outline" className={cn("text-[10px] font-medium", getRiskBadgeClass(report.risk))}>
                      {report.risk}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs text-muted-foreground">
                    {report.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            No reports found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
