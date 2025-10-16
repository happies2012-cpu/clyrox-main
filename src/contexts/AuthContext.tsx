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

const AuthContext = createContext<AuthContextType>({
  user: {
    id: 'open-access-user',
    email: 'open@clyrox.com',
    app_metadata: {
      role: 'admin'
    }
  },
  loading: false,
  isAdmin: true,
  isAuthorized: () => true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    user: {
      id: 'open-access-user',
      email: 'open@clyrox.com',
      app_metadata: {
        role: 'admin'
      }
    },
    loading: false,
    isAdmin: true,
    isAuthorized: () => true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};