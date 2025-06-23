import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOAuthSession } from "../appwrite";
import { OAuthProvider } from "appwrite";
import { useAuthModal } from "../contexts/AuthModalContext";

// Helper
//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ZarvaApp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showLoginModal, closeLoginModal, openLoginModal } = useAuthModal();

  // Common States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // User Signup Specific
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Driver Signup Specific
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [isDriver, setIsDriver] = useState(false); // Toggle User/Driver forms

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const closeModal = () => {
    closeLoginModal();
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setFullName("");
    setMobile("");
    setVehicleModel("");
    setVehicleNumber("");
    setError("");
    setIsLogin(true);
  };

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    try {
      setError("");
      setIsLoading(true);
      await createOAuthSession(provider);
    } catch (error: any) {
      console.error("OAuth login error:", error);
      setError(`OAuth failed: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleUserSignup = async () => {
    try {
      if (!email || !password || !name) {
        setError("Please fill all required fields.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const user = await response.json();
      if (!response.ok) throw new Error(user.message || "Signup failed");

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", "user");
      window.dispatchEvent(new Event("userDataChanged"));
      setIsLoggedIn(true);
      closeModal();
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong");
    }
  };

  const handleUserLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const user = await response.json();
      if (!response.ok) throw new Error(user.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", "user");
      window.dispatchEvent(new Event("userDataChanged"));
      setIsLoggedIn(true);
      closeModal();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong");
    }
  };

  const handleDriverSignup = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/driver/registerDriver",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            mobile,
            email,
            vehicleModel,
            vehicleNumber,
            password,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");
      alert("Driver registered successfully!");
      setIsLogin(true);
    } catch (error: any) {
      console.error(error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  const handleDriverLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/driver/loginDriver",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", "driver");
      alert("Login successful!");
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setError("");
    setIsLoading(true);

    if (isDriver) {
      isLogin ? handleDriverLogin() : handleDriverSignup();
    } else {
      isLogin ? handleUserLogin() : handleUserSignup();
    }

    setIsLoading(false);
  };

  // Example navigation handlers
  const handleBookRide = () => navigate("/new");
  const handleSaferRoutes = () => navigate("/location");
  const handleSpeechRecognition = () => navigate("/speech");
  const handleGetStarted = () => navigate("/feature");

  // Optional: Uncomment this if you're enabling OAuth login with Appwrite

  // Show login modal when login button is clicked
  const handleLogin = () => {
    openLoginModal();
  };

  return (
    <div className="relative h-screen w-full no-scrollbar">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/car.png#what')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo */}
        <div className="absolute top-5 left-10 z-20">
          <img
            src="/logo.png"
            alt="ZARVA Logo"
            className="h-20 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Heading & Button */}
        <div className="flex-1 flex flex-col justify-center items-end text-right gap-6 px-6 pb-32">
          <h1 className="text-white text-5xl md:text-6xl mr-5 font-bold italic mb-8 leading-tight">
            Redefining Travel Safety
          </h1>

          <button
            onClick={isLoggedIn ? handleGetStarted : handleLogin}
            className="bg-amber-200 hover:bg-amber-300 text-black px-10 py-3 mr-72 rounded-full font-medium text-lg transition-colors duration-200"
          >
            {isLoggedIn ? "Get Started" : "Login"}
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="grid grid-cols-3">
            {[
              { label: "Book a Ride", onClick: handleBookRide },
              { label: "Safer Routes", onClick: handleSaferRoutes },
              { label: "Speech Recognition", onClick: handleSpeechRecognition },
            ].map(({ label, onClick }, index) => (
              <button
                key={index}
                onClick={onClick}
                className="group relative p-6 text-center border-r border-white border-opacity-100 hover:bg-black hover:bg-opacity-30 transition-all duration-300"
              >
                <div className="text-white text-3xl mb-2 font-semibold group-hover:text-amber-300 transition-colors duration-300">
                  {label}
                </div>
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[3px] bg-amber-300 transition-all duration-300 group-hover:w-3/4 rounded"></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>

          <div
            className="w-96 bg-[#e1ded2] backdrop-blur-sm rounded-2xl p-8 mx-4 border border-[#bcb291] relative z-10"
            style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 1)" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Toggle User/Driver */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  setIsDriver(false);
                  setIsLogin(true);
                  setError("");
                  setEmail("");
                  setPassword("");
                  setName("");
                  setPhone("");
                  setFullName("");
                  setMobile("");
                  setVehicleModel("");
                  setVehicleNumber("");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-l-full ${
                  !isDriver
                    ? "bg-[#bcb291] text-black"
                    : "bg-white text-gray-700"
                }`}
              >
                User
              </button>
              <button
                onClick={() => {
                  setIsDriver(true);
                  setIsLogin(true);
                  setError("");
                  setEmail("");
                  setPassword("");
                  setName("");
                  setPhone("");
                  setFullName("");
                  setMobile("");
                  setVehicleModel("");
                  setVehicleNumber("");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-r-full ${
                  isDriver
                    ? "bg-[#bcb291] text-black"
                    : "bg-white text-gray-700"
                }`}
              >
                Driver
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {isLogin ? "Login" : "Sign Up"} - {isDriver ? "Driver" : "User"}
              </h2>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* User Signup */}
              {!isDriver && !isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                </>
              )}

              {/* Driver Signup */}
              {isDriver && !isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Vehicle Model"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                </>
              )}

              {/* Common Fields */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
              />

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={(e) => {
                  if (isDriver) {
                    isLogin ? handleDriverLogin() : handleDriverSignup();
                  } else {
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
                className="w-full py-3 bg-[#bcb291] text-black font-semibold rounded-full hover:bg-amber-300 transition-all"
              >
                {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 font-semibold"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center justify-center">
              <div className="w-full border-t border-gray-400"></div>
              <span className="px-4 text-gray-600 text-sm">
                or continue with
              </span>
              <div className="w-full border-t border-gray-400"></div>
            </div>

            {/* OAuth */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleOAuthLogin(OAuthProvider.Google)}
                disabled={isLoading}
                className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full"
              >
                <img src="/google.png" alt="Google" className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleOAuthLogin(OAuthProvider.Apple)}
                disabled={isLoading}
                className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full"
              >
                <svg
                  className="w-5 h-5 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>
              <button
                onClick={() => handleOAuthLogin(OAuthProvider.Facebook)}
                disabled={isLoading}
                className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full"
              >
                <span className="text-black font-bold text-lg">f</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZarvaApp;
