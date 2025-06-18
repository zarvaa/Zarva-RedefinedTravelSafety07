import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Feedback:', feedback);
    // Handle form submission here
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-2"
      style={{
        backgroundImage: 'url(/bg1.jpg)', // Replace with your background image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12 mt-6 ">
          Give us Feedback
        </h1>
        
        {/* Form Container */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-2xl bg-white bg-opacity-90 placeholder-gray-600 focus:outline-none focus:border-gray-500 focus:bg-white transition-all duration-200"
            />
          </div>
          
          {/* Feedback Textarea */}
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write Here..."
              rows={8}
              className="w-full px-4 py-2 mt-3 h-[300px] text-lg border-2 border-gray-300 rounded-xl bg-white bg-opacity-90 placeholder-gray-600 focus:outline-none focus:border-gray-500 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-[#BCB291] hover:bg-amber-300 text-gray-800 font-semibold text-lg rounded-full border-2 border-gray-400 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;