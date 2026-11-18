from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field, EmailStr

class RoleEnum(str, Enum):
    FOUNDER = "founder"
    EDITOR = "editor"
    DESIGNER = "designer"
    SMM = "smm"

class StatusEnum(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    SUSPENDED = "suspended"
    REJECTED = "rejected"
    ARCHIVED = "archived"

class PriorityEnum(str, Enum):
    URGENT = "urgent"
    HIGH = "high"
    NORMAL = "normal"
    LOW = "low"

class TaskStatusEnum(str, Enum):
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    REVISION_REQUIRED = "revision_required"
    RESUBMITTED = "resubmitted"
    APPROVED = "approved"
    COMPLETED = "completed"

class PaymentStatusEnum(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    PAID = "paid"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class UserProfile(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: RoleEnum
    status: StatusEnum = StatusEnum.ACTIVE
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    specialized_categories: List[str] = []

class FreelancerApplicationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    whatsapp: str
    location: str
    role: RoleEnum
    skills: List[str]
    experience_years: str
    software_tools: List[str]
    portfolio_url: str
    instagram_handle: Optional[str] = None
    bio: str

class FreelancerOnboardingCreate(BaseModel):
    user_id: str
    dob: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    aadhaar_number_masked: Optional[str] = None
    aadhaar_doc_url: Optional[str] = None
    pan_number: Optional[str] = None
    pan_doc_url: Optional[str] = None
    bank_account_holder: Optional[str] = None
    bank_name: Optional[str] = None
    bank_account_no: Optional[str] = None
    bank_ifsc: Optional[str] = None
    upi_id: Optional[str] = None

class ProjectCreate(BaseModel):
    name: str
    client_name: str
    description: Optional[str] = None
    project_type: str = "reels"
    priority: PriorityEnum = PriorityEnum.HIGH
    budget: float = 0.0
    deadline: datetime
    instructions: Optional[str] = None

class TaskCreate(BaseModel):
    project_id: str
    name: str
    role_required: RoleEnum
    assigned_to: Optional[str] = None
    description: Optional[str] = None
    instructions: Optional[str] = None
    deadline: datetime
    base_fee: float = 0.0

class TaskSubmissionCreate(BaseModel):
    task_id: str
    file_url: str
    file_name: str
    file_size_bytes: int = 0
    mime_type: Optional[str] = None
    notes: Optional[str] = None

class PerformanceSettingsConfig(BaseModel):
    tier_1_max_hours: float = 2.0
    tier_1_points: int = 500
    tier_2_max_hours: float = 3.0
    tier_2_points: int = 400
    tier_3_max_hours: float = 4.0
    tier_3_points: int = 300
    tier_4_max_hours: float = 5.0
    tier_4_points: int = 200
    tier_5_points: int = 0
    rate_per_100_pts: float = 50.0

class PerformanceCalculationResult(BaseModel):
    duration_hours: float
    performance_points: int
    performance_reward: float
    tier_achieved: str
    base_fee: float
    total_payable: float

class PaymentDisburseRequest(BaseModel):
    task_id: str
    team_member_id: str
    base_fee: float
    performance_reward: float
    payment_method: str = "upi"
    transaction_id: Optional[str] = None
    notes: Optional[str] = None
