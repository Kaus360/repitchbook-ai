import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { MapPin, AlertCircle } from "lucide-react";

interface PropertyBasicsStepProps {
  data: {
    city: string;
    area?: string;
    purchasePrice: string;
    monthlyRent: string;
    investmentHorizon: number;
  };
  onChange: (data: Partial<PropertyBasicsStepProps["data"]>) => void;
}

// Cities
const SUPPORTED_CITIES = [
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
];

// ⭐ Hyperlocal areas
const AREA_MAP: Record<string, { value: string; label: string }[]> = {
  mumbai: [
    { value: "bandra", label: "Bandra" },
    { value: "powai", label: "Powai" },
    { value: "lower parel", label: "Lower Parel" },
    { value: "thane", label: "Thane" },
  ],
  bangalore: [
    { value: "whitefield", label: "Whitefield" },
    { value: "koramangala", label: "Koramangala" },
    { value: "electronic city", label: "Electronic City" },
    { value: "sarjapur road", label: "Sarjapur Road" },
  ],
  hyderabad: [
    { value: "gachibowli", label: "Gachibowli" },
    { value: "hitech city", label: "Hitech City" },
    { value: "kondapur", label: "Kondapur" },
    { value: "madhapur", label: "Madhapur" },
  ],
};

export function PropertyBasicsStep({ data, onChange }: PropertyBasicsStepProps) {
  const areas = AREA_MAP[data.city] || [];

  return (
    <div className="space-y-6">
      {/* CITY */}
      <div className="space-y-2">
        <Label className="text-sm text-foreground">City *</Label>

        <Select
          value={data.city}
          onValueChange={(value) =>
            onChange({
              city: value,
              area: "", // reset area when city changes
            })
          }
        >
          <SelectTrigger className="h-11 border-border bg-muted/30">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>

          <SelectContent>
            {SUPPORTED_CITIES.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Hyperlocal intelligence enabled
        </p>
      </div>

      {/* ⭐ AREA DROPDOWN */}
      {data.city && (
        <div className="space-y-2">
          <Label className="text-sm text-foreground">
            Area / Micro-Market (Optional)
          </Label>

          <Select
            value={data.area}
            onValueChange={(value) => onChange({ area: value })}
          >
            <SelectTrigger className="h-11 border-border bg-muted/30">
              <SelectValue placeholder="Select area" />
            </SelectTrigger>

            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* PRICE + RENT */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Purchase Price *</Label>
          <Input
            type="number"
            value={data.purchasePrice}
            onChange={(e) =>
              onChange({ purchasePrice: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Expected Monthly Rent *</Label>
          <Input
            type="number"
            value={data.monthlyRent}
            onChange={(e) =>
              onChange({ monthlyRent: e.target.value })
            }
          />
        </div>
      </div>

      {/* SLIDER */}
      <div className="space-y-4">
        <Label>
          Investment Horizon — {data.investmentHorizon} years
        </Label>

        <Slider
          value={[data.investmentHorizon]}
          onValueChange={([v]) =>
            onChange({ investmentHorizon: v })
          }
          min={1}
          max={40}
          step={1}
        />
      </div>
    </div>
  );
}
