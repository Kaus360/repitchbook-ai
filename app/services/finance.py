def calculate_rental_yield(expected_rent, property_price):
    return round((expected_rent * 12 / property_price) * 100, 2)


def calculate_cash_flow(expected_rent, annual_costs):
    return round((expected_rent * 12) - annual_costs, 2)


def calculate_roi(property_price, appreciation_rate, years):
    future_value = property_price * ((1 + appreciation_rate / 100) ** years)
    roi = ((future_value - property_price) / property_price) * 100
    return round(roi, 2)


def roi_projection(property_price, appreciation_rate, years):
    values = []
    current_value = property_price

    for _ in range(years):
        current_value *= (1 + appreciation_rate / 100)
        values.append(round(current_value, 2))

    return values
