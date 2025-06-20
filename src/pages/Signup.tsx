import React, { useState } from 'react';
import { OAuthProvider } from 'appwrite';

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleDriverSignup = async () => {
  try {
    const response = await fetch('http://localhost:5000/registerDriver', {
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
          <button className="w-10 h-10 rounded-full border border-gray-400 bg-white hover:bg-gray-100 flex items-center justify-center">
            <img src="/google.png" alt="Google" className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-400 bg-white hover:bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47..." />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-400 bg-white hover:bg-gray-100 flex items-center justify-center">
            <span className="font-bold text-lg">f</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
