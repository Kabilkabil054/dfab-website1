"""Backend API tests for DFAB Stainless System website"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Health & Root
class TestHealthAndRoot:
    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert "message" in r.json()

# Contact Form
class TestContact:
    def test_submit_contact(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "email": "test@example.com",
            "phone": "9876543210",
            "subject": "Test Inquiry",
            "message": "This is a test message from automated testing"
        })
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "success"
        assert "message" in data

    def test_contact_invalid_email(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "email": "not-an-email",
            "subject": "Test",
            "message": "Test message"
        })
        assert r.status_code == 422

# Blog Posts
class TestBlog:
    def test_get_blog_posts(self):
        r = requests.get(f"{BASE_URL}/api/blog/posts")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_get_nonexistent_post(self):
        r = requests.get(f"{BASE_URL}/api/blog/posts/nonexistent-id-xyz")
        assert r.status_code == 404

# Admin Auth
class TestAdmin:
    def test_admin_login_success(self):
        r = requests.post(f"{BASE_URL}/api/admin/login", json={"password": "dfab@admin2026"})
        assert r.status_code == 200
        assert "token" in r.json()

    def test_admin_login_wrong_password(self):
        r = requests.post(f"{BASE_URL}/api/admin/login", json={"password": "wrongpassword"})
        assert r.status_code == 401

    def test_admin_get_posts_no_auth(self):
        r = requests.get(f"{BASE_URL}/api/admin/blog/posts")
        assert r.status_code == 401

    def test_admin_full_crud(self):
        # Login
        login_r = requests.post(f"{BASE_URL}/api/admin/login", json={"password": "dfab@admin2026"})
        assert login_r.status_code == 200
        token = login_r.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Create post
        create_r = requests.post(f"{BASE_URL}/api/admin/blog/posts", headers=headers, json={
            "title": "TEST_Post Title",
            "content": "Test content body",
            "excerpt": "Test excerpt",
            "author": "TEST Author",
            "category": "Testing",
            "tags": ["test"],
            "published": True
        })
        assert create_r.status_code == 200
        post = create_r.json()
        assert post["title"] == "TEST_Post Title"
        post_id = post["id"]

        # Read via public
        get_r = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_r.status_code == 200
        assert get_r.json()["title"] == "TEST_Post Title"

        # Update
        update_r = requests.put(f"{BASE_URL}/api/admin/blog/posts/{post_id}", headers=headers, json={
            "title": "TEST_Post Updated",
            "content": "Updated content",
            "excerpt": "Updated excerpt",
            "author": "TEST Author",
            "category": "Testing",
            "tags": ["test"],
            "published": True
        })
        assert update_r.status_code == 200
        assert update_r.json()["title"] == "TEST_Post Updated"

        # Delete
        del_r = requests.delete(f"{BASE_URL}/api/admin/blog/posts/{post_id}", headers=headers)
        assert del_r.status_code == 200

        # Verify deleted
        get_after_del = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_after_del.status_code == 404

# Chat
class TestChat:
    def test_chat_endpoint(self):
        r = requests.post(f"{BASE_URL}/api/chat", json={
            "session_id": "test-session-12345",
            "message": "What services does DFAB offer?"
        }, timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "response" in data
        assert len(data["response"]) > 0
