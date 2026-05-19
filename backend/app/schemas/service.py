from datetime import datetime
from typing import List, Optional
from decimal import Decimal
from pydantic import BaseModel
from app.models.service import RestorationStatus, PickupStatus, ServiceImageType

# Service Image Schemas
class ServiceImageBase(BaseModel):
    url: str
    image_type: Optional[ServiceImageType] = ServiceImageType.BEFORE

class ServiceImageCreate(ServiceImageBase):
    pass

class ServiceImageResponse(ServiceImageBase):
    id: int
    service_request_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Pickup Schedule Schemas
class PickupScheduleBase(BaseModel):
    pickup_date: datetime
    address: str
    contact_phone: str

class PickupScheduleCreate(PickupScheduleBase):
    pass

class PickupScheduleUpdate(BaseModel):
    pickup_date: Optional[datetime] = None
    address: Optional[str] = None
    contact_phone: Optional[str] = None
    status: Optional[PickupStatus] = None

class PickupScheduleResponse(PickupScheduleBase):
    id: int
    service_request_id: int
    status: PickupStatus
    created_at: datetime

    class Config:
        from_attributes = True

# Restoration Update Schemas
class RestorationUpdateBase(BaseModel):
    status: RestorationStatus
    notes: Optional[str] = None

class RestorationUpdateCreate(RestorationUpdateBase):
    pass

class RestorationUpdateResponse(RestorationUpdateBase):
    id: int
    service_request_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Service Request Schemas
class ServiceRequestBase(BaseModel):
    item_type: str
    brand: Optional[str] = None
    description: str

class ServiceRequestCreate(ServiceRequestBase):
    pickup_details: Optional[PickupScheduleCreate] = None

class ServiceRequestUpdate(BaseModel):
    status: Optional[RestorationStatus] = None
    estimated_cost: Optional[Decimal] = None
    quotation_approved: Optional[bool] = None

class ServiceRequestResponse(ServiceRequestBase):
    id: int
    user_id: int
    status: RestorationStatus
    estimated_cost: Optional[Decimal] = None
    quotation_approved: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    pickups: List[PickupScheduleResponse] = []
    updates: List[RestorationUpdateResponse] = []
    images: List[ServiceImageResponse] = []

    class Config:
        from_attributes = True
