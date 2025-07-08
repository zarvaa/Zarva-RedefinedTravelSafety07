import { Headphones, MapPin, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const ZarvaFeatures = () => {
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const features = [
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-2 sm:mb-4" />,
      title: "Virtual Standby",
      description: "Keeping help just a tap away. Our support team remains on standby throughout your journey, ready to assist at a moment's notice."
    },
    {
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-2 sm:mb-4" />,
      title: "Live Location Tracking",
      description: "Provides real-time updates on a passenger's journey. Share your trip with trusted contacts who can follow your route in real-time."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-2 sm:mb-4" />,
      title: "SOS Button",
      description: "Instantly alerts emergency contacts and authorities. One-touch access to immediate help when you need it most."
    }
  ];

  return (
    <div 
      className="flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundColor: '#BCB291'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 "></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-2 sm:px-0 py-8 sm:py-16">
        {/* Title */}
        <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-8 sm:mb-24 tracking-wide px-4 sm:px-0">
          Additional Features
        </h1>
        
        {/* Moving Cards Container */}
        <div className="relative overflow-hidden mb-8 sm:mb-20">
          <div className="flex animate-scroll">
            {/* First set of cards */}
            {features.map((feature, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-48 sm:w-80 mx-2 sm:mx-4 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg"
                style={{ backgroundColor: '#bcb291' }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  {feature.icon}
                  <h3 className="text-sm sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {features.map((feature, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-48 sm:w-80 mx-2 sm:mx-4 p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg"
                style={{ backgroundColor: '#bcb291' }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  {feature.icon}
                  <h3 className="text-sm sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div 
          className="text-center py-4 sm:py-7 mt-8 sm:mt-40 mx-2 sm:mx-0 rounded-lg sm:rounded-none"
          style={{ backgroundColor: '#4d4d4d' }}
        >
          <h2 className="text-lg sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-8 px-4 sm:px-0">
            Empower your journey—drive with Zarva today!
          </h2>
          <button 
            onClick={handleGetStarted}
            className="px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
            style={{ backgroundColor: '#bcb291' }}
          >
            Explore
          </button>
        </div>
      </div>
      
      {/* Simple modal for demo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Welcome to Zarva!</h3>
            <p className="text-gray-600 mb-4">Ready to start your journey?</p>
            <button 
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default ZarvaFeatures;