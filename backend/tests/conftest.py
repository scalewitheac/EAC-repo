import os
from typing import Iterator
import pytest
import requests

BASE_URL: str = os.environ.get(
    "REACT_APP_BACKEND_URL",
    "http://localhost:3000",
).rstrip("/")
ADMIN_EMAIL: str = os.environ.get("ADMIN_EMAIL", "")
ADMIN_PASSWORD: str = os.environ.get("ADMIN_PASSWORD", "")


@pytest.fixture(scope="session")
def base_url() -> str:
    return BASE_URL


@pytest.fixture(scope="session")
def api_client() -> Iterator[requests.Session]:
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    yield s
    s.close()


@pytest.fixture(scope="session")
def admin_token(api_client: requests.Session) -> str:
    if not ADMIN_EMAIL or not ADMIN_PASSWORD:
        pytest.skip("ADMIN_EMAIL / ADMIN_PASSWORD env vars not set; skipping auth tests")
    r = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    if r.status_code != 200:
        pytest.skip(f"Admin login failed: {r.status_code} {r.text}")
    return r.json()["token"]


@pytest.fixture(scope="session")
def admin_headers(admin_token: str) -> dict:
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}
