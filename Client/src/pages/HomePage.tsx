import React, { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  handleGetStarted: () => void | Promise<void>;
  handleLogin: () => void;
  handleBookRide: () => void | Promise<void>;
  handleSaferRoutes: () => void | Promise<void>;
  handleSpeechRecognition: () => void | Promise<void>;
  navigate: NavigateFunction;
};

const HomePage: React.FC<Props> = ({
  isLoggedIn,
  handleGetStarted,
  handleLogin,
  handleBookRide,
  handleSaferRoutes,
  handleSpeechRecognition,
  navigate,
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoRotateIndex, setAutoRotateIndex] = useState(0);

  const rotatingWords = ["Alert", "Aware", "Protected"];
  const sections = ["Book a Ride", "Safer Routes", "Speech Recognition"];

  const sectionImages = {
    "Book a Ride": "/car.png",
    "Safer Routes": "/alert.png",
    "Speech Recognition": "/speech.png",
  };

  const currentSection = activeSection || hoveredSection || sections[autoRotateIndex];

  useEffect(() => {
    if (!activeSection) {
      const interval = setInterval(() => {
        setAutoRotateIndex((prev) => (prev + 1) % sections.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeSection]);

  useEffect(() => {
    if (currentSection === "Safer Routes") {
      const interval = setInterval(() => {
        setIsAnimating(true);

        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 300);

        setTimeout(() => {
          setIsAnimating(false);
        }, 400);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCurrentWordIndex(0);
      setIsAnimating(false);
    }
  }, [currentSection]);

  const renderContent = () => {
    if (currentSection === "Safer Routes") {
      return (
        <div className="absolute top-1/2 right-4 sm:right-20 transform -translate-y-1/2 z-20 text-center">
          <div
            className="text-white font-bold text-3xl sm:text-6xl italic mb-4 sm:mb-8"
            style={{
              minHeight: window.innerWidth < 640 ? "40px" : "60px",
              width: window.innerWidth < 640 ? "150px" : "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="transform-gpu"
              style={{
                transform: isAnimating ? "rotateX(90deg) scale(0.8)" : "rotateX(0deg) scale(1)",
                transformStyle: "preserve-3d",
                transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transformOrigin: "center center -20px",
              }}
            >
              <div
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                {rotatingWords[currentWordIndex]}
              </div>
            </div>
          </div>
          <button
            onClick={isLoggedIn ? handleGetStarted : handleLogin}
            className="bg-[#bcb291] hover:bg-[#a2957c] text-black px-4 py-2 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-lg transition-all duration-200 hover:scale-105"
          >
            {isLoggedIn ? "Get Started" : "Sign Up"}
          </button>
        </div>
      );
    }

    if (currentSection === "Speech Recognition") {
      return (
        <div className="absolute top-1/2 left-4 sm:left-20 transform -translate-y-1/2 z-20 max-w-xs sm:max-w-md">
          <h2 className="text-white font-bold text-2xl sm:text-4xl italic mb-4 sm:mb-8 leading-tight">
            With Zarva, every journey is protected, every moment is secure.
          </h2>
          <button
            onClick={isLoggedIn ? handleGetStarted : handleLogin}
            className="bg-[#bcb291] hover:bg-[#a2957c] text-black px-4 py-2 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-lg transition-all duration-200 hover:scale-105"
          >
            {isLoggedIn ? "Get Started" : "Sign Up"}
          </button>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col justify-center items-end text-right gap-6 px-4 sm:px-6 pb-32">
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl mr-2 sm:mr-5 font-bold italic mb-4 sm:mb-8 leading-tight">
          Redefining Travel Safety
        </h1>
        <button
          onClick={isLoggedIn ? handleGetStarted : handleLogin}
          className="bg-[#bcb291] hover:bg-[#a2957c] text-black px-6 py-2 sm:px-10 sm:py-3 mr-4 sm:mr-72 rounded-full font-medium text-sm sm:text-lg transition-colors duration-200"
        >
          {isLoggedIn ? "Get Started" : "Sign Up"}
        </button>
      </div>
    );
  };

  return (
    <div className="fade-in-scale h-screen sm:min-h-screen relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('${sectionImages[currentSection as keyof typeof sectionImages]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col h-[50vh] sm:min-h-screen">
        <div className="absolute top-2 sm:top-5 left-4 sm:left-10 z-20">
          <img
            src="/logo.png"
            alt="ZARVA Logo"
            className="h-12 sm:h-20 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {renderContent()}

        <div className="absolute bottom-0 left-0 right-0 bg-transparent">
          <div className="grid grid-cols-3">
            {sections.map((label, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSection(label);
                  if (label === "Book a Ride") handleBookRide();
                  if (label === "Safer Routes") handleSaferRoutes();
                  if (label === "Speech Recognition") handleSpeechRecognition();
                }}
                onMouseEnter={() => setHoveredSection(label)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group relative p-3 sm:p-6 text-center ${
                  index < 2 ? "border-r border-white border-opacity-100" : ""
                } hover:bg-black hover:bg-opacity-30 transition-all duration-300 ${
                  activeSection === label || hoveredSection === label || currentSection === label
                    ? "bg-[#bcb291] bg-opacity-20"
                    : ""
                }`}
              >
                <div
                  className={`text-lg sm:text-3xl mb-1 sm:mb-2 font-semibold transition-colors duration-300 ${
                    activeSection === label || hoveredSection === label || currentSection === label
                      ? "text-[#bcb291]"
                      : "text-white group-hover:text-amber-300"
                  }`}
                >
                  {label}
                </div>
                <span className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[2px] sm:h-[3px] bg-amber-300 transition-all duration-300 group-hover:w-3/4 rounded"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
