"""End-to-end backend API tests for the Creative Journal app."""
import os
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://creative-canvas-602.preview.emergentagent.com').rstrip('/')


# ---- Site password gate ----
class TestSitePassword:
    def test_wrong_password_401(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/site/verify-password", json={"password": "wrong"})
        assert r.status_code == 401

    def test_correct_password_ok(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/site/verify-password", json={"password": "pass"})
        assert r.status_code == 200
        assert r.json() == {"ok": True}


# ---- Auth login & me ----
class TestAuth:
    def test_login_wrong_creds(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/auth/login",
                            json={"email": "scalewitheac@gmail.com", "password": "wrong"})
        assert r.status_code == 401

    def test_login_success(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/auth/login",
                            json={"email": "scalewitheac@gmail.com", "password": "pass"})
        assert r.status_code == 200
        body = r.json()
        assert "token" in body and isinstance(body["token"], str) and len(body["token"]) > 20
        assert body["user"]["email"] == "scalewitheac@gmail.com"
        assert body["user"]["role"] == "admin"
        assert "_id" not in body["user"]

    def test_me_unauthorized(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401

    def test_me_with_token(self, api_client, admin_headers):
        r = api_client.get(f"{BASE_URL}/api/auth/me", headers=admin_headers)
        assert r.status_code == 200
        u = r.json()
        assert u["email"] == "scalewitheac@gmail.com"
        assert u["role"] == "admin"
        assert "_id" not in u
        assert "password_hash" not in u


# ---- Public content lists ----
class TestPublicContent:
    def test_list_drawings(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/drawings")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) >= 1
        for it in items:
            assert "_id" not in it
            assert "id" in it and "title" in it and "image_path" in it

    def test_list_writings(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/writings")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) >= 1
        assert all("_id" not in it for it in items)

    def test_list_videos(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/videos")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) >= 1
        assert all("_id" not in it for it in items)


# ---- Messages ----
class TestMessages:
    def test_list_public_only_approved(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/messages")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        for it in items:
            assert it.get("approved") is True
            assert "_id" not in it

    def test_list_all_requires_admin(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/messages?all=true")
        assert r.status_code == 401

    def test_list_all_with_admin(self, api_client, admin_headers):
        r = api_client.get(f"{BASE_URL}/api/messages?all=true", headers=admin_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_create_pending_then_approve_then_delete(self, api_client, admin_headers):
        payload = {
            "name": "TEST_tester",
            "email": "test@example.com",
            "website": "",
            "found_via": "pytest",
            "sender_descriptor": "automation",
            "message": "TEST_msg please ignore",
        }
        r = api_client.post(f"{BASE_URL}/api/messages", json=payload)
        assert r.status_code == 200
        m = r.json()
        assert m["approved"] is False
        assert m["name"] == "TEST_tester"
        assert "_id" not in m
        msg_id = m["id"]

        # Should not appear in public list
        pub = api_client.get(f"{BASE_URL}/api/messages").json()
        assert not any(x["id"] == msg_id for x in pub)

        # Approve requires admin
        r401 = api_client.patch(f"{BASE_URL}/api/messages/{msg_id}/approve")
        assert r401.status_code == 401

        r = api_client.patch(f"{BASE_URL}/api/messages/{msg_id}/approve", headers=admin_headers)
        assert r.status_code == 200

        pub = api_client.get(f"{BASE_URL}/api/messages").json()
        assert any(x["id"] == msg_id for x in pub)

        # Delete
        r = api_client.delete(f"{BASE_URL}/api/messages/{msg_id}", headers=admin_headers)
        assert r.status_code == 200

        # Confirm gone
        pub = api_client.get(f"{BASE_URL}/api/messages").json()
        assert not any(x["id"] == msg_id for x in pub)


# ---- Drawings / writings / videos admin CRUD ----
class TestAdminCRUD:
    def test_create_drawing_requires_admin(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/drawings", json={
            "title": "TEST_draw", "date": "01/01/2026",
            "image_path": "https://example.com/a.jpg", "tags": ["test"],
        })
        assert r.status_code == 401

    def test_drawing_crud(self, api_client, admin_headers):
        payload = {"title": "TEST_drawing", "date": "01/01/2026",
                   "image_path": "https://example.com/x.jpg", "tags": ["test"],
                   "description": "TEST"}
        r = api_client.post(f"{BASE_URL}/api/drawings", json=payload, headers=admin_headers)
        assert r.status_code == 200
        d = r.json()
        assert d["title"] == "TEST_drawing"
        assert "id" in d
        assert "_id" not in d
        did = d["id"]
        # Confirm appears in list
        lst = api_client.get(f"{BASE_URL}/api/drawings").json()
        assert any(x["id"] == did for x in lst)
        # Delete requires admin
        assert api_client.delete(f"{BASE_URL}/api/drawings/{did}").status_code == 401
        r = api_client.delete(f"{BASE_URL}/api/drawings/{did}", headers=admin_headers)
        assert r.status_code == 200
        lst = api_client.get(f"{BASE_URL}/api/drawings").json()
        assert not any(x["id"] == did for x in lst)

    def test_writing_crud(self, api_client, admin_headers):
        r = api_client.post(f"{BASE_URL}/api/writings", json={
            "title": "TEST_writing", "date": "01/01/2026",
            "content": "TEST content here", "tags": ["t"]
        }, headers=admin_headers)
        assert r.status_code == 200
        wid = r.json()["id"]
        assert "_id" not in r.json()
        assert api_client.delete(f"{BASE_URL}/api/writings/{wid}").status_code == 401
        assert api_client.delete(f"{BASE_URL}/api/writings/{wid}", headers=admin_headers).status_code == 200

    def test_video_crud(self, api_client, admin_headers):
        r = api_client.post(f"{BASE_URL}/api/videos", json={
            "title": "TEST_video", "date": "01/01/2026",
            "external_url": "https://www.youtube.com/embed/abc",
            "tags": ["t"], "description": ""
        }, headers=admin_headers)
        assert r.status_code == 200
        vid = r.json()["id"]
        assert "_id" not in r.json()
        assert api_client.delete(f"{BASE_URL}/api/videos/{vid}").status_code == 401
        assert api_client.delete(f"{BASE_URL}/api/videos/{vid}", headers=admin_headers).status_code == 200

    def test_delete_nonexistent(self, api_client, admin_headers):
        r = api_client.delete(f"{BASE_URL}/api/drawings/does-not-exist", headers=admin_headers)
        assert r.status_code == 404


# ---- Upload + file fetch (best-effort; depends on Emergent storage) ----
class TestUpload:
    def test_upload_requires_admin(self):
        files = {"file": ("a.txt", b"hi", "text/plain")}
        r = requests.post(f"{BASE_URL}/api/upload", files=files)
        assert r.status_code == 401

    def test_upload_and_fetch(self, admin_token):
        files = {"file": ("test_upload.txt", b"hello-creative-journal", "text/plain")}
        r = requests.post(f"{BASE_URL}/api/upload",
                          files=files,
                          headers={"Authorization": f"Bearer {admin_token}"})
        if r.status_code == 500:
            pytest.skip(f"Storage unavailable (500): {r.text}")
        assert r.status_code == 200, r.text
        body = r.json()
        assert "storage_path" in body and body["storage_path"]
        sp = body["storage_path"]
        rf = requests.get(f"{BASE_URL}/api/files/{sp}")
        assert rf.status_code == 200
        assert rf.content == b"hello-creative-journal"
