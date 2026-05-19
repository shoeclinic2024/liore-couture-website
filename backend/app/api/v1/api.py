from fastapi import APIRouter
from app.api.v1.endpoints import auth, products, services

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
