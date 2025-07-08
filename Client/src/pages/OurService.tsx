import React from "react";
import { Link } from "react-router-dom";

const ServicesPage: React.FC = () => {
  return (
    <div
      className="h-[50vh] sm:min-h-screen w-full p-2 sm:p-4 md:p-6 overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundColor: "#BCB291",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-8xl mx-auto h-full">
        {/* Header */}
        <div className="text-center mb-2 sm:mb-4 py-2 sm:py-10">
          <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black relative inline-block pb-1 sm:pb-2">
            Our Services
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-0.5 sm:h-1 w-12 sm:w-24 bg-black mt-1 sm:mt-2 rounded-full" />
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 gap-y-2 sm:gap-y-12 h-[calc(100%-80px)] sm:h-auto overflow-y-auto sm:overflow-visible">
          {/* Left Two Cards */}
          <div className="md:col-span-7 flex flex-col gap-2 sm:gap-10">
            {/* Card 1 */}
            <div className="group bg-white rounded-lg sm:rounded-3xl p-2 sm:p-6 md:p-9 ml-0 sm:ml-12 mr-0 sm:mr-16 transition-all duration-500 border border-transparent hover:border-[#BCB291] hover:shadow-[0_0_25px_#BCB291] hover:border-b-4 hover:scale-105 hover:bg-[#f8f6f0]">
              <div className="flex flex-row sm:flex-row items-center sm:items-start gap-2 sm:gap-6 text-left">
                <img
                  src="/1.jpg"
                  alt="Search Routes"
                  className="w-16 h-20 sm:w-32 sm:h-36 object-cover rounded-lg sm:rounded-xl shadow group-hover:scale-105 transition flex-shrink-0"
                />
                <div className="transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-black">
                    Search for Safer Routes
                  </h3>
                  <p className="text-gray-900 text-xs sm:text-base mb-2 sm:mb-4 leading-tight sm:leading-normal">
                    Navigate away from high-risk areas, ensuring safety and
                    efficiency.
                  </p>
                  <Link to="/location">
                    <button className="bg-[#BCB291] text-black px-3 py-1 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition">
                    Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-lg sm:rounded-3xl p-2 sm:p-5 ml-0 sm:ml-12 mr-0 sm:mr-16 transition-all duration-500 border border-transparent hover:border-[#BCB291] hover:shadow-[0_0_25px_#BCB291] hover:border-b-4 hover:scale-105 hover:bg-[#f8f6f0]">
              <div className="flex flex-row sm:flex-row items-center sm:items-start gap-2 sm:gap-6 py-1 sm:py-3 px-1 sm:px-3 md:px-5 text-left">
                <img
                  src="/3.jpg"
                  alt="Worry Free Ride"
                  className="w-16 h-20 sm:w-32 sm:h-36 object-cover rounded-lg sm:rounded-xl shadow group-hover:scale-105 transition flex-shrink-0"
                />
                <div className="transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-black">
                    Want a worry-free ride?
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-base mb-2 sm:mb-4 leading-tight sm:leading-normal">
                    Every Zarva cab's built-in cameras add an extra layer of
                    protection for drivers and passengers alike.
                  </p>
                  <Link to="/new">
                    <button className="bg-[#BCB291] text-black px-3 py-1 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition">
                    Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Single Card */}
          <div className="group md:col-span-5 bg-white rounded-lg sm:rounded-3xl p-2 sm:px-6 sm:py-8 mt-0 md:mt-32 mb-0 md:mb-32 mx-0 sm:mx-4 md:mx-0 shadow-lg transition-all duration-500 border border-transparent hover:border-[#BCB291] hover:shadow-[0_0_25px_#BCB291] hover:border-b-4 hover:scale-105 hover:bg-[#f8f6f0]">
            <div className="flex flex-row md:flex-row justify-center items-center gap-2 sm:gap-6 px-1 sm:px-3 text-left">
              <img
                src="/2.jpg"
                alt="Worry Free Ride"
                className="w-16 h-20 sm:w-32 sm:h-36 object-cover rounded-lg sm:rounded-xl shadow group-hover:scale-105 transition flex-shrink-0"
              />
              <div className="transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-3 text-black">
                  In case of an emergency ...
                </h3>
                <p className="text-gray-700 text-xs sm:text-base mb-2 sm:mb-4 leading-tight sm:leading-normal">
                  Repeat your safe word thrice to seconds
                  automated calls alongside your live
                  location to your loved ones and police
                  if we can't reach you.
                  
                </p>
                <Link to="/speech">
                  <button className="bg-[#BCB291] text-black px-3 py-1 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:scale-105 transition">
                  Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;