
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Mail, User, LogIn } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, signInWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register(email, password, name);
      // We don't navigate here as we want the user to verify their email first
    } catch (err) {
      console.error("Registration error:", err);
      // Error toast is already handled in the auth context
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-skill-purple to-skill-indigo flex items-center justify-center mb-2">
            <span className="font-bold text-white text-lg">SB</span>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Create account
            </Button>
            
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z" fill="#FFF" stroke="#E5E7EB" strokeWidth="1" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0508 9.60021C12.6481 9.60021 13.1757 9.77461 13.6109 10.0821L15.2222 8.49776C14.3245 7.66722 13.1757 7.20001 12.0508 7.20001C10.2512 7.20001 8.71339 8.29901 7.96301 9.85311L9.77198 11.1786C10.1686 10.2346 11.0401 9.60021 12.0508 9.60021Z" fill="#EA4335" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15.9024 12.0684C15.9024 11.69 15.8635 11.3116 15.7858 10.9429H12.051V13.2567H14.3245C14.1691 14.0293 13.6497 14.6637 12.8993 15.0808L14.6737 16.3579C15.6022 15.4819 16.1313 14.2048 16.1313 12.6991C16.1313 12.4887 16.1216 12.2782 16.1022 12.0684H15.9024Z" fill="#4285F4" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9.79669 12.8977C9.69834 12.6097 9.64282 12.3023 9.64282 11.9997C9.64282 11.697 9.68866 11.3897 9.79669 11.1016L7.98772 9.77609C7.65146 10.4493 7.46436 11.1987 7.46436 12.0003C7.46436 12.802 7.65146 13.5513 7.98772 14.2246L9.79669 12.8977Z" fill="#FBBC05" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0508 16.8C13.175 16.8 14.1325 16.4403 14.8926 15.8059L13.1181 14.5289C12.7043 14.801 12.2013 14.9657 12.0508 14.9657C11.0497 14.9657 10.1879 14.342 9.79673 13.4085L7.98776 14.7243C8.73813 16.2894 10.2608 17.4 12.0508 17.4C12.0605 17.4 12.051 17.4 12.0508 17.4Z" fill="#34A853" />
              </svg>
              Sign up with Google
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="text-primary hover:underline" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
