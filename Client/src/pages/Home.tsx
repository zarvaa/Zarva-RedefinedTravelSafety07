import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Removed unused Appwrite OAuth imports
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
  const [googleReady, setGoogleReady] = useState(false);

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

  // Wait for Google Identity Services to be available
  useEffect(() => {
    const check = () => {
      if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
        setGoogleReady(true);
      } else {
        setTimeout(check, 200);
      }
    };
    check();
  }, []);

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

  const handleGoogleCredential = async (credential: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credential })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google login failed");
      }
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", "user");
      window.dispatchEvent(new Event("userDataChanged"));
      setIsLoggedIn(true);
      closeModal();
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(err.message || "Google authentication failed");
    }
  };

  const initGoogleButton = () => {
    if (!googleReady) return;
    const gis = (window as any).google;
    gis.accounts.id.initialize({
      client_id: (import.meta as any).env.VITE_GOOGLE_CLIENT_ID || "",
      callback: (res: any) => handleGoogleCredential(res.credential),
      ux_mode: "popup",
    });
    const button = document.getElementById("googleSignInButtonHome");
    if (button) {
      gis.accounts.id.renderButton(button, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
      });
    }
  };

  const handleUserSignup = async () => {
    try {
      setError("");
      
      // Validate required fields
      if (!name || !email || !password) {
        setError("Please fill in all required fields.");
        return;
      }
      
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (!email.includes('@')) {
        setError("Please enter a valid email address.");
        return;
      }

      console.log('📝 Home.tsx: Attempting signup for:', email);
      
      // Direct signup without OTP
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      console.log('Home.tsx: Signup response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message?.includes('already exists')) {
          throw new Error('User already exists. Please login instead.');
        }
        throw new Error(errorData.message || "Signup failed");
      }

      const user = await response.json();
      console.log('Home.tsx: Signup successful:', user);

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
        "http://localhost:5000/api/auth/reset/send-otp",
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
        "http://localhost:5000/api/auth/reset/verify",
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
          "http://localhost:5000/api/auth/send-otp",
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
    <div className="relative w-full no-scrollbar overflow-hidden">


      {/* Background Image */}
      
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
            {/* Google Sign-In */}
            <div className="flex flex-col items-center">
              <div id="googleSignInButtonHome" className="flex justify-center"></div>
              {googleReady && (
                <button
                  type="button"
                  onClick={initGoogleButton}
                  className="mt-3 w-full py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50"
                >
                  Continue with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZarvaApp;