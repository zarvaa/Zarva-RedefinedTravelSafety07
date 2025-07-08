import React from 'react';

const OurTeamPage: React.FC = () => {
  return (
    <div className="h-2/5 sm:h-screen w-full bg-gradient-to-br from-black to-[#BCB291] flex flex-col items-center justify-center px-2 sm:px-8 py-4 sm:py-9 overflow-hidden">
      {/* Our Team Title */}
      <h1 className="text-2xl sm:text-6xl md:text-7xl font-serif text-[#BCB291] mb-4 sm:mb-8 text-center tracking-wide mt-8 sm:mt-24 hover:underline cursor-pointer transition-all duration-300">
        Our Team
      </h1>
      
      {/* Team Image Container */}
      <div className="bg-gray-300 rounded-xl sm:rounded-3xl p-1 sm:p-3 mb-4 sm:mb-10 mt-1 sm:mt-2 shadow-2xl max-w-sm sm:max-w-4xl w-full">
        <div className="bg-white rounded-lg sm:rounded-2xl flex items-center justify-center h-[120px] sm:h-[280px] relative">
          {/* Team Photo */}
          <img 
            src="/groupphoto.jpg"
            alt="Our Team"
            className="w-full h-full object-cover rounded-md sm:rounded-xl"
          />
        </div>
      </div>
      
      {/* Description Text */}
      <div className="max-w-sm sm:max-w-4xl text-center space-y-2 sm:space-y-4 mb-8 sm:mb-20">
        <p className="text-xs sm:text-lg md:text-xl text-black font-bold leading-relaxed">
          At Zarva, we believe safety should be a standard, not a luxury. Our goal is to 
          redefine travel safety by making every customer Alert Aware Protected 
          With features like speech-recognition system system, safer routes, and CCTV 
          monitored cabs , Zarva ensures passengers feel protected at all times. Our easy-
          to-use app is designed to break into the cab market by offering a smarter, safer 
          alternative to traditional mobility services.
        </p>
        
        <p className="text-xs sm:text-lg md:text-xl text-black font-bold leading-relaxed">
          We're building a future where safety comes first, and every ride is 
          one you can trust.
        </p>
      </div>
    </div>
  );
};

export default OurTeamPage;