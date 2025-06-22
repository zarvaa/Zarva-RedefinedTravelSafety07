import React from 'react';
import { useNavigate } from 'react-router-dom';

const ZarvaFooter: React.FC = () => {
  const navigate = useNavigate();

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
              onClick={() => {
                  navigate('/'); // First navigate
                  setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Then scroll after a short delay
                }, 100); // Adjust delay if needed
              }}
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
                onClick={() => navigate('/signup')}
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
  {/* LinkedIn Button */}
  <button 
    onClick={() => window.open('https://www.linkedin.com/company/zarva', '_blank')}
    className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 
               5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
               19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75 
               0-.97.78-1.75 1.75-1.75s1.75.78 
               1.75 1.75c0 .96-.78 1.75-1.75 
               1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
               0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 
               1.38-1.54 2.85-1.54 3.05 0 3.62 2.01 3.62 4.62v5.56z"/>
    </svg>
  </button>

  {/* Instagram Button */}
  <button 
    onClick={() => window.open('https://www.instagram.com/zarva.in', '_blank')}
    className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors"
  >
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.966.24 
               2.43.4.61.2 1.05.44 1.51.89.46.46.69.9.89 
               1.51.16.47.35 1.26.4 2.43.06 1.27.07 1.65.07 
               4.85s-.01 3.584-.07 4.85c-.05 1.17-.24 1.96-.4 
               2.43-.2.61-.44 1.05-.89 1.51-.46.46-.9.69-1.51.89-.47.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.584-.01-4.85-.07c-1.17-.05-1.96-.24-2.43-.4a4.12 4.12 0 01-1.51-.89 4.12 4.12 0 01-.89-1.51c-.16-.47-.35-1.26-.4-2.43C2.21 15.584 2.2 15.2 2.2 
               12s.01-3.584.07-4.85c.05-1.17.24-1.96.4-2.43a4.12 4.12 0 
               01.89-1.51c.46-.46.9-.69 1.51-.89.47-.16 1.26-.35 2.43-.4C8.416 
               2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.01 7.052.07 
               5.776.13 4.787.336 3.95.68c-.9.37-1.658.86-2.418 1.62A6.95 
               6.95 0 00.68 4.948C.336 5.785.13 6.774.07 8.05.01 9.332 
               0 9.736 0 12c0 2.264.01 2.668.07 3.948.06 1.276.266 2.265.61 
               3.102.37.9.86 1.658 1.62 2.418.76.76 1.518 1.25 
               2.418 1.62.837.344 1.826.55 3.102.61C9.332 23.99 9.736 24 
               12 24s2.668-.01 3.948-.07c1.276-.06 2.265-.266 3.102-.61.9-.37 
               1.658-.86 2.418-1.62.76-.76 1.25-1.518 1.62-2.418.344-.837.55-1.826.61-3.102.06-1.28.07-1.684.07-3.948s-.01-2.668-.07-3.948c-.06-1.276-.266-2.265-.61-3.102a6.949 6.949 0 
               00-1.62-2.418A6.949 6.949 0 0019.052.68C18.215.336 
               17.226.13 15.95.07 14.668.01 14.264 0 12 
               0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 
               10.162a3.998 3.998 0 110-7.996 3.998 3.998 0 010 
               7.996zm6.406-11.812a1.44 1.44 0 11-2.88 
               0 1.44 1.44 0 012.88 0z"/>
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