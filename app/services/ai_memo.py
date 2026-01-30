import os
from groq import Groq
from dotenv import load_dotenv

# FORCE LOAD .env from project root
load_dotenv(dotenv_path=".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# 🔴 Fail FAST if key missing (VERY senior pattern)
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found. Check your .env file.")

client = Groq(api_key=GROQ_API_KEY)


def generate_investment_memo(deal, metrics, market):

    prompt = f"""
You are a senior real estate investment analyst preparing a memo for professional investors.

Analyze the deal STRICTLY using the provided data.

DO NOT invent numbers.
DO NOT calculate anything.
DO NOT exaggerate returns.

Maintain an institutional and analytical tone.

----------------------------

PROPERTY DETAILS:
City: {deal.city}
Purchase Price: {deal.property_price}
Expected Monthly Rent: {deal.expected_rent}
Annual Costs: {deal.annual_costs}

----------------------------

FINANCIAL METRICS:
ROI: {metrics['roi']}%
Rental Yield: {metrics['yield']}%
Annual Cash Flow: {metrics['cash_flow']}
Investment Score: {metrics['score']} / 100

----------------------------

MARKET CONTEXT:
{market}

----------------------------

Write a structured investment memo with:

1. Investment Thesis  
2. Key Strengths  
3. Risk Factors  
4. Market Positioning  
5. Final Recommendation  

Keep it concise, professional, and investor-focused.
Avoid chatbot language.
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.25,
        max_tokens=600
    )

    return completion.choices[0].message.content
