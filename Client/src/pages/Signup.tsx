import React, { useState } from 'react';
import { OAuthProvider } from 'appwrite';
import { createOAuthSession } from '../appwrite';
//import { OAuthProvider } from 'appwrite';

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState('');
  
  const handleOAuthLogin = async (provider: OAuthProvider) => {
          try {
            setError('');
            setIsLoading(true);
            await createOAuthSession(provider);
          } catch (error: any) {
            console.error('OAuth login error:', error);
            setError(`OAuth failed: ${error.message}`);
            setIsLoading(false);
          }
        };

  const handleDriverSignup = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/driver/registerDriver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        mobile,
        email,
        vehicleModel,
        vehicleNumber,
        password,
      }),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error(`Unexpected server response: ${text}`);
    }

    if (!response.ok) throw new Error(data.message || 'Signup failed');
    alert('Driver registered successfully!');
  } catch (error: any) {
    console.error(error);
    alert(`Signup failed: ${error.message}`);
  }
};

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="w-full max-w-md bg-[#e1ded2] backdrop-blur-sm border border-[#bcb291] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
          />
          <input
            type="text"
            placeholder="Vehicle Model"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
          />
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-white placeholder-gray-500 text-sm"
          />

          <button
            onClick={handleDriverSignup}
            className="w-full py-3 mt-4 bg-[#BCB291] text-black font-semibold rounded-full hover:bg-amber-300 transition-all"
          >
            Sign Up
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-400"></div>
          <span className="px-4 text-gray-600 text-sm">or continue with</span>
          <div className="w-full border-t border-gray-400"></div>
        </div>

        {/* OAuth */}
        <div className="flex justify-center space-x-4">
          <button
              onClick={() => handleOAuthLogin(OAuthProvider.Google)}
              disabled={isLoading}
              className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full transition-all duration-200"
            >
               <img
                     src="/google.png"
                     alt="Google"
                    className="w-5 h-5"
                />
            </button>
          <button
              onClick={() => handleOAuthLogin(OAuthProvider.Apple)}
              disabled={isLoading}
              className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full transition-all duration-200"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
          <button
              onClick={() => handleOAuthLogin(OAuthProvider.Facebook)}
              disabled={isLoading}
              className="flex items-center justify-center w-16 h-10 bg-[#e1ded2] hover:bg-gray-300 border border-[#bcb291] rounded-full transition-all duration-200"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
            >
              <span className="text-black font-bold text-lg">f</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
