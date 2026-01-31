import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FinancialInputsStepProps {
  data: {
    operatingCosts: string;
    appreciationRate: number;
  };
  onChange: (data: Partial<FinancialInputsStepProps["data"]>) => void;
}

export function FinancialInputsStep({ data, onChange }: FinancialInputsStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="operatingCosts" className="text-foreground">Annual Operating Costs *</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
          <Input
            id="operatingCosts"
            type="number"
            placeholder="e.g., 200000"
            value={data.operatingCosts}
            onChange={(e) => onChange({ operatingCosts: e.target.value })}
            className="h-12 border-border bg-muted/50 pl-8 text-foreground placeholder:text-muted-foreground"
            min="0"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">Maintenance, taxes, insurance, etc.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-foreground">Expected Appreciation Rate *</Label>
          <span className="text-sm font-medium text-primary">{data.appreciationRate.toFixed(1)}%</span>
        </div>
        <Slider
          value={[data.appreciationRate]}
          onValueChange={([value]) => onChange({ appreciationRate: value })}
          min={0}
          max={25}
          step={0.5}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>25%</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Expected annual property value appreciation (0-25%)
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          These financial parameters help our AI model cash flow scenarios, break-even analysis, 
          and long-term return projections with institutional-grade precision.
        </p>
      </div>
    </div>
  );
}
