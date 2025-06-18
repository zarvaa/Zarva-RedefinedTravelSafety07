import { Headphones, MapPin, AlertTriangle } from 'lucide-react';

const ZarvaFeatures = () => {
  const features = [
    {
      icon: <Headphones className="w-8 h-8 text-gray-700 mb-4" />,
      title: "Virtual Standby",
      description: "Keeping help just a tap away. Our support team remains on standby throughout your journey, ready to assist at a moment's notice."
    },
    {
      icon: <MapPin className="w-8 h-8 text-gray-700 mb-4" />,
      title: "Live Location Tracking",
      description: "Provides real-time updates on a passenger's journey. Share your trip with trusted contacts who can follow your route in real-time."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-gray-700 mb-4" />,
      title: "SOS Button",
      description: "Instantly alerts emergency contacts and authorities. One-touch access to immediate help when you need it most."
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')", // Assuming your background image is in public folder
        backgroundColor: '#BCB291' // Fallback color matching the beige tone
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 "></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-0">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-24 tracking-wide">
          Additional Features
        </h1>
        
        {/* Moving Cards Container */}
        <div className="relative overflow-hidden mb-20">
          <div className="flex animate-scroll">
            {/* First set of cards */}
            {features.map((feature, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 mx-4 p-8 rounded-2xl shadow-lg"
                style={{ backgroundColor: '#bcb291' }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {features.map((feature, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 mx-4 p-8 rounded-2xl shadow-lg"
                style={{ backgroundColor: '#bcb291' }}
              >
                <div className="flex flex-col items-center text-center h-full">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div 
          className="text-center py-7 mt-40 "
          style={{ backgroundColor: '#4d4d4d' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Empower your journey—drive with Zarva today!
          </h2>
          <button className="px-8 py-3 rounded-full font-semibold text-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: '#bcb291' }}
          >
            Explore
          </button>
        </div>
      </div>
      
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
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ZarvaFeatures;