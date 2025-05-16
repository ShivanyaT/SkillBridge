
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  streak: number;
  points: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Mock user data for demo
  const mockUser: User = {
    id: '1',
    email: 'demo@skillbridge.com',
    name: 'Demo User',
    streak: 5,
    points: 350,
    badges: ['Python Expert', 'Math Novice', 'Quiz Master'],
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // In a real app with Supabase:
        // const { data: { user } } = await supabase.auth.getSession();
        // if (user) { fetch user profile and set user state }
        
        // For demo, simulate authentication check with timeout
        setTimeout(() => {
          // Comment this line to simulate logged out state
          setUser(mockUser);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Auth error:', error);
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // With Supabase, we would use:
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email, password
      // });
      
      if (email === 'demo@skillbridge.com' && password === 'password') {
        setUser(mockUser);
        toast({
          title: "Login successful",
          description: "Welcome back to SkillBridge!",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message || "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate register delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // With Supabase:
      // const { data, error } = await supabase.auth.signUp({
      //   email, password, options: { data: { name } }
      // });
      
      // For demo, always succeed
      setUser({
        ...mockUser,
        email,
        name,
        streak: 0,
        points: 0,
        badges: [],
      });
      
      toast({
        title: "Registration successful",
        description: "Welcome to SkillBridge!",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message || "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // With Supabase: await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
