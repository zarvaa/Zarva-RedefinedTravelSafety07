import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwrite';
import { useAuthModal } from '../contexts/AuthModalContext';

const AuthCallback = () => {
  const [error, setError] = useState('');
  // Removed unused isDriver state
  const [showLoader, setShowLoader] = useState(false); // 👈 Control loader rendering
  const navigate = useNavigate();
  const { openLoginModal } = useAuthModal();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await account.getSession('current');
        const user = await account.get();

        // 👇 Determine if this is a driver login
        const isDriverLogin = user.email?.includes("driver"); // customize as needed
        // Removed setIsDriver as isDriver state is unused

        // Store user info
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', isDriverLogin ? 'driver' : 'user');
        window.dispatchEvent(new Event('userDataChanged'));

        if (isDriverLogin) {
          // 🚗 Driver: Show loader for a few seconds
          setShowLoader(true);
          setTimeout(() => {
            navigate('/feature'); // or /driver-dashboard if needed
          }, 1500);
        } else {
          // 👤 User: Redirect immediately
          navigate('/feature');
        }

      } catch (err) {
        console.error('OAuth login failed:', err);
        setError('Authentication failed. Please try again.');
        setTimeout(() => {
          openLoginModal();
          navigate('/');
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate, openLoginModal]);

  // ✅ Only show loader if it's a driver
  if (!showLoader && !error) return null;
  
  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: 'url("/bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-6xl h-auto min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center text-center" style={{
          backgroundColor: '#e1ded2',
          padding: '40px 30px',
          borderRadius: '16px',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
        }}>
          {error ? (
            <div className="rounded-md bg-red-50 p-6 w-full max-w-xs sm:max-w-md">
              <div className="text-base sm:text-lg text-red-700">{error}</div>
              <p className="mt-3 text-sm sm:text-base text-gray-500">Redirecting to login page...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Large Image Container */}
              <div className="w-32 h-24 sm:w-48 sm:h-36 lg:w-64 lg:h-48 flex items-center justify-center flex-shrink-0">
                <img 
                  src="https://res.cloudinary.com/dx0r0pbgb/image/upload/v1749819410/Adobe_Express_-_file_1_pxzrh1.png" 
                  alt="Success" 
                  className="w-full h-full object-contain rounded-lg sm:rounded-xl lg:rounded-2xl"
                />
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight text-center">
                You're signed in.
              </h1>

              {/* Description */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-center max-w-xs sm:max-w-lg lg:max-w-xl">
                <p className="text-sm sm:text-lg lg:text-xl text-black font-medium">
                  Thanks for signing up!
                </p>
                <p className="text-xs sm:text-base lg:text-lg text-black leading-relaxed">
                  We'll be starting with our app and services shortly
                </p>
              </div>

              {/* Get Notified Button */}
              <div className="pt-2 sm:pt-3 lg:pt-4">
                <button 
                  className="px-6 py-2 sm:px-10 sm:py-3 lg:px-12 lg:py-4 bg-black text-white rounded-full text-xs sm:text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors transform hover:scale-105"
                  onClick={() => navigate('/feature')}
                >
                  Get Notified
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;