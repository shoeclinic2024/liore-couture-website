from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.service import ServiceRequest, PickupSchedule, RestorationUpdate, ServiceImage, RestorationStatus, PickupStatus
from app.models.user import User, UserRole
from app.schemas.service import (
    ServiceRequestCreate,
    ServiceRequestResponse,
    ServiceRequestUpdate,
    PickupScheduleCreate,
    PickupScheduleResponse,
    RestorationUpdateCreate,
    RestorationUpdateResponse,
    ServiceImageCreate,
    ServiceImageResponse
)
from app.api import deps

router = APIRouter()

# Customer Routes
@router.post("/", response_model=ServiceRequestResponse, status_code=status.HTTP_201_CREATED)
def create_service_request(
    request_in: ServiceRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # 1. Create the Service Request
    db_request = ServiceRequest(
        user_id=current_user.id,
        item_type=request_in.item_type,
        brand=request_in.brand,
        description=request_in.description,
        status=RestorationStatus.REQUEST_SUBMITTED
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    # 2. Add the Initial Update log
    initial_update = RestorationUpdate(
        service_request_id=db_request.id,
        status=RestorationStatus.REQUEST_SUBMITTED,
        notes="Service request submitted. Awaiting pickup schedule."
    )
    db.add(initial_update)

    # 3. Create Pickup if details provided
    if request_in.pickup_details:
        db_pickup = PickupSchedule(
            service_request_id=db_request.id,
            pickup_date=request_in.pickup_details.pickup_date,
            address=request_in.pickup_details.address,
            contact_phone=request_in.pickup_details.contact_phone,
            status=PickupStatus.PENDING
        )
        db.add(db_pickup)
        
        # Advance status to PICKUP_SCHEDULED automatically
        db_request.status = RestorationStatus.PICKUP_SCHEDULED
        pickup_update = RestorationUpdate(
            service_request_id=db_request.id,
            status=RestorationStatus.PICKUP_SCHEDULED,
            notes=f"Pickup scheduled for {request_in.pickup_details.pickup_date}."
        )
        db.add(pickup_update)

    db.commit()
    db.refresh(db_request)
    return db_request

@router.get("/me", response_model=List[ServiceRequestResponse])
def list_my_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    return db.query(ServiceRequest).filter(ServiceRequest.user_id == current_user.id).all()

@router.get("/{request_id}", response_model=ServiceRequestResponse)
def read_service_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    db_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Service request not found")
    
    # Restrict to the requesting customer unless staff
    if current_user.role == UserRole.CUSTOMER and db_request.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this request")
        
    return db_request

@router.post("/{request_id}/approve", response_model=ServiceRequestResponse)
def approve_quotation(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    db_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Service request not found")
    
    if db_request.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if db_request.status != RestorationStatus.QUOTATION_APPROVAL:
        raise HTTPException(status_code=400, detail="Quotation is not pending approval")
        
    db_request.quotation_approved = True
    db_request.status = RestorationStatus.IN_PROGRESS
    
    # Log state update
    update = RestorationUpdate(
        service_request_id=db_request.id,
        status=RestorationStatus.IN_PROGRESS,
        notes="Quotation approved by client. Restoration process started."
    )
    db.add(update)
    db.commit()
    db.refresh(db_request)
    return db_request

# Admin/Technician Operations
@router.get(
    "/",
    response_model=List[ServiceRequestResponse],
    dependencies=[Depends(deps.RoleChecker([UserRole.TECHNICIAN, UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def list_all_requests(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
) -> Any:
    return db.query(ServiceRequest).offset(skip).limit(limit).all()

@router.put(
    "/{request_id}/status",
    response_model=ServiceRequestResponse,
    dependencies=[Depends(deps.RoleChecker([UserRole.TECHNICIAN, UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def update_request_status(
    request_id: int,
    status_update: RestorationUpdateCreate,
    db: Session = Depends(get_db)
) -> Any:
    db_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Service request not found")
    
    db_request.status = status_update.status
    
    # Log state transition
    update = RestorationUpdate(
        service_request_id=db_request.id,
        status=status_update.status,
        notes=status_update.notes or f"Restoration status updated to: {status_update.status.value}"
    )
    db.add(update)
    db.commit()
    db.refresh(db_request)
    return db_request

@router.put(
    "/{request_id}/quote",
    response_model=ServiceRequestResponse,
    dependencies=[Depends(deps.RoleChecker([UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def set_request_quotation(
    request_id: int,
    estimated_cost: float,
    db: Session = Depends(get_db)
) -> Any:
    db_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Service request not found")
    
    db_request.estimated_cost = estimated_cost
    db_request.status = RestorationStatus.QUOTATION_APPROVAL
    
    update = RestorationUpdate(
        service_request_id=db_request.id,
        status=RestorationStatus.QUOTATION_APPROVAL,
        notes=f"Inspection complete. Quotation prepared: ${estimated_cost:.2f}. Awaiting client approval."
    )
    db.add(update)
    db.commit()
    db.refresh(db_request)
    return db_request

@router.post(
    "/{request_id}/images",
    response_model=ServiceImageResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(deps.RoleChecker([UserRole.TECHNICIAN, UserRole.ADMIN, UserRole.SUPER_ADMIN]))]
)
def upload_request_image(
    request_id: int,
    image_in: ServiceImageCreate,
    db: Session = Depends(get_db)
) -> Any:
    db_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not db_request:
        raise HTTPException(status_code=404, detail="Service request not found")
        
    db_image = ServiceImage(
        service_request_id=request_id,
        url=image_in.url,
        image_type=image_in.image_type
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image
