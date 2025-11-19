import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getUserById, partialUpdateUser } from "../../services/userService";
import { getUserIdFromToken } from "../../utils/auth";

export default function UserProfile() {
    const userId = getUserIdFromToken();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!userId) {
            toast.error("User not found. Please log in again.");
            return;
        }

        const fetchUser = async () => {
            try {
                const data = await getUserById(userId);
                setUser(data);
            } catch (err) {
                toast.error("Failed to load user info");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await partialUpdateUser(userId, {
                first_name: user.first_name,
                last_name: user.last_name,
                university: user.university,
                faculty: user.faculty,
                phone: user.phone,
            });
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    // 👇 هنا بنمنع الخطأ
    if (loading) return <Spinner animation="border" className="text-light" />;
    if (!user) return <p className="text-center text-danger">No user data found</p>;

    return (
        <div className="container mt-5 text-white">
            <h2>User Profile</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={user.first_name || ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={user.last_name || ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>University</Form.Label>
                    <Form.Control
                        type="text"
                        name="university"
                        value={user.university || ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Faculty</Form.Label>
                    <Form.Control
                        type="text"
                        name="faculty"
                        value={user.faculty || ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={user.phone || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </Form>
        </div>
    );
}
