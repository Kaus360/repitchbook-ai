from pydantic import BaseModel, Field

class DealInput(BaseModel):
    location: str = Field(..., example="Gurgaon")
    property_price: float = Field(..., example=12000000)
    expected_rent: float = Field(..., example=45000)
    down_payment: float = Field(..., example=2400000)
    interest_rate: float = Field(..., example=8.5)
    loan_years: int = Field(..., example=20)
    annual_costs: float = Field(..., example=300000)
    appreciation_rate: float = Field(..., example=6)
