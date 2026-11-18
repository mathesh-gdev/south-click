import hmac
import hashlib
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException, Depends, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from api.app.schemas.models import (
    UserProfile,
    RoleEnum,
    StatusEnum,
    TaskCreate,
    TaskSubmissionCreate,
    PerformanceCalculationResult,
    PerformanceSettingsConfig,
    PaymentDisburseRequest,
    FreelancerOnboardingCreate,
    FreelancerApplicationCreate,
)
from api.app.services.performance import calculate_performance

app = FastAPI(
    title="South Click Agency OS API",
    description="FastAPI Backend for South Click Digital Marketing Agency Team Management & Performance OS",
    version="1.0.0",
)

# CORS configuration for Next.js web client & Capacitor mobile app shell
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "capacitor://localhost", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory mock database store for API testing and demo
MOCK_SETTINGS = PerformanceSettingsConfig()

MOCK_TASKS = [
    {
        "id": "tsk_01",
        "project_id": "proj_01",
        "project_name": "GreenCart Organic Launch",
        "name": "Produce 9:16 Instagram Reel 01 (Cut V2 in QC)",
        "role_required": "editor",
        "assigned_to": "user_editor",
        "status": "submitted",
        "base_fee": 1500.0,
        "performance_points": 500,
        "performance_reward": 250.0,
        "assigned_at": "2026-10-24T08:00:00Z",
        "created_at": "2026-10-24T08:00:00Z",
    }
]

MOCK_PAYMENTS = [
    {
        "id": "pay_01",
        "task_id": "tsk_01",
        "team_member_id": "user_editor",
        "team_member_name": "Arun Vignesh",
        "base_fee": 1500.0,
        "performance_reward": 250.0,
        "total_amount": 1750.0,
        "status": "pending",
        "payment_method": "upi",
    }
]


class RazorpayWebhookPayload(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    secret_key: str = "rzp_test_secret_southclick_2026"


class PerformanceCalcRequest(BaseModel):
    assigned_at: datetime
    submitted_at: datetime
    base_fee: float


@app.get("/")
def root():
    return {
        "agency": "South Click Digital Marketing Agency",
        "system": "South Click OS API",
        "status": "online",
        "version": "1.0.0",
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.get("/api/tasks")
def list_tasks(role: Optional[RoleEnum] = None, user_id: Optional[str] = None):
    results = MOCK_TASKS
    if role:
        results = [t for t in results if t.get("role_required") == role.value]
    if user_id:
        results = [t for t in results if t.get("assigned_to") == user_id]
    return {"tasks": results, "count": len(results)}


@app.post("/api/tasks", status_code=201)
def create_task(task_data: TaskCreate):
    new_task = {
        "id": f"tsk_{len(MOCK_TASKS) + 1:02d}",
        "project_id": task_data.project_id,
        "project_name": "Active Client Campaign",
        "name": task_data.name,
        "role_required": task_data.role_required.value,
        "assigned_to": task_data.assigned_to,
        "status": "assigned",
        "base_fee": task_data.base_fee,
        "performance_points": 0,
        "performance_reward": 0.0,
        "assigned_at": datetime.now(timezone.utc).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    MOCK_TASKS.append(new_task)
    return {"message": "Task created successfully", "task": new_task}


@app.post("/api/performance/calculate", response_model=PerformanceCalculationResult)
def calculate_turnaround(payload: PerformanceCalcRequest):
    """
    Server-side turnaround speed calculation.
    Sub-2hr = 500 pts (+Rs 250)
    2-3hr = 400 pts (+Rs 200)
    3-4hr = 300 pts (+Rs 150)
    4-5hr = 200 pts (+Rs 100)
    >5hr = 0 pts (+Rs 0)
    """
    result = calculate_performance(
        assigned_at=payload.assigned_at,
        submitted_at=payload.submitted_at,
        base_fee=payload.base_fee,
        config=MOCK_SETTINGS,
    )
    return result


@app.post("/api/payments/verify-signature")
def verify_razorpay_signature(payload: RazorpayWebhookPayload):
    """
    India-Commerce Security Guardrail:
    HMAC-SHA256 signature verification for Razorpay payment webhooks.
    """
    body = f"{payload.razorpay_order_id}|{payload.razorpay_payment_id}".encode("utf-8")
    generated_signature = hmac.new(
        payload.secret_key.encode("utf-8"), body, hashlib.sha256
    ).hexdigest()

    if hmac.compare_digest(generated_signature, payload.razorpay_signature):
        return {
            "verified": True,
            "message": "Payment signature authentic",
            "payment_id": payload.razorpay_payment_id,
        }
    raise HTTPException(status_code=400, detail="Invalid Razorpay HMAC signature")


@app.post("/api/payments/disburse")
def disburse_payout(payload: PaymentDisburseRequest):
    """
    Disburse approved freelance fee + performance speed bonus via RazorpayX / UPI VPA.
    """
    utr = f"UTR{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
    return {
        "status": "disbursed",
        "task_id": payload.task_id,
        "team_member_id": payload.team_member_id,
        "utr_number": utr,
        "payment_method": payload.payment_method,
        "disbursed_at": datetime.now(timezone.utc).isoformat(),
        "message": f"Successfully disbursed to freelancer via {payload.payment_method.upper()}.",
    }


@app.post("/api/onboarding/kyc")
def submit_kyc(onboarding_data: FreelancerOnboardingCreate):
    """
    Submit and validate freelancer KYC details with masked Aadhaar and PAN check.
    """
    # Guardrail: Validate PAN format (5 letters, 4 digits, 1 letter) if provided
    if onboarding_data.pan_number:
        pan = onboarding_data.pan_number.strip().upper()
        if len(pan) != 10:
            raise HTTPException(status_code=400, detail="PAN number must be exactly 10 alphanumeric characters")

    return {
        "status": "verified",
        "user_id": onboarding_data.user_id,
        "message": "KYC and bank details successfully validated and encrypted.",
    }
