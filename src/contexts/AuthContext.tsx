import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthorized: (requiredRole?: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  isAuthorized: () => true, // Changed default to always return true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Changed default to true

  useEffect(() => {
    // Simulate a logged-in admin user to bypass authentication
    const simulateUser = {
      id: 'simulated-user-id',
      email: 'admin@example.com',
      app_metadata: {
        role: 'admin'
      }
    } as unknown as User;
    
    setUser(simulateUser);
    setIsAdmin(true);
    setLoading(false);

    // Comment out the actual authentication logic
    /*
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(data.session);
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      
      // Check if user is admin (either through app_metadata or specific email)
      const isAdminUser = currentUser?.app_metadata?.role === 'admin' || 
                          currentUser?.email === 'happies2011@gmail.com';
      setIsAdmin(isAdminUser);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Check if user is admin (either through app_metadata or specific email)
      const isAdminUser = currentUser?.app_metadata?.role === 'admin' || 
                          currentUser?.email === 'happies2011@gmail.com';
      setIsAdmin(isAdminUser);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
    */
  }, []);

  const isAuthorized = (requiredRole?: string): boolean => {
    // Always return true to bypass authorization
    return true;
  };

  const value = {
    user,
    session,
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