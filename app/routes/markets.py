from fastapi import APIRouter
from app.core.city_data import CITY_DATA

router = APIRouter(tags=["Markets"])


@router.get("/markets")
def get_markets():
    """
    Returns supported cities and hyperlocal areas
    """

    markets = {}

    for city, data in CITY_DATA.items():

        areas = list(data.get("areas", {}).keys())

        markets[city] = {
            "areas": areas
        }

    return {
        "cities": markets
    }
