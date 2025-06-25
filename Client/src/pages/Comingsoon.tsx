import { useState } from 'react';
import { X, Check, Bell, Mail, Star, Sparkles } from 'lucide-react';

type NotifyResponse = {
  alreadyNotified: boolean;
  message?: string;
};

export default function ComingSoon() {
  const [showModal, setShowModal] = useState(false);
  const [isAlreadyNotified, setIsAlreadyNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetNotified = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Get email from localStorage
      const email = localStorage.getItem('email');
      
      if (!email) {
        setErrorMessage('No email found. Please make sure you are logged in.');
        return;
      }

      // Make actual API call
      const response = await fetch("https://zarva-redefinedtravelsafety17.onrender.com/api/notify", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NotifyResponse = await response.json();
      
      setIsAlreadyNotified(data.alreadyNotified);
      setShowModal(true);
      
    } catch (err) {
      console.error('API Error:', err);
      
      // Handle different types of errors
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setErrorMessage("Cannot connect to server. Please check if the API is running on localhost:5000");
      } else if (err instanceof Error) {
        setErrorMessage(err.message || "Something went wrong, please try again.");
      } else {
        setErrorMessage("An unexpected error occurred, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23bcb291;stop-opacity:0.3" /><stop offset="100%" style="stop-color:%23654321;stop-opacity:0.1" /></radialGradient></defs><rect width="1000" height="1000" fill="url(%23grad1)"/></svg>')`
        }}
      />
      
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.15)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 relative">
          
          {/* Decorative Circles */}
          <div 
            className="absolute -top-40 -left-64 w-96 h-96 rounded-full animate-pulse"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.4,
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute -top-20 -right-32 w-80 h-80 rounded-full"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.3,
              animation: 'float 8s ease-in-out infinite reverse'
            }}
          ></div>
          <div 
            className="absolute -bottom-32 left-16 w-72 h-72 rounded-full"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.35,
              animation: 'float 7s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute bottom-10 -right-20 w-60 h-60 rounded-full"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.25,
              animation: 'float 9s ease-in-out infinite reverse'
            }}
          ></div>
          
          {/* Main Content */}
          <div className="relative z-20">
            <h1 
              className="text-9xl md:text-[12rem] lg:text-[14rem] font-bold font-serif mb-8"
              style={{ 
                color: '#654321',
                fontFamily: 'Brush Script MT',
                textShadow: '3px 3px 6px rgba(0,0,0,0.2)'
              }}
            >
              Coming Soon
            </h1>
            
            <div className="flex justify-center space-x-4 mb-10">
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#654321', animationDelay: '0s' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#654321', animationDelay: '0.5s' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#654321', animationDelay: '1s' }}></div>
            </div>
            
            <div className="mb-8 max-w-md mx-auto">
              <p className="text-gray-800 text-lg mb-1 font-medium">
                An extra layer of safety, camera in cabs. Wanna know more about it?
              </p>
              <p className="text-gray-800 text-lg font-medium">
                Stay tuned!
              </p>
            </div>
            
            {/* Error Message Display */}
            {errorMessage && (
              <div className="max-w-md mx-auto mb-6">
                <p className="text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                  {errorMessage}
                </p>
              </div>
            )}
            
            <div className="max-w-md mx-auto mb-8">
              <button 
                className="text-[#bcb291] px-14 py-5 rounded-full font-bold text-xl md:text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
                style={{ backgroundColor: '#654321' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#A0522D';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#654321';
                }}
                onClick={handleGetNotified}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#bcb291]"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Bell className="w-6 h-6" />
                    Get Notified
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(101, 67, 33, 0.3)' }}
            onClick={closeModal}
          ></div>
          
          {/* Modal Card */}
          <div className="relative z-10 max-w-md w-full mx-4 transform transition-all duration-300 animate-modalSlideIn">
            <div 
              className="rounded-3xl p-8 shadow-2xl border"
              style={{
                background: '#DBCFBF', 	
                backdropFilter: 'blur(20px)',
                borderColor: '#654321',
                borderWidth: '2px',
                boxShadow: '0 25px 50px -12px rgba(101, 67, 33, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(101, 67, 33, 0.2)',
                  color: '#654321'
                }}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Icon */}
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce"
                  style={{ 
                    backgroundColor: 'rgba(101, 67, 33, 0.2)',
                    border: '3px solid #654321'
                  }}
                >
                  {isAlreadyNotified ? (
                    <Star className="w-10 h-10" style={{ color: '#654321' }} />
                  ) : (
                    <Check className="w-10 h-10" style={{ color: '#654321' }} />
                  )}
                </div>
                
                <div className="flex justify-center mb-2">
                  <Sparkles className="w-6 h-6 mx-1" style={{ color: '#654321', animation: 'sparkle 2s ease-in-out infinite', animationDelay: '0s' }} />
                  <Sparkles className="w-4 h-4 mx-1" style={{ color: '#654321', animation: 'sparkle 2s ease-in-out infinite', animationDelay: '0.5s' }} />
                  <Sparkles className="w-6 h-6 mx-1" style={{ color: '#654321', animation: 'sparkle 2s ease-in-out infinite', animationDelay: '1s' }} />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 
                  className="text-3xl font-bold mb-4"
                  style={{ 
                    color: '#654321',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {isAlreadyNotified ? 'Welcome Back!' : 'You\'re In!'}
                </h3>
                
                <p 
                  className="text-lg mb-6 leading-relaxed"
                  style={{ color: '#654321' }}
                >
                  {isAlreadyNotified 
                    ? 'You are already part of the Zarva family! Stay tuned for exciting updates coming your way.'
                    : 'You will be notified as soon as Zarva launches. Get ready for a safer ride experience!'
                  }
                </p>

                {/* Features Preview */}
                <div className="space-y-3 mb-6">
                  <div 
                    className="flex items-center justify-center gap-3 p-3 rounded-xl border"
                    style={{ 
                      backgroundColor: 'rgba(101, 67, 33, 0.2)',
                      borderColor: '#654321',
                      borderWidth: '1px'
                    }}
                  >
                    <Mail className="w-5 h-5" style={{ color: '#654321' }} />
                    <span style={{ color: '#654321' }} className="text-sm font-bold">
                      Email notifications enabled
                    </span>
                  </div>
                  
                  <div 
                    className="flex items-center justify-center gap-3 p-3 rounded-xl border"
                    style={{ 
                      backgroundColor: 'rgba(101, 67, 33, 0.2)',
                      borderColor: '#654321',
                      borderWidth: '1px'
                    }}
                  >
                    <Bell className="w-5 h-5" style={{ color: '#654321' }} />
                    <span style={{ color: '#654321' }} className="text-sm font-bold">
                      Priority access guaranteed
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={closeModal}
                  className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 transform"
                  style={{ 
                    backgroundColor: '#654321',
                    color: '#bcb291',
                    boxShadow: '0 10px 25px -5px rgba(101, 67, 33, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#A0522D';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#654321';
                  }}
                >
                  Awesome! ✨
                </button>
              </div>
            </div>
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
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>  
    </div>
  );
}