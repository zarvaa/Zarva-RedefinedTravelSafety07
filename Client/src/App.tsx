// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Doyouknow from './pages/Doyouknow';
import OurService from './pages/OurService';
import Ourteam from './pages/Ourteam';
import Feedback from './pages/Feedback';
import Footer from './pages/Footer';
import SaferLocation from './pages/SaferLocation';
import AdvancedFeatures from './pages/Advancefeature';

import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import ComingSoon from './pages/Comingsoon';
import VoiceRecognition from './pages/VoiceRecognition';
import Additional from './pages/Additional';
import { AuthModalProvider } from './contexts/AuthModalContext';
import Signup from './pages/Signup'

// Layout component to wrap pages with Header
const WithHeaderLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <div className="pt-0">{children}</div>
  </>
);

function App() {
  return (
    <AuthModalProvider>
      <Router>
        <div className="no-scrollbar">
          <Routes>
            {/* Public routes */}
            <Route path="/auth-callback" element={
              <WithHeaderLayout>
                <AuthCallback />
              </WithHeaderLayout>
            } />
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Doyouknow />
                  <OurService />
                  <Additional />
                  <Ourteam />
                  <Feedback />
                  <Footer />
                </>
              }
            />
            
            {/* Protected routes */}
            {/* Location route without header */}
            <Route path="/location" element={
              <ProtectedRoute>
                <WithHeaderLayout>
                  <SaferLocation />
                </WithHeaderLayout>
              </ProtectedRoute>
            } />
            <Route path="/new" element={
              <ProtectedRoute>
                <WithHeaderLayout>
                  <ComingSoon />
                </WithHeaderLayout>
              </ProtectedRoute>
            } />
            <Route path="/speech" element={
              <ProtectedRoute>
                <WithHeaderLayout>
                  <VoiceRecognition />
                </WithHeaderLayout>
              </ProtectedRoute>
            } />
            <Route path="/feature" element={
              <ProtectedRoute>
                <WithHeaderLayout>
                  <AdvancedFeatures />
                </WithHeaderLayout>
              </ProtectedRoute>
            } />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthModalProvider>
  );
}

export default App;
