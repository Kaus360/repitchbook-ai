def investment_score(roi, rental_yield, cash_flow):
    score = 50

    if roi > 40:
        score += 20
    elif roi > 20:
        score += 10

    if rental_yield > 5:
        score += 15
    elif rental_yield > 3:
        score += 8

    if cash_flow > 0:
        score += 10

    score = min(score, 100)

    if score >= 80:
        verdict = "Strong Buy"
    elif score >= 65:
        verdict = "Buy"
    elif score >= 50:
        verdict = "Neutral"
    else:
        verdict = "High Risk"

    return score, verdict
