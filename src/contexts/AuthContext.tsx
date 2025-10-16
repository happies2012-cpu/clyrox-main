import { createContext, useContext } from 'react';

// Define a simple user type for open access
interface User {
  id: string;
  email: string;
  app_metadata: {
    role: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthorized: () => boolean;
}

// Simplified context with all permissions granted
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  isAdmin: true,
  isAuthorized: () => true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    user: null,
    loading: false,
    isAdmin: true,
    isAuthorized: () => true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};