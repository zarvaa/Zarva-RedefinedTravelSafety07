import React from 'react';

const ZarvaFooter: React.FC = () => {
  const handleLinkClick = (linkName: string) => {
    console.log(`Clicked: ${linkName}`);
    // Add your navigation logic here
  };

  return (
    <footer className="bg-[#4D4D4D] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          
          {/* Logo Section */}
          <div className="mb-6 lg:mb-0">
            <img 
              src="/logo.png" 
              alt="Zarva" 
              className="h-20 w-auto cursor-pointer filter brightness-0 invert"
              onClick={() => handleLinkClick('Logo')}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            
            {/* Our Services Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-gray-400 text-sm font-normal mb-1">Our services</h3>
              <button 
                onClick={() => handleLinkClick('CCTV in Cars')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                CCTV in Cars
              </button>
              <button 
                onClick={() => handleLinkClick('Solar Routes')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                Solar Routes
              </button>
              <button 
                onClick={() => handleLinkClick('Speed Navigation System')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                Speed Navigation System
              </button>
            </div>

            {/* Earn with Zarva Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-gray-400 text-sm font-normal mb-1">Earn with Zarva</h3>
              <button 
                onClick={() => handleLinkClick('Register as Driver')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                Register as Driver
              </button>
            </div>

            {/* About us Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-gray-400 text-sm font-normal mb-1">About us</h3>
              <button 
                onClick={() => handleLinkClick('Company')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                Company
              </button>
              <button 
                onClick={() => handleLinkClick('Blog')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                Blog
              </button>
              <button 
                onClick={() => handleLinkClick('Contacts')}
                className="text-white text-sm hover:text-gray-300 transition-colors text-left font-normal"
              >
                Contacts
              </button>
            </div>
          </div>
        </div>

        {/* Social Icons and App Store Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-600 pt-2">
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 mb-6 lg:mb-0">
            <button 
              onClick={() => handleLinkClick('Facebook')}
              className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button 
              onClick={() => handleLinkClick('Twitter')}
              className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>

          {/* Language and App Store Buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <button 
              onClick={() => handleLinkClick('Language')}
              className="bg-black px-3 py-2 rounded-lg text-sm hover:bg-gray-500 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span>En</span>
            </button>

            {/* App Store Button */}
            <button 
              onClick={() => handleLinkClick('App Store')}
              className="bg-black px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors border border-gray-600"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-300 leading-tight">Download on the</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </div>
            </button>

            {/* Google Play Button */}
            <button 
              onClick={() => handleLinkClick('Google Play')}
              className="bg-black px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors border border-gray-600"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-300 leading-tight">GET IT ON</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </div>
            </button>

            {/* Android Button */}
            <button 
              onClick={() => handleLinkClick('Android')}
              className="bg-black px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors border border-gray-600"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523,15.3414c-0.6613,0-1.1973-0.5359-1.1973-1.1973c0-0.6614,0.536-1.1973,1.1973-1.1973c0.6614,0,1.1973,0.5359,1.1973,1.1973C18.7203,14.8055,18.1837,15.3414,17.523,15.3414 M6.477,15.3414c-0.6614,0-1.1973-0.5359-1.1973-1.1973c0-0.6614,0.5359-1.1973,1.1973-1.1973c0.6613,0,1.1973,0.5359,1.1973,1.1973C7.6743,14.8055,7.1383,15.3414,6.477,15.3414 M12,2.0117c1.0156-0.1563,2.0859,0.5625,2.9785,2.0547L13.7656,5.0547C13.1953,4.7188,12.5859,4.5234,12,4.5234s-1.1953,0.1953-1.7656,0.5313L9.0215,4.0664C9.9141,2.5742,10.9844,1.8555,12,2.0117z M7.4102,17.2734c-0.1172,0.5859-0.5117,1.0234-1.0234,1.0234H4.8281c-0.6641,0-1.2031-0.5391-1.2031-1.2031V16.25c0-0.6641,0.5391-1.2031,1.2031-1.2031h1.5586c0.5117,0,0.9063,0.4375,1.0234,1.0234L7.4102,17.2734z M16.5898,17.2734l-0.0234-1.25c0.1172-0.5859,0.5117-1.0234,1.0234-1.0234h1.5586c0.6641,0,1.2031,0.5391,1.2031,1.2031V17.094c0,0.6641-0.539,1.2031-1.2031,1.2031h-1.5586c-0.5117,0-0.9063-0.4375-1.0234-1.0234L16.5898,17.2734z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-300 leading-tight">Direct</div>
                  <div className="text-sm font-semibold leading-tight">Android</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-8 mt-8 pt-6 border-t border-gray-600">
          <button 
            onClick={() => handleLinkClick('Legal documents')}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Legal documents
          </button>
          <button 
            onClick={() => handleLinkClick('Terms of use')}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Terms of use
          </button>
          <button 
            onClick={() => handleLinkClick('Compliance')}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Compliance
          </button>
          <button 
            onClick={() => handleLinkClick('Delete account')}
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Delete account
          </button>
        </div>
      </div>
    </footer>
  );
};

export default ZarvaFooter;