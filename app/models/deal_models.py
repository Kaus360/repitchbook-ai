from pydantic import BaseModel, Field
from typing import List, Dict, Optional


class DealInput(BaseModel):

    city: str = Field(..., description="Target investment city")

    # ⭐ NEW — OPTIONAL HYPERLOCAL FIELD
    area: Optional[str] = Field(
        None,
        description="Optional micro-market within the city"
    )

    property_price: float = Field(..., gt=0)
    expected_rent: float = Field(..., gt=0)
    annual_costs: float = Field(..., ge=0)
    appreciation_rate: float = Field(..., ge=0, le=25)
    loan_years: int = Field(..., gt=0, le=40)


class DealAnalysisResponse(BaseModel):

    investment_score: float
    verdict: str

    rental_yield: float
    cash_flow: float
    roi_percent: float
    roi_projection: List[float]

    risk_level: str
    executive_summary: str
    recommendation: str

    market_snapshot: Dict

    ai_investment_memo: str
