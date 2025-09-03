import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Menu, X, Shield, MapPin, User, ChevronDown, Edit, Save, XCircle } from "lucide-react";

interface HeaderProps {
  showProfileSection?: boolean;
}

interface UserProfile {
  name?: string;
  email: string;
  phone?: string;
  safePhone1?: string;
  safePhone2?: string;
  safeWorld?: string;
}

interface DriverProfile {
  fullName?: string;
  email: string;
  mobile?: string;
  vehicleModel?: string;
  vehicleNumber?: string;
  licenseNumber?: string;
  experience?: string;
  safePhone1?: string;
  safePhone2?: string;
  safeWorld?: string;
}

const Header: React.FC<HeaderProps> = ({ showProfileSection = true }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    updateUserData();
    window.addEventListener("storage", updateUserData);
    window.addEventListener("userDataChanged", updateUserData);

    return () => {
      window.removeEventListener("storage", updateUserData);
      window.removeEventListener("userDataChanged", updateUserData);
    };
  }, []);

  const handleHomeClick = () => navigate("/");
  const handleFeatureClick = () => navigate("/feature");
  const handleLocationClick = () => navigate("/location");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-3 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div onClick={handleHomeClick} className="cursor-pointer flex items-center group">
              <img
                src="https://res.cloudinary.com/dejquvzim/image/upload/v1748805738/r0fwucqbl4plyhlcjvzr.png"
                alt="ZARVA Logo"
                className="h-12 w-auto brightness-0 invert group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="hidden md:flex space-x-6">
              <button onClick={handleHomeClick} className="flex items-center space-x-2 hover:text-amber-200 px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30">
                <Home size={18} />
                <span>Home</span>
              </button>
              <button onClick={handleFeatureClick} className="flex items-center space-x-2 hover:text-amber-200 px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30">
                <Shield size={18} />
                <span>Features</span>
              </button>
              <button onClick={handleLocationClick} className="flex items-center space-x-2 hover:text-amber-200 px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30">
                <MapPin size={18} />
                <span>Location</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && showProfileSection && <Profile onLogout={handleLogout} />}

            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white hover:text-amber-200">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <button onClick={handleHomeClick} className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center">
              <Home size={18} className="mr-3" />
              <span>Home</span>
            </button>
            <button onClick={handleFeatureClick} className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center">
              <Shield size={18} className="mr-3" />
              <span>Features</span>
            </button>
            <button onClick={handleLocationClick} className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center">
              <MapPin size={18} className="mr-3" />
              <span>Location</span>
            </button>
            {isLoggedIn && (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center">
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [tempFormData, setTempFormData] = useState<any>({}); // Temporary data for editing
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = localStorage.getItem("role");
  const isDriver = role === "driver";

  useEffect(() => {
    fetchProfile();
  }, []);

  // Listen for userDataChanged events to refresh profile
  useEffect(() => {
    const handleUserDataChange = () => {
      fetchProfile();
    };

    window.addEventListener("userDataChanged", handleUserDataChange);
    return () => {
      window.removeEventListener("userDataChanged", handleUserDataChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setEditMode(false);
        setPasswordMode(false);
        setMessage("");
        setError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProfile = async () => {
    try {
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      if (!email || !role) {
        console.error("Email or role missing in localStorage");
        setLoading(false);
        return;
      }

      // Determine the correct endpoint based on role
      const endpoint = role === "driver" 
        ? "http://localhost:5000/api/driver/profile"
        : "http://localhost:5000/api/user/profile";

      console.log('📋 Fetching profile from backend:', endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      const userData = await response.json();
      console.log('📋 Profile data from backend:', userData);

      // Fetch safe data from localStorage
      const savedContacts = localStorage.getItem("savedContacts");
      const savedWords = localStorage.getItem("savedWords");
      
      let safeData = {};
      if (savedContacts) {
        const contacts = JSON.parse(savedContacts);
        safeData = {
          ...safeData,
          safePhone1: contacts.contact1 || "",
          safePhone2: contacts.contact2 || ""
        };
      }
      
      if (savedWords) {
        const words = JSON.parse(savedWords);
        // Join all saved words with comma for display
        safeData = {
          ...safeData,
          safeWorld: words.join(", ")
        };
      }

      // Merge backend data with safe data
      const mergedData = { ...userData, ...safeData };

      // Set profile data from backend
      setProfile(mergedData);
      setFormData(mergedData);
      setTempFormData(mergedData);
      
      // Update localStorage with fresh data from backend
      localStorage.setItem("user", JSON.stringify(mergedData));
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Failed to load profile");
      
      // Fallback to localStorage if backend fails
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        
        // Fetch safe data from localStorage for fallback
        const savedContacts = localStorage.getItem("savedContacts");
        const savedWords = localStorage.getItem("savedWords");
        
        let safeData = {};
        if (savedContacts) {
          const contacts = JSON.parse(savedContacts);
          safeData = {
            ...safeData,
            safePhone1: contacts.contact1 || "",
            safePhone2: contacts.contact2 || ""
          };
        }
        
        if (savedWords) {
          const words = JSON.parse(savedWords);
          safeData = {
            ...safeData,
            safeWorld: words.join(", ")
          };
        }
        
        const mergedData = { ...user, ...safeData };
        setProfile(mergedData);
        setFormData(mergedData);
        setTempFormData(mergedData);
        console.log('📋 Using fallback data from localStorage:', mergedData);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempFormData({ ...tempFormData, [e.target.name]: e.target.value }); // Update temporary data
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!email || !role) return;

    const endpoint =
      role === "driver"
        ? "http://localhost:5000/api/driver/profile"
        : "http://localhost:5000/api/user/profile";

    const payload = { ...tempFormData, email }; // Use temporary data

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedData = await res.json();
      
      // Update safe data in localStorage if it was modified
      if (tempFormData.safePhone1 !== undefined || tempFormData.safePhone2 !== undefined) {
        const savedContacts = localStorage.getItem("savedContacts");
        const contacts = savedContacts ? JSON.parse(savedContacts) : {};
        
        if (tempFormData.safePhone1 !== undefined) {
          contacts.contact1 = tempFormData.safePhone1;
        }
        if (tempFormData.safePhone2 !== undefined) {
          contacts.contact2 = tempFormData.safePhone2;
        }
        
        localStorage.setItem("savedContacts", JSON.stringify(contacts));
      }
      
      if (tempFormData.safeWorld !== undefined) {
        // Split the safe world string back into an array
        const words = tempFormData.safeWorld.split(",").map((word: string) => word.trim()).filter((word: string) => word);
        localStorage.setItem("savedWords", JSON.stringify(words));
      }
      
      setProfile(updatedData);
      setFormData(updatedData); // Update the main form data
      setTempFormData(updatedData); // Update temporary data
      
      // Update localStorage with new data
      localStorage.setItem("user", JSON.stringify(updatedData));
      
      setError("");
      setEditMode(false);
      setMessage("Profile updated successfully!");
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
      setMessage("");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!email || !role) return;

    const endpoint =
      role === "driver"
        ? "http://localhost:5000/api/auth/reset/direct"
        : "http://localhost:5000/api/auth/reset/direct";

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword: passwordData.newPassword
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Password update failed");
      }

      setMessage("Password updated successfully!");
      setError("");
      setPasswordMode(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Password update failed. Please try again.");
      setMessage("");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setEditMode(false);
    setPasswordMode(false);
    setMessage("");
    setError("");
  };

  const startEditMode = () => {
    setTempFormData({ ...formData }); // Copy current data to temp for editing
    setEditMode(true);
  };

  const getDisplayName = () => {
    if (!profile) return "User";
    return isDriver ? (profile as DriverProfile).fullName || "Driver" : (profile as UserProfile).name || "User";
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!profile) {
    return <span className="text-sm text-gray-300">Profile not found</span>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 hover:text-amber-200 px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30 transition-colors"
      >
        <User size={18} />
        <span className="text-sm font-medium">{getDisplayName()}</span>
        <ChevronDown size={16} className={`transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-96 z-50">
          <div
            className="bg-[#e1ded2] backdrop-blur-sm rounded-md p-6 mx-4 border border-[#bcb291] relative"
            style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setDropdownOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
              {!editMode && !passwordMode && (
                <button
                  onClick={startEditMode}
                  className="p-2 text-gray-600 hover:text-[#bcb291] hover:bg-white hover:bg-opacity-50 rounded-sm transition-all duration-200"
                >
                  <Edit size={16} />
                </button>
              )}
            </div>

            {message && (
              <div 
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-sm text-sm text-green-700"
                style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
              >
                {message}
              </div>
            )}

            {error && (
              <div 
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-600"
                style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
              >
                {error}
              </div>
            )}

            {!editMode && !passwordMode ? (
              <>
                <div className="grid grid-cols-2 grid-rows-3 gap-3">
                <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    {isDriver ? "Full Name" : "Name"}
                  </label>
                  <p className="text-gray-800 font-medium text-sm">
                    {isDriver ? (profile as DriverProfile).fullName : (profile as UserProfile).name}
                  </p>
                </div>

                <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Email</label>
                  <p className="text-gray-800 font-medium text-sm">{profile.email}</p>
                </div>

                <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    {isDriver ? "Mobile" : "Phone"}
                  </label>
                  <p className="text-gray-800 font-medium text-sm">
                    {isDriver ? (profile as DriverProfile).mobile : (profile as UserProfile).phone}
                  </p>
                </div>

                <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Safe Phone 1</label>
                  <p className="text-gray-800 font-medium text-sm">
                    {profile.safePhone1 || "Not set"}
                  </p>
                </div>

                <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Safe Phone 2</label>
                  <p className="text-gray-800 font-medium text-sm">
                    {profile.safePhone2 || "Not set"}
                  </p>
                </div>

                <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Safe World</label>
                  <p className="text-gray-800 font-medium text-sm">
                    {profile.safeWorld || "No words saved"}
                  </p>
                </div>

                {isDriver && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Vehicle Model</label>
                      <p className="text-gray-800 font-medium text-sm">{(profile as DriverProfile).vehicleModel}</p>
                    </div>

                    <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Vehicle Number</label>
                      <p className="text-gray-800 font-medium text-sm">{(profile as DriverProfile).vehicleNumber}</p>
                    </div>

                    {(profile as DriverProfile).licenseNumber && (
                      <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">License Number</label>
                        <p className="text-gray-800 font-medium text-sm">{(profile as DriverProfile).licenseNumber}</p>
                      </div>
                    )}

                    {(profile as DriverProfile).experience && (
                      <div className="bg-white bg-opacity-40 rounded-sm p-3" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Experience</label>
                        <p className="text-gray-800 font-medium text-sm">{(profile as DriverProfile).experience}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

                <div className="pt-4 border-t border-[#bcb291] border-opacity-30 space-y-3">
                  <div className="flex justify-center">
                    
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 font-medium"
                      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>  
                </div>
              </>
            ) : editMode ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {isDriver ? "Full Name" : "Name"}
                  </label>
                  <input
                    type="text"
                    name={isDriver ? "fullName" : "name"}
                    value={tempFormData[isDriver ? "fullName" : "name"] || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {isDriver ? "Mobile" : "Phone"}
                  </label>
                  <input
                    type="text"
                    name={isDriver ? "mobile" : "phone"}
                    value={tempFormData[isDriver ? "mobile" : "phone"] || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Safe Phone 1</label>
                  <input
                    type="text"
                    name="safePhone1"
                    value={tempFormData.safePhone1 || ""}
                    onChange={handleChange}
                    placeholder="Enter safe phone number 1"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Safe Phone 2</label>
                  <input
                    type="text"
                    name="safePhone2"
                    value={tempFormData.safePhone2 || ""}
                    onChange={handleChange}
                    placeholder="Enter safe phone number 2"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Safe World</label>
                  <input
                    type="text"
                    name="safeWorld"
                    value={tempFormData.safeWorld || ""}
                    onChange={handleChange}
                    placeholder="Enter safe words (comma separated)"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                {isDriver && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Model</label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={tempFormData.vehicleModel || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                        style={{ color: '#1f2937' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Number</label>
                      <input
                        type="text"
                        name="vehicleNumber"
                        value={tempFormData.vehicleNumber || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                        style={{ color: '#1f2937' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">License Number</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={tempFormData.licenseNumber || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                        style={{ color: '#1f2937' }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={tempFormData.experience || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder-gray-500"
                        style={{ color: '#1f2937' }}
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-2 pt-3">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 transition-colors text-sm"
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setTempFormData(formData); // Reset to original data
                      setError("");
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-sm hover:bg-gray-700 transition-colors text-sm"
                  >
                    <XCircle size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm text-gray-900 placeholder-gray-500"
                    style={{ color: '#1f2937' }}
                  />
                </div>

                <div className="flex space-x-2 pt-3">
                  <button
                    onClick={handlePasswordUpdate}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-[#a39b7e] text-white rounded-sm hover:bg-[#bcb292] transition-colors text-sm"
                  >
                    <Save size={14} />
                    <span>Update</span>
                  </button>
                  <button
                    onClick={() => {
                      setPasswordMode(false);
                      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setError("");
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-sm hover:bg-gray-700 transition-colors text-sm"
                  >
                    <XCircle size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;