

export default function ComingSoon() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('background.z.jpg')`
        }}
      />
      
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.15)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 relative">
          {/* Large Decorative Circles with Animations */}
          <div 
            className="absolute -top-40 -left-64 w-96 h-96 rounded-full animate-pulse"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.4,
              animation: 'float 6s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute -top-20 -right-32 w-80 h-80 rounded-full"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.3,
              animation: 'float 8s ease-in-out infinite reverse'
            }}
          ></div>
          <div 
            className="absolute -bottom-32 left-16 w-72 h-72 rounded-full"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.35,
              animation: 'float 7s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute bottom-10 -right-20 w-60 h-60 rounded-full"
            style={{
              backgroundColor: '#bcb291',
              opacity: 0.25,
              animation: 'float 9s ease-in-out infinite reverse'
            }}
          ></div>
          
          {/* Main Content */}
          <div className="relative z-20">
            <h1 
              className="text-9xl md:text-[12rem] lg:text-[14rem] font-bold font-serif mb-8"
              style={{ 
                color: '#654321',
                fontFamily: 'Brush Script MT',
                textShadow: '3px 3px 6px rgba(0,0,0,0.2)'
              }}
            >
              Coming Soon
            </h1>
            
            <div className="flex justify-center space-x-4 mb-10">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: '#654321' }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: '#654321' }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: '#654321' }}
              ></div>
            </div>
            
            <div className="mb-8 max-w-md mx-auto">
              <p className="text-gray-800 text-lg mb-1 font-medium">
                An extra layer of safety, camera in cabs. Wanna know more about it?
              </p>
              <p className="text-gray-800 text-lg font-medium">
                Stay tuned!
              </p>
            </div>
            
            <button 
              className="text-[#bcb291] px-14 py-5 rounded-full font-bold text-xl md:text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ backgroundColor: '#654321' }}
              onMouseEnter={(e) => {
  (e.target as HTMLElement).style.backgroundColor = '#A0522D';
}}
onMouseLeave={(e) => {
  (e.target as HTMLElement).style.backgroundColor = '#654321';
}}
            >
              Get Notified
            </button>
          </div>
        </div>
      </div>

      
      <style >{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}