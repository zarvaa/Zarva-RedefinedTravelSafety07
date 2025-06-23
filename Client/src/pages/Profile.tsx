import { useEffect, useState } from "react";

interface UserProfile {
  name?: string;
  email: string;
  phone?: string;
}

interface DriverProfile {
  fullName?: string;
  email: string;
  mobile?: string;
  vehicleModel?: string;
  vehicleNumber?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!email || !role) {
      console.error("Email or role missing in localStorage");
      setLoading(false);
      return;
    }

    const endpoint =
      role === "driver"
        ? "http://localhost:5000/api/driver/profile"
        : "http://localhost:5000/api/user/profile";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setProfile(data);
      setFormData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!email || !role) return;

    const endpoint =
      role === "driver"
        ? "http://localhost:5000/api/driver/profile"
        : "http://localhost:5000/api/user/profile";

    const payload = { ...formData, email };

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedData = await res.json();
      setProfile(updatedData);
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setMessage("Update failed. Please try again.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (!profile) return <p style={{ textAlign: "center" }}>Profile not found or not logged in.</p>;

  return (
    <div style={{
      maxWidth: "500px",
      margin: "30px auto",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Profile</h2>

      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}

      {/* Name */}
      {"name" in profile && (
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>
      )}

      {"fullName" in profile && (
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          ) : (
            <p>{profile.fullName}</p>
          )}
        </div>
      )}

      {/* Email */}
      <div style={{ marginBottom: "15px" }}>
        <label>Email:</label>
        <p>{profile.email}</p>
      </div>

      {/* Phone */}
      {"phone" in profile && (
        <div style={{ marginBottom: "15px" }}>
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>
      )}

      {"mobile" in profile && (
        <div style={{ marginBottom: "15px" }}>
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          ) : (
            <p>{profile.mobile}</p>
          )}
        </div>
      )}

      {/* Vehicle Details for Drivers */}
      {"vehicleModel" in profile && (
        <>
          <div style={{ marginBottom: "15px" }}>
            <label>Vehicle Model:</label>
            {editMode ? (
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel || ""}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            ) : (
              <p>{profile.vehicleModel}</p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Vehicle Number:</label>
            {editMode ? (
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber || ""}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            ) : (
              <p>{profile.vehicleNumber}</p>
            )}
          </div>
        </>
      )}

      {/* Password Change */}
      {editMode && (
        <div style={{ marginBottom: "15px" }}>
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Leave blank to keep same"
            value={formData.password || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={() => setEditMode(!editMode)}
          style={{
            padding: "10px 20px",
            backgroundColor: editMode ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>

        {editMode && (
          <button
            onClick={handleUpdate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
