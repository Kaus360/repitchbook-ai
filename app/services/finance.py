def calculate_rental_yield(expected_rent, property_price):
    annual_rent = expected_rent * 12
    return round((annual_rent / property_price) * 100, 2)


def calculate_cash_flow(expected_rent, annual_costs):
    annual_rent = expected_rent * 12
    return annual_rent - annual_costs


def calculate_roi(property_price, appreciation_rate, years):
    future_value = property_price * ((1 + appreciation_rate / 100) ** years)
    roi_percent = ((future_value - property_price) / property_price) * 100
    return round(roi_percent, 2)


def roi_projection(property_price, appreciation_rate, years):
    projections = []
    for year in range(1, years + 1):
        value = property_price * ((1 + appreciation_rate / 100) ** year)
        roi = ((value - property_price) / property_price) * 100
        projections.append(round(roi, 2))
    return projections
