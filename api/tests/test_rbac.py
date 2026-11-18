from fastapi.testclient import TestClient
from api.app.main import app

client = TestClient(app)

def test_api_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_list_tasks():
    response = client.get("/api/tasks")
    assert response.status_code == 200
    data = response.json()
    assert "tasks" in data
    assert data["count"] >= 1

def test_create_and_filter_tasks_by_role():
    new_task = {
        "project_id": "proj_02",
        "name": "Design 5 Festive Carousel Creatives",
        "role_required": "designer",
        "assigned_to": "user_designer",
        "base_fee": 1200.0,
        "deadline": "2026-10-30T18:00:00Z",
    }

    create_resp = client.post("/api/tasks", json=new_task)
    assert create_resp.status_code == 201

    # Filter by designer role
    designer_tasks = client.get("/api/tasks?role=designer")
    assert designer_tasks.status_code == 200
    tasks = designer_tasks.json()["tasks"]
    assert any(t["role_required"] == "designer" for t in tasks)

def test_kyc_validation():
    # Valid KYC
    valid_payload = {
        "user_id": "user_editor",
        "pan_number": "ABCDE1234F",
        "aadhaar_number_masked": "XXXX-XXXX-9012",
        "upi_id": "arun.editor@okhdfcbank",
    }
    resp = client.post("/api/onboarding/kyc", json=valid_payload)
    assert resp.status_code == 200
    assert resp.json()["status"] == "verified"

    # Invalid PAN
    invalid_payload = {
        "user_id": "user_editor",
        "pan_number": "INVALID_PAN_LONG",
    }
    bad_resp = client.post("/api/onboarding/kyc", json=invalid_payload)
    assert bad_resp.status_code == 400
