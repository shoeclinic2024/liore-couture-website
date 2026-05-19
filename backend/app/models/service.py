import enum
from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class RestorationStatus(str, enum.Enum):
    REQUEST_SUBMITTED = "REQUEST_SUBMITTED"
    PICKUP_SCHEDULED = "PICKUP_SCHEDULED"
    ITEM_RECEIVED = "ITEM_RECEIVED"
    INSPECTION = "INSPECTION"
    QUOTATION_APPROVAL = "QUOTATION_APPROVAL"
    IN_PROGRESS = "IN_PROGRESS"
    QUALITY_CHECK = "QUALITY_CHECK"
    COMPLETED = "COMPLETED"
    DELIVERY = "DELIVERED"

class PickupStatus(str, enum.Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class ServiceImageType(str, enum.Enum):
    BEFORE = "BEFORE"
    AFTER = "AFTER"
    INSPECTION = "INSPECTION"

class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status = Column(Enum(RestorationStatus), default=RestorationStatus.REQUEST_SUBMITTED, nullable=False)
    item_type = Column(String, nullable=False)  # Footwear, Bags, Small Leather Goods, etc.
    brand = Column(String, nullable=True)
    description = Column(Text, nullable=False)
    estimated_cost = Column(Numeric(10, 2), nullable=True)
    quotation_approved = Column(Boolean, default=False, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    user = relationship("User")
    pickups = relationship("PickupSchedule", back_populates="service_request", cascade="all, delete-orphan")
    updates = relationship("RestorationUpdate", back_populates="service_request", cascade="all, delete-orphan")
    images = relationship("ServiceImage", back_populates="service_request", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="service_request")

    def __repr__(self):
        return f"<ServiceRequest {self.id} Status: {self.status}>"

class PickupSchedule(Base):
    __tablename__ = "pickup_schedules"

    id = Column(Integer, primary_key=True, index=True)
    service_request_id = Column(Integer, ForeignKey("service_requests.id", ondelete="CASCADE"), nullable=False)
    pickup_date = Column(DateTime, nullable=False)
    address = Column(Text, nullable=False)
    contact_phone = Column(String, nullable=False)
    status = Column(Enum(PickupStatus), default=PickupStatus.PENDING, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    service_request = relationship("ServiceRequest", back_populates="pickups")

    def __repr__(self):
        return f"<PickupSchedule {self.id} Date: {self.pickup_date} Status: {self.status}>"

class RestorationUpdate(Base):
    __tablename__ = "restoration_updates"

    id = Column(Integer, primary_key=True, index=True)
    service_request_id = Column(Integer, ForeignKey("service_requests.id", ondelete="CASCADE"), nullable=False)
    status = Column(Enum(RestorationStatus), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    service_request = relationship("ServiceRequest", back_populates="updates")

    def __repr__(self):
        return f"<RestorationUpdate {self.id} Status: {self.status}>"

class ServiceImage(Base):
    __tablename__ = "service_images"

    id = Column(Integer, primary_key=True, index=True)
    service_request_id = Column(Integer, ForeignKey("service_requests.id", ondelete="CASCADE"), nullable=False)
    url = Column(String, nullable=False)
    image_type = Column(Enum(ServiceImageType), default=ServiceImageType.BEFORE, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    service_request = relationship("ServiceRequest", back_populates="images")

    def __repr__(self):
        return f"<ServiceImage {self.id} Type: {self.image_type}>"
