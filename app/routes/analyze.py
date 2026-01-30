from fastapi import APIRouter
from app.models.deal_models import DealInput
from app.services.finance import (
    calculate_rental_yield,
    calculate_cash_flow,
    calculate_roi,
    roi_projection
)
from app.services.scoring import investment_score

router = APIRouter()

@router.post("/analyze-deal")
def analyze_deal(deal: DealInput):

    rental_yield = calculate_rental_yield(
        deal.expected_rent,
        deal.property_price
    )

    cash_flow = calculate_cash_flow(
        deal.expected_rent,
        deal.annual_costs
    )

    roi = calculate_roi(
        deal.property_price,
        deal.appreciation_rate,
        deal.loan_years
    )

    projection = roi_projection(
        deal.property_price,
        deal.appreciation_rate,
        deal.loan_years
    )

    score, verdict = investment_score(
        roi,
        rental_yield,
        cash_flow
    )

    return {
        "investment_score": score,
        "verdict": verdict,
        "rental_yield": rental_yield,
        "cash_flow": cash_flow,
        "roi_percent": roi,
        "roi_projection": projection,
        "risk_level": "Moderate" if score > 60 else "Elevated",
        "executive_summary": "This property demonstrates solid long-term appreciation potential with sustainable rental yield.",
        "recommendation": verdict
    }
