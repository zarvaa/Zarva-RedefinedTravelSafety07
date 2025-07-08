import React, { createContext, useState, useContext, ReactNode } from 'react';

type Mode = 'login' | 'signup';
type Role = 'user' | 'driver';

interface AuthModalContextType {
  showLoginModal: boolean;
  openLoginModal: (mode?: Mode, role?: Role) => void;
  closeLoginModal: () => void;
  mode: Mode;
  role: Role;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<Role>('user');

  const openLoginModal = (newMode: Mode = 'login', newRole: Role = 'user') => {
    setMode(newMode);
    setRole(newRole);
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <AuthModalContext.Provider value={{ showLoginModal, openLoginModal, closeLoginModal, mode, role }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
