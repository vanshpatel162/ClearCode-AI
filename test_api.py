
from fastapi.testclient import TestClient

import main

client = TestClient(main.app)


def test_home_page():
    response = client.get("/")

    assert response.status_code == 200
    assert "ClearCode AI" in response.text


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_analyze_code_success(monkeypatch):
    # Replace the real Gemini call with a fake response.
    def fake_explain_python_error(code):
        return {
            "error_meaning": "The list index is out of range.",
            "likely_cause": "The code accesses an index that does not exist.",
            "fix_steps": ["Use a valid list index."],
            "corrected_code": "numbers = [1, 2, 3]\nprint(numbers[2])",
            "prevention_tip": "Check list length before indexing."
        }

    monkeypatch.setattr(
        main,
        "explain_python_error",
        fake_explain_python_error
    )

    response = client.post(
        "/api/analyze-code",
        json={"code": "numbers = [1, 2, 3]\nprint(numbers[5])"}
    )

    assert response.status_code == 200

    data = response.json()
    assert data["success"] is True
    assert data["analysis"]["error_meaning"] == (
        "The list index is out of range."
    )


def test_analyze_code_rejects_empty_code():
    response = client.post(
        "/api/analyze-code",
        json={"code": ""}
    )

    assert response.status_code == 422


def test_analyze_code_rejects_missing_code():
    response = client.post(
        "/api/analyze-code",
        json={}
    )

    assert response.status_code == 422


def test_analyze_code_handles_ai_failure(monkeypatch):
    def fake_ai_failure(code):
        raise RuntimeError("Simulated AI failure")

    monkeypatch.setattr(
        main,
        "explain_python_error",
        fake_ai_failure
    )

    response = client.post(
        "/api/analyze-code",
        json={"code": "print('hello')"}
    )

    assert response.status_code == 502
    assert response.json()["detail"] == (
    "AI service is temporarily unavailable. Please try again."
    )
