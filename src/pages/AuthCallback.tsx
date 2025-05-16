
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Just checking for any errors, session is already handled by AuthContext
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          throw error;
        }
        
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate('/login', { replace: true });
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <h2 className="mt-4 text-lg font-medium">Completing authentication...</h2>
      </div>
    </div>
  );
};

export default AuthCallback;
