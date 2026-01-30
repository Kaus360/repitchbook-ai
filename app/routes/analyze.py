from fastapi import APIRouter, HTTPException
from app.models.deal_models import DealInput, DealAnalysisResponse
from app.services.finance import (
    calculate_rental_yield,
    calculate_cash_flow,
    calculate_roi,
    roi_projection
)
from app.services.scoring import investment_score
from app.core.city_data import CITY_DATA
from app.services.ai_memo import generate_investment_memo

router = APIRouter(tags=["Deal Analysis"])


@router.post("/deal/analyze", response_model=DealAnalysisResponse)
def analyze_deal(deal: DealInput):

    # -----------------------------
    # CITY VALIDATION
    # -----------------------------

    city_key = deal.city.lower()

    if city_key not in CITY_DATA:
        raise HTTPException(
            status_code=400,
            detail="City not supported yet."
        )

    market = CITY_DATA[city_key]

    # -----------------------------
    # FINANCIAL ENGINE
    # -----------------------------

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

    # -----------------------------
    # RISK ENGINE
    # -----------------------------

    if score > 75:
        risk = "Low"
    elif score > 55:
        risk = "Moderate"
    else:
        risk = "High"

    # -----------------------------
    # EXECUTIVE SUMMARY
    # -----------------------------

    if score > 75:
        summary = f"This deal outperforms typical {deal.city.title()} market benchmarks, offering strong appreciation potential and attractive rental stability."
    elif score > 60:
        summary = f"A balanced investment opportunity aligned with prevailing {deal.city.title()} market conditions."
    elif score > 45:
        summary = f"This property falls slightly below prime {deal.city.title()} investment thresholds."
    else:
        summary = f"Financial indicators significantly underperform relative to the {deal.city.title()} market."

    # -----------------------------
    # AI MEMO (SAFE CALL)
    # -----------------------------

    metrics = {
        "roi": roi,
        "yield": rental_yield,
        "cash_flow": cash_flow,
        "score": score
    }

    try:
        ai_memo = generate_investment_memo(
            deal,
            metrics,
            market
        )
    except Exception as e:
        print("AI ERROR:", e)  # 👈 shows terminal error
        ai_memo = "AI memo temporarily unavailable."

    # -----------------------------
    # RESPONSE
    # -----------------------------

    return DealAnalysisResponse(
        investment_score=score,
        verdict=verdict,
        rental_yield=rental_yield,
        cash_flow=cash_flow,
        roi_percent=roi,
        roi_projection=projection,
        risk_level=risk,
        executive_summary=summary,
        recommendation=verdict,
        market_snapshot=market,
        ai_investment_memo=ai_memo
    )
