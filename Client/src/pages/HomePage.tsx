// HomePage.tsx
import React, { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  handleGetStarted: () => void | Promise<void>;
  handleLogin: () => void;
  handleBookRide: () => void | Promise<void>;
  handleSaferRoutes: () => void | Promise<void>; // ✅ Add this line
  handleSpeechRecognition: () => void | Promise<void>;
  navigate: NavigateFunction;
};

const HomePage: React.FC<Props> = ({
  isLoggedIn,
  handleGetStarted,
  handleLogin,
  handleBookRide,
  navigate,
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoRotateIndex, setAutoRotateIndex] = useState(0);

  const rotatingWords = ["Alert", "Aware", "Protected"];
  const sections = ["Book a Ride", "Safer Routes", "Speech Recognition"];

  // Auto-rotate through sections every 3-4 seconds
  useEffect(() => {
    // Only auto-rotate if user is not hovering or has not manually selected a section
    if (!hoveredSection && !activeSection) {
      const interval = setInterval(() => {
        setAutoRotateIndex(prev => (prev + 1) % sections.length);
      }, 4000); // 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [hoveredSection, activeSection]);

  // Improved rotating animation with 3D rolling effect
  useEffect(() => {
    const currentSection = activeSection || hoveredSection;
    if (currentSection === "Safer Routes") {
      const interval = setInterval(() => {
        setIsAnimating(true);
        
        setTimeout(() => {
          setCurrentWordIndex(prev => (prev + 1) % rotatingWords.length);
        }, 300); // Change word during roll
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 600); // Complete animation cycle
        
      }, 1500); // Change word every 1.5 seconds
      
      return () => clearInterval(interval);
    }
  }, [activeSection, hoveredSection]);

  // Reset word index when leaving Safer Routes section
  useEffect(() => {
    const currentSection = activeSection || hoveredSection || sections[autoRotateIndex];
    if (currentSection !== "Safer Routes") {
      setCurrentWordIndex(0);
      setIsAnimating(false);
    }
  }, [activeSection, hoveredSection, autoRotateIndex]);

  // Different images for each section
  const sectionImages = {
    "Book a Ride": "/car.png",
    "Safer Routes": "/alert.png",
    "Speech Recognition": "/speech.png",
  };

  const renderContent = () => {
    const currentSection = activeSection || hoveredSection || sections[autoRotateIndex];
    
    if (currentSection === "Safer Routes") {
      return (
        <>
          {/* Rotating Words with 3D rolling animation */}
          <div className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20 text-center">
            <div 
              className="text-white font-bold text-6xl italic mb-8"
              style={{
                minHeight: '80px',
                width: '300px', // Fixed width to prevent button movement
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="transform-gpu"
                style={{
                  transform: isAnimating 
                    ? 'rotateX(90deg) scale(0.8)' 
                    : 'rotateX(0deg) scale(1)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformOrigin: 'center center -20px',
                }}
              >
                <div
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  {rotatingWords[currentWordIndex]}
                </div>
              </div>
            </div>
            
            {/* Get Started/Login Button - positioned consistently */}
            <div>
              <button
                onClick={isLoggedIn ? handleGetStarted : handleLogin}
                className="bg-[#bcb291] hover:bg-[#a2957c] text-black px-8 py-3 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105"
              >
                {isLoggedIn ? "Get Started" : "Sign Up"}
              </button>
            </div>
          </div>
        </>
      );
    }

    if (currentSection === "Speech Recognition") {
      return (
        <>
          {/* Left side text with button */}
          <div className="absolute top-1/2 left-20 transform -translate-y-1/2 z-20 max-w-md">
            <h2 className="text-white font-bold text-4xl italic mb-8 leading-tight">
              With Zarva, every journey is protected, every moment is secure.
            </h2>
            
            {/* Get Started/Login Button */}
            <button
              onClick={isLoggedIn ? handleGetStarted : handleLogin}
              className="bg-[#bcb291] hover:bg-[#a2957c] text-black px-8 py-3 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105"
            >
              {isLoggedIn ? "Get Started" : "Sign Up"}
            </button>
          </div>
        </>
      );
    }

    // Default content (original design)
    return (
      <div className="flex-1 flex flex-col justify-center items-end text-right gap-6 px-6 pb-32">
        <h1 className="text-white text-5xl md:text-6xl mr-5 font-bold italic mb-8 leading-tight">
          Redefining Travel Safety
        </h1>

        <button
          onClick={isLoggedIn ? handleGetStarted : handleLogin}
          className="bg-[#bcb291] hover:bg-[#a2957c] text-black px-10 py-3 mr-72 rounded-full font-medium text-lg transition-colors duration-200"
        >
          {isLoggedIn ? "Get Started" : "Sign Up"}
        </button>
      </div>
    );
  };

  return (
    <div className="fade-in-scale min-h-screen relative bg-black">
      
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: (activeSection || hoveredSection || sections[autoRotateIndex])
            ? `url('${sectionImages[(activeSection || hoveredSection || sections[autoRotateIndex]) as keyof typeof sectionImages]}')`
            : "url('/car.png')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col min-h-screen">
        {/* Logo */}
        <div className="absolute top-5 left-10 z-20">
          <img
            src="/logo.png"
            alt="ZARVA Logo"
            className="h-20 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Dynamic Content Based on Hover */}
        {renderContent()}

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="grid grid-cols-3">
            {[
              { 
                label: "Book a Ride", 
                onClick: () => {
                  setActiveSection("Book a Ride");
                  handleBookRide();
                },
                hasAction: true 
              },
              { 
                label: "Safer Routes", 
                onClick: () => setActiveSection("Safer Routes"),
                hasAction: true 
              },
              { 
                label: "Speech Recognition", 
                onClick: () => setActiveSection("Speech Recognition"),
                hasAction: true 
              },
            ].map(({ label, onClick, hasAction }, index) => (
              <button
                key={index}
                onClick={hasAction ? onClick : undefined}
                onMouseEnter={() => setHoveredSection(label)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group relative p-6 text-center ${index < 2 ? 'border-r border-white border-opacity-100' : ''} hover:bg-black hover:bg-opacity-30 transition-all duration-300 ${
                  hasAction ? 'cursor-pointer' : 'cursor-default'
                } ${(activeSection === label || hoveredSection === label || sections[autoRotateIndex] === label) ? 'bg-[#bcb291] bg-opacity-20' : ''}`}
              >
                <div className={`text-3xl mb-2 font-semibold transition-colors duration-300 ${
                  (activeSection === label || hoveredSection === label || sections[autoRotateIndex] === label) ? 'text-[#bcb291]' : 'text-white group-hover:text-amber-300'
                }`}>
                  {label}
                </div>
                <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[3px] bg-amber-300 transition-all duration-300 group-hover:w-3/4 rounded"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;