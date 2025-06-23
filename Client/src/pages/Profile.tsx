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

  useEffect(() => {
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

        if (!res.ok) {
          console.error("Failed to fetch profile");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found or not logged in.</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", boxShadow: "0 0 10px #ccc", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>

      {"name" in profile && <p><strong>Name:</strong> {profile.name}</p>}
      {"fullName" in profile && <p><strong>Name:</strong> {profile.fullName}</p>}

      <p><strong>Email:</strong> {profile.email}</p>

      {"phone" in profile && <p><strong>Phone:</strong> {profile.phone}</p>}
      {"mobile" in profile && <p><strong>Phone:</strong> {profile.mobile}</p>}

      {"vehicleModel" in profile && <p><strong>Vehicle Model:</strong> {profile.vehicleModel}</p>}
      {"vehicleNumber" in profile && <p><strong>Vehicle Number:</strong> {profile.vehicleNumber}</p>}
    </div>
  );
};

export default Profile;
