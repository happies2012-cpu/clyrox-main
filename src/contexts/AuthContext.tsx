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
  isAuthorized: () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
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
  }, []);

  const isAuthorized = (requiredRole?: string): boolean => {
    if (!user) return false;
    
    // If no specific role required, just check if user is logged in
    if (!requiredRole) return true;
    
    // For admin role, check if user is admin
    if (requiredRole === 'admin') {
      return isAdmin;
    }
    
    // For other roles, you can implement custom logic here
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