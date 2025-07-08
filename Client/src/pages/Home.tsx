import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOAuthSession } from "../appwrite";
import { OAuthProvider } from "appwrite";
import { useAuthModal } from "../contexts/AuthModalContext";
import HomePage from "./HomePage";

// Helper
//const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type ZarvaAppProps = {
  initialRole?: "user" | "driver";
  initialMode?: "login" | "signup";
};

const ZarvaApp: React.FC<ZarvaAppProps> = ({ initialRole = "user", initialMode = "login" }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [isDriver, setIsDriver] = useState(initialRole === "driver");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showLoginModal, closeLoginModal, openLoginModal,mode, role} = useAuthModal();

  useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    setIsLoggedIn(true);
  }
}, []);

// 🔽 Add this one below
useEffect(() => {
  setIsLogin(mode === 'login');
  setIsDriver(role === 'driver');
}, [mode, role]);

  // Common States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // User Signup Specific
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Driver Signup Specific
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

    //reset-password
  // Forgot Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotUserType, setForgotUserType] = useState("user"); // or "driver"
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [otpSentForReset, setOtpSentForReset] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);


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
 
      if (!otpSent) {
        // Step 1: Send OTP
        const response = await fetch(
          "https://zarva-redefinedtravelsafety17.onrender.com/api/auth/send-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to send OTP");

        alert("OTP sent to your email. Please check your inbox.");
        setOtpSent(true);
        return;
      }

      // Step 2: Verify OTP + Signup
      if (!otp) {
        setError("Please enter the OTP sent to your email.");
        return;
      }

      const response = await fetch("https://zarva-redefinedtravelsafety17.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, otp }),
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
  //reset-password
  const handleSendResetOTP = async () => {
    if (!forgotEmail) {
      alert("Enter your registered email");
      return;
    }

    try {
      const response = await fetch(
        "https://zarva-redefinedtravelsafety17.onrender.com/api/auth/reset/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotEmail,
            userType: forgotUserType,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");

      alert("OTP sent to your email!");
      setOtpSentForReset(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to send OTP");
    }
  };

  //reset-password
  const handleResetPassword = async () => {
    if (!forgotEmail || !forgotOtp || !forgotNewPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://zarva-redefinedtravelsafety17.onrender.com/api/auth/reset/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: forgotEmail,
            otp: forgotOtp,
            newPassword: forgotNewPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to reset password");

      alert("Password reset successful. You can now log in.");
      setOtpSentForReset(false);
      setForgotEmail("");
      setForgotOtp("");
      setForgotNewPassword("");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to reset password");
    }
  };

  const handleUserLogin = async () => {
    try {
      const response = await fetch("https://zarva-redefinedtravelsafety17.onrender.com/api/auth/login", {
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
      if (
        !email ||
        !password ||
        !fullName ||
        !mobile ||
        !vehicleModel ||
        !vehicleNumber
      ) {
        setError("Please fill all required fields.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (!otpSent) {
        // Step 1: Send OTP
        const response = await fetch(
          "https://zarva-redefinedtravelsafety17.onrender.com/api/auth/send-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to send OTP");

        alert("OTP sent to your email. Please check your inbox.");
        setOtpSent(true);
        return;
      }

      // Step 2: Verify OTP + Signup
      if (!otp) {
        setError("Please enter the OTP sent to your email.");
        return;
      }

      const response = await fetch(
        "https://zarva-redefinedtravelsafety17.onrender.com/api/driver/registerDriver",
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
            otp,
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
        "https://zarva-redefinedtravelsafety17.onrender.com/api/driver/loginDriver",
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
  const handleBookRide = () => navigate("/");
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
         <HomePage
      isLoggedIn={isLoggedIn}
      handleGetStarted={handleGetStarted}
      handleLogin={handleLogin}
      handleBookRide={handleBookRide}
      handleSaferRoutes={handleSaferRoutes}
      handleSpeechRecognition={handleSpeechRecognition}
      navigate={navigate}
    />

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

            {/* Header */}
            <div className="text-center mb-6 ">
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
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <img
                       src="/account.png"
                       alt="name"
                       className="w-5 h-5"
                     />
                   </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                   />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        src="/call.png"
                        alt="phone"
                        className="w-5 h-5"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                    />
                  </div>
                </>
               )
              }

              {/* Driver Signup */}
              {isDriver && !isLogin && (
                <>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        src="/account.png"
                        alt="name"
                        className="w-5 h-5"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                  </div>


                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <img
                        src="/call.png"
                        alt="phone"
                        className="w-5 h-5"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                   />
                  </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      src="/car.1.png"
                      alt="vehicle"
                      className="w-5 h-5"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Vehicle Model"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                   />
                  </div>


                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      src="/car.1.png"
                      alt="vehicle"
                      className="w-5 h-5"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                   />
                  </div>
                </>
              )}

              {/* Common Fields */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      src="/message.png"
                      alt="vehicle"
                      className="w-5 h-5"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                  />
                </div>


              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    src="/lock key.png"
                    alt="password"
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-3  border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                />
              </div>


              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                    onClick={() => setShowForgotPassword(!showForgotPassword)} 
                  >
                    Forgot password?
                  </button>
                </div>
              )}
                            {showForgotPassword && (
                <div className="p-4 border mt-4">
                  <h3 className="font-bold mb-2">Forgot Password</h3>

                  <input
                    className="border p-2 w-full mb-2"
                    type="email"
                    placeholder="Registered Email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />

                  <select
                    className="border p-2 w-full mb-2"
                    value={forgotUserType}
                    onChange={(e) => setForgotUserType(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="driver">Driver</option>
                  </select>

                  {!otpSentForReset ? (
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={handleSendResetOTP}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <input
                        className="border p-2 w-full mb-2"
                        type="text"
                        placeholder="Enter OTP"
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                      />

                      <input
                        className="border p-2 w-full mb-2"
                        type="password"
                        placeholder="New Password"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                      />

                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={handleResetPassword}
                      >
                        Reset Password
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* OTP Field (shown if OTP has been sent and not in login mode) */}
              {!isLogin && otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
                />
              )}

              {/* Submit */}
              <div className="flex justify-center">
              <button
                onClick={(e) => {
                  if (isDriver) {
                    isLogin ? handleDriverLogin() : handleDriverSignup();
                  } else {
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
                className="w-32 py-3 bg-[#bcb291] text-black font-semibold rounded-full hover:bg-[#9a9379] transition-all flex justify-center shadow-[0_4px_10px_rgba(0,0,0,0.85)]"
              >
                {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </button>
              </div>

              {/* Toggle between Login/Signup */}

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
            <div className="my-6 flex items-center justify-center flex-row">
              <div className="w-full border-t-4 border-[#bcb291]"></div>
              <span className="px-4 text-gray-600 text-sm whitespace-nowrap">
                or continue with
              </span>
              <div className="w-full border-t-4 border-[#bcb291]"></div>
            </div>

            {/* OAuth */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleOAuthLogin(OAuthProvider.Google)}
                disabled={isLoading}
                className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-[#ceccc1] border border-[#bcb291] rounded-full"
              >
                <img src="/google.png" alt="Google" className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleOAuthLogin(OAuthProvider.Apple)}
                disabled={isLoading}
                className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-[#ceccc1] border border-[#bcb291] rounded-full"
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
                className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-[#ceccc1] border border-[#bcb291] rounded-full"
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