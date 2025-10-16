import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthorized: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  isAdmin: true,
  isAuthorized: () => true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    // Simulate a logged-in admin user to bypass authentication
    const simulateUser = {
      id: 'open-access-user',
      email: 'open@clyrox.com',
      app_metadata: {
        role: 'admin'
      }
    } as unknown as User;
    
    setUser(simulateUser);
    setIsAdmin(true);
    setLoading(false);
  }, []);

  const isAuthorized = (): boolean => {
    // Always return true to bypass authorization
    return true;
  };

  const value = {
    user,
    loading,
    isAdmin,
    isAuthorized,
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