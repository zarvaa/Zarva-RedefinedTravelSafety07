import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Menu, X, Shield, MapPin } from 'lucide-react';

interface HeaderProps {
  showProfileSection?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showProfileSection = true }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Function to update user data from localStorage
    const updateUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    
    // Update user data initially
    updateUserData();
    
    // Listen for storage events (when localStorage changes)
    window.addEventListener('storage', updateUserData);
    
    // Custom event for when user logs in/out within the same window
    window.addEventListener('userDataChanged', updateUserData);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('storage', updateUserData);
      window.removeEventListener('userDataChanged', updateUserData);
    };
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleFeatureClick = () => {
    navigate('/feature');
  };

  const handleLocationClick = () => {
    navigate('/location');
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // Navigate to home page
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-3 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div onClick={handleHomeClick} className="cursor-pointer flex items-center group transition-all duration-300">
              <img
                src="https://res.cloudinary.com/dejquvzim/image/upload/v1748805738/r0fwucqbl4plyhlcjvzr.png"
                alt="ZARVA Logo"
                className="h-12 w-auto brightness-0 invert group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={handleHomeClick}
                className="flex items-center space-x-2 hover:text-amber-200 transition-colors px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              
              <button 
                onClick={handleFeatureClick}
                className="flex items-center space-x-2 hover:text-amber-200 transition-colors px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30"
              >
                <Shield size={18} />
                <span>Features</span>
              </button>
              
              <button 
                onClick={handleLocationClick}
                className="flex items-center space-x-2 hover:text-amber-200 transition-colors px-3 py-2 rounded-md hover:bg-black hover:bg-opacity-30"
              >
                <MapPin size={18} />
                <span>Location</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-amber-200 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logout button - only shown if logged in and showProfileSection is true */}
          {isLoggedIn && showProfileSection && (
            <div className="relative hidden md:block">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 cursor-pointer bg-black bg-opacity-30 hover:bg-opacity-50 px-3 py-2 rounded-md transition-all duration-300 text-white hover:text-amber-200"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <button 
              onClick={handleHomeClick}
              className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center"
            >
              <Home size={18} className="mr-3" />
              <span>Home</span>
            </button>
            
            <button 
              onClick={handleFeatureClick}
              className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center"
            >
              <Shield size={18} className="mr-3" />
              <span>Features</span>
            </button>
            
            <button 
              onClick={handleLocationClick}
              className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center"
            >
              <MapPin size={18} className="mr-3" />
              <span>Location</span>
            </button>

            {isLoggedIn && showProfileSection && (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-3 text-white hover:bg-black hover:text-amber-200 rounded-md flex items-center"
                >
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

export default Header;