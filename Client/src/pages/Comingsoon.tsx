import { useState } from "react";
import { X, Check, Bell, Mail } from "lucide-react";

export default function ComingSoon() {
  const [showModal, setShowModal] = useState(false);
  const [isAlreadyNotified, setIsAlreadyNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleGetNotified = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!email) {
        setErrorMessage("Please enter your email address.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      const response = await fetch(
        "https://zarva-redefinedtravelsafety17.onrender.com/api/notify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      // ✅ Allow both 200 (existing email) and 201 (new email)
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(result.message || "Something went wrong");
      }

      console.log("API Response:", result);

      setIsAlreadyNotified(result.alreadyNotified || false);
      setShowModal(true);
    } catch (err) {
      console.error("API Error:", err);
      if (err instanceof Error) {
        setErrorMessage(
          err.message || "An unexpected error occurred, please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsAlreadyNotified(false);
    setErrorMessage("");
    setEmail("");
  };

  const openModal = () => {
    setShowModal(true);
    setErrorMessage("");
  };
  return (
    <div className="h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23bcb291;stop-opacity:0.3" /><stop offset="100%" style="stop-color:%23654321;stop-opacity:0.1" /></radialGradient></defs><rect width="1000" height="1000" fill="url(%23grad1)"/></svg>')`,
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: "rgba(139, 69, 19, 0.15)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center h-screen">
        <div className="text-center relative w-full mx-auto">
          {/* Decorative Circles - Fixed desktop-like positioning */}
          <div
            className="absolute -top-40 -left-64 w-96 h-96 rounded-full animate-pulse"
            style={{
              backgroundColor: "#bcb291",
              opacity: 0.4,
              animation: "float 6s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute -top-20 -right-32 w-80 h-80 rounded-full"
            style={{
              backgroundColor: "#bcb291",
              opacity: 0.3,
              animation: "float 8s ease-in-out infinite reverse",
            }}
          ></div>
          <div
            className="absolute -bottom-32 left-16 w-72 h-72 rounded-full"
            style={{
              backgroundColor: "#bcb291",
              opacity: 0.35,
              animation: "float 7s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute bottom-10 -right-20 w-60 h-60 rounded-full"
            style={{
              backgroundColor: "#bcb291",
              opacity: 0.25,
              animation: "float 9s ease-in-out infinite reverse",
            }}
          ></div>

          {/* Main Content */}
          <div className="relative z-20">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-bold font-serif mb-6 lg:mb-8"
              style={{
                color: "#654321",
                fontFamily: "Brush Script MT",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                lineHeight: "1.1",
              }}
            >
              Coming Soon
            </h1>

            <div className="flex justify-center space-x-3 lg:space-x-4 mb-8 lg:mb-10">
              <div
                className="w-3 h-3 lg:w-4 lg:h-4 rounded-full animate-pulse"
                style={{ backgroundColor: "#654321", animationDelay: "0s" }}
              ></div>
              <div
                className="w-3 h-3 lg:w-4 lg:h-4 rounded-full animate-pulse"
                style={{ backgroundColor: "#654321", animationDelay: "0.5s" }}
              ></div>
              <div
                className="w-3 h-3 lg:w-4 lg:h-4 rounded-full animate-pulse"
                style={{ backgroundColor: "#654321", animationDelay: "1s" }}
              ></div>
            </div>

            <div className="mb-8 mx-auto">
              <p className="text-gray-800 text-base lg:text-lg mb-1 font-medium">
                An extra layer of safety, camera in cabs. Wanna know more about
                it?
              </p>
              <p className="text-gray-800 text-base lg:text-lg font-medium">
                Stay tuned!
              </p>
            </div>

            <div className="mx-auto mb-8">
              <button
                className="text-[#bcb291] px-10 py-4 lg:px-14 lg:py-5 rounded-full font-bold text-lg lg:text-xl xl:text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
                style={{ backgroundColor: "#654321" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor =
                    "#A0522D";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor =
                    "#654321";
                }}
                onClick={openModal}
              >
                <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-base lg:text-lg xl:text-xl">
                  Get Notified
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay - Only show when NOT already notified */}
      {showModal && !isAlreadyNotified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal Card */}
          <div className="relative z-10 max-w-md w-full mx-4 transform transition-all duration-300 animate-modalSlideIn ">
            <div className="bg-[#ece9df] rounded-2xl p-8 shadow-2xl relative">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Notify me about the launch
                </h3>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-800 rounded-xl hover:shadow-lg hover:shadow-black text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    placeholder="Email Address"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4">
                  <p className="text-red-600 text-sm font-medium text-center">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Get Notified Button */}
              <button
                onClick={handleGetNotified}
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:opacity-90 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-black "
                style={{
                  backgroundColor: "#bcb291",
                  color: "#654321",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Get Notified"
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal - Show when already notified */}
      {showModal && isAlreadyNotified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative z-10 max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full mx-auto bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              You're already on the list!
            </h3>
            <p className="text-gray-600">
              Thanks! You're already part of our early access list.
            </p>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="text-gray-500" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }
        
        @media (max-width: 640px) {
          .animate-pulse {
            animation-duration: 2s;
          }
        }
      `}</style>
    </div>
  );
}
