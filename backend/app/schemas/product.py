from datetime import datetime
from typing import List, Optional
from decimal import Decimal
from pydantic import BaseModel

# Product Image Schemas
class ProductImageBase(BaseModel):
    url: str
    is_primary: Optional[bool] = False

class ProductImageCreate(ProductImageBase):
    pass

class ProductImageResponse(ProductImageBase):
    id: int
    product_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: Decimal
    stock: int
    is_active: Optional[bool] = True
    category_id: Optional[int] = None
    
    # Story module
    craftsmanship_story: Optional[str] = None
    material_story: Optional[str] = None
    care_guide: Optional[str] = None
    restoration_support: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None
    category_id: Optional[int] = None
    craftsmanship_story: Optional[str] = None
    material_story: Optional[str] = None
    care_guide: Optional[str] = None
    restoration_support: Optional[str] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    images: List[ProductImageResponse] = []
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True
