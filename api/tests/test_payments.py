import hmac
import hashlib
from fastapi.testclient import TestClient
from api.app.main import app

client = TestClient(app)

def test_verify_authentic_razorpay_signature():
    secret = "rzp_test_secret_southclick_2026"
    order_id = "order_OXYZ12345678"
    payment_id = "pay_PXYZ87654321"

    body = f"{order_id}|{payment_id}".encode("utf-8")
    valid_signature = hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()

    response = client.post(
        "/api/payments/verify-signature",
        json={
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": valid_signature,
            "secret_key": secret,
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["verified"] is True
    assert data["payment_id"] == payment_id

def test_reject_tampered_razorpay_signature():
    secret = "rzp_test_secret_southclick_2026"
    order_id = "order_OXYZ12345678"
    payment_id = "pay_PXYZ87654321"
    tampered_signature = "invalid_tampered_signature_hex_123456"

    response = client.post(
        "/api/payments/verify-signature",
        json={
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": tampered_signature,
            "secret_key": secret,
        },
    )

    assert response.status_code == 400
    assert "Invalid Razorpay HMAC signature" in response.json()["detail"]

def test_disburse_payout():
    response = client.post(
        "/api/payments/disburse",
        json={
            "task_id": "tsk_01",
            "team_member_id": "user_editor",
            "base_fee": 1500.0,
            "performance_reward": 250.0,
            "payment_method": "upi",
            "notes": "Fast turnaround reel bonus release",
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "disbursed"
    assert data["utr_number"].startswith("UTR")
    assert data["payment_method"] == "upi"
