def investment_score(roi, rental_yield, cash_flow):

    score = (
        (roi * 0.4) +
        (rental_yield * 0.3) +
        ((cash_flow / 10000) * 0.3)
    )

    score = round(min(score, 100), 2)

    if score > 75:
        verdict = "Strong Buy"
    elif score > 60:
        verdict = "Buy"
    elif score > 45:
        verdict = "Hold"
    else:
        verdict = "Avoid"

    return score, verdict
