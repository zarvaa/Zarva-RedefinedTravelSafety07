import React from "react";
import { Link } from "react-router-dom";

const ServicesPage: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full p-4 sm:p-6"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundColor: "#BCB291",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb- py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black relative inline-block pb-2">
            Our Services
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-1 w-24 bg-black mt-2 rounded-full" />
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12">
          {/* Left Two Cards */}
          <div className="md:col-span-7 flex flex-col gap-10">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl p-6 sm:p-9 ml-0 sm:ml-12 mr-0 sm:mr-16 transition-all duration-500 border border-transparent hover:border-[#BCB291] hover:shadow-[0_0_25px_#BCB291] hover:border-b-4 hover:scale-105 hover:bg-[#f8f6f0]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <img
                  src="/1.jpg"
                  alt="Search Routes"
                  className="w-32 h-36 object-cover rounded-xl shadow group-hover:scale-105 transition"
                />
                <div className="transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    Search for Safer Routes
                  </h3>
                  <p className="text-gray-900 text-medium mb-4">
                    Navigate away from high-risk areas, ensuring safety and
                    efficiency.
                  </p>
                  <Link to="/location">
                    <button className="bg-[#BCB291] text-black px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition">
                    Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-3xl p-5 ml-0 sm:ml-12 mr-0 sm:mr-16 transition-all duration-500 border border-transparent hover:border-[#BCB291] hover:shadow-[0_0_25px_#BCB291] hover:border-b-4 hover:scale-105 hover:bg-[#f8f6f0]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-3 px-3 sm:px-5 text-center sm:text-left">
                <img
                  src="/3.jpg"
                  alt="Worry Free Ride"
                  className="w-32 h-36 object-cover rounded-xl shadow group-hover:scale-105 transition"
                />
                <div className="transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    Want a worry-free ride?
                  </h3>
                  <p className="text-gray-700 text-base mb-4">
                    Every Zarva cab's built-in cameras add an extra layer of
                    protection for drivers and passengers alike.
                  </p>
                  <Link to="/new">
                    <button className="bg-[#BCB291] text-black px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition">
                    Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Single Card */}
          <div className="group md:col-span-5 bg-white rounded-3xl  sm:px-6 py-8 mt-0 md:mt-32 mb-0 md:mb-32 mx-4 sm:mx-0 shadow-lg transition-all duration-500 border border-transparent hover:border-[#BCB291] hover:shadow-[0_0_25px_#BCB291] hover:border-b-4 hover:scale-105 hover:bg-[#f8f6f0]">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-3 text-center md:text-left">
              <img
                src="/2.jpg"
                alt="Worry Free Ride"
                className="w-32 h-36 object-cover rounded-xl shadow group-hover:scale-105 transition"
              />
              <div className="transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-3 text-black">
                  In case of an emergency ...
                </h3>
                <p className="text-gray-700 text-base mb-4">
                  Repeat your safe word thrice to seconds
                  automated calls alongside your live
                  location to your loved ones and police
                  if we can't reach you.
                  
                </p>
                <Link to="/speech">
                  <button className="bg-[#BCB291] text-black px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition">
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