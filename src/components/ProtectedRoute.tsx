import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../contexts/AuthModalContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('user') !== null;
  const { openLoginModal } = useAuthModal();
  const navigate = useNavigate();
  
  // If not authenticated, show login modal and redirect to home
  useEffect(() => {
    if (!isAuthenticated) {
      openLoginModal();
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, openLoginModal, navigate]);
  
  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;