import React from 'react';
import { Moon, TrendingUp, AlertTriangle, Car, FileX, Shield } from 'lucide-react';

const TravelSafetyStats: React.FC = () => {
  const statsData = [
    {
      icon: <Moon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#BCB291' }} />,
      title: "Night Travel Concerns",
      percentage: "54%",
      description: "of passengers feel unsafe using public transport at night",
      source: "Ola Mobility Report, 2023"
    },
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#BCB291' }} />,
      title: "Rising Crime Rates",
      percentage: "40%",
      description: "increase in crimes in public transport in the last five years",
      source: "NCRB, 2022"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#BCB291' }} />,
      title: "Harassment & Theft",
      percentage: "33%",
      description: "of commuters have reported theft, assault, or harassment while using cabs",
      source: "Ola Mobility Report, 2023"
    },
    {
      icon: <Car className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#BCB291' }} />,
      title: "Cab Ride Incidents",
      percentage: "20K+",
      description: "robbery and violent attack cases registered in ride-sharing services (2019-2023)",
      source: "Public Transport Safety Index"
    },
    {
      icon: <FileX className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#BCB291' }} />,
      title: "Unreported Cases",
      percentage: "70%",
      description: "of harassment cases in cabs and autos go unreported due to fear",
      source: "Urban Mobility Safety Report"
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#BCB291' }} />,
      title: "Inadequate Safety",
      percentage: "76%",
      description: "of passengers feel ride-hailing services lack proper safety measures",
      source: "Consumer Transport Survey, 2023"
    }
  ];

  return (
    <div 
      className="h-[50vh] sm:h-auto  sm:min-h-screen bg-cover bg-center bg-no-repeat p-3 sm:p-9 overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')", // Assuming your background image is in public folder
        backgroundColor: '#BCB291' // Fallback color matching the beige tone
      }}
    >
      <div className="max-w-7xl mx-auto h-full">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-10 mt-1 sm:mt-3 relative">
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-black mb-2 sm:mb-4 relative inline-block">
            Do You Know?
            {/* Underline effect */}
            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-32 h-0.5 sm:h-1 bg-gray-600 rounded-full"></div>
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 font-medium mt-1">
            The Reality of Travel Safety in India
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-9 h-[calc(100%-120px)] sm:h-auto overflow-y-auto sm:overflow-visible">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-90 mt-1 sm:mt-3 backdrop-blur-sm rounded-xl sm:rounded-3xl p-3 sm:p-8 shadow-lg border-2 border-transparent hover:border-2 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 group relative overflow-hidden"
              style={{
                '--hover-border-color': '#BCB291'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#BCB291';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl sm:rounded-3xl" style={{ backgroundColor: '#BCB291' }}></div>
              
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                  <div className="p-1 sm:p-2 rounded-full bg-gray-100 group-hover:shadow-lg transition-all duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                    {stat.title}
                  </h3>
                </div>

                {/* Percentage */}
                <div className="mb-2 sm:mb-4">
                  <span className="text-xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300" style={{ color: '#BCB291' }}>
                    {stat.percentage}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-900 text-xs sm:text-base font-medium mb-2 sm:mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {stat.description}
                </p>

                {/* Source */}
                <div className="relative">
                  <p className="text-gray-700 text-xs sm:text-sm font-medium group-hover:text-gray-600 transition-colors duration-300">
                    {stat.source}
                  </p>
                  {/* Bottom accent line */}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: '#BCB291' }}></div>
                </div>
              </div>

              {/* Cool top border effect */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-1 group-hover:w-4/5 transition-all duration-500 ease-out rounded-full" style={{ backgroundColor: '#BCB291' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelSafetyStats;