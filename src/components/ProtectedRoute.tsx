import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  // Allow access to all routes without authentication
  return children;
};

export default ProtectedRoute;