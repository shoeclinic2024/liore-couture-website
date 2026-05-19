from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.product import Category, Product, ProductImage
from app.models.user import User, UserRole
from app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
    CategoryCreate,
    CategoryResponse
)
from app.api import deps

router = APIRouter()

# Category Endpoints
@router.get("/categories", response_model=List[CategoryResponse])
def list_categories(db: Session = Depends(get_db)) -> Any:
    return db.query(Category).all()

@router.post(
    "/categories",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(deps.RoleChecker([UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def create_category(category_in: CategoryCreate, db: Session = Depends(get_db)) -> Any:
    category = db.query(Category).filter(Category.slug == category_in.slug).first()
    if category:
        raise HTTPException(status_code=400, detail="Category slug already exists")
    db_category = Category(**category_in.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Product Endpoints
@router.get("/", response_model=List[ProductResponse])
def list_products(
    skip: int = 0,
    limit: int = 100,
    category_slug: str = None,
    db: Session = Depends(get_db)
) -> Any:
    query = db.query(Product).filter(Product.is_active == True)
    if category_slug:
        query = query.join(Category).filter(Category.slug == category_slug)
    return query.offset(skip).limit(limit).all()

@router.get("/{slug}", response_model=ProductResponse)
def read_product_by_slug(slug: str, db: Session = Depends(get_db)) -> Any:
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(deps.RoleChecker([UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)) -> Any:
    product = db.query(Product).filter(Product.slug == product_in.slug).first()
    if product:
        raise HTTPException(status_code=400, detail="Product slug already exists")
    
    db_product = Product(**product_in.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put(
    "/{product_id}",
    response_model=ProductResponse,
    dependencies=[Depends(deps.RoleChecker([UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def update_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db)
) -> Any:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_class=Response,
    dependencies=[Depends(deps.RoleChecker([UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
