import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useAuth } from './AuthProvider';
import { Sparkles, Mail, Lock, User, Zap, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthFormsProps {
  onClose?: () => void;
}

export function AuthForms({ onClose }: AuthFormsProps) {
  const { login, signup, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState<'youth' | 'parent'>('youth');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(loginEmail, loginPassword, userType);
    if (success) {
      toast.success('Welcome back! 🚀');
      onClose?.();
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupEmail || !signupPassword || !signupName) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await signup(signupEmail, signupPassword, signupName, userType);
    if (success) {
      toast.success('Account created successfully! 🎉');
      onClose?.();
    } else {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Creative Mirror
          </CardTitle>
          <p className="text-sm text-muted-foreground">Your AI-powered mental wellness companion</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Choose your experience</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={userType === 'youth' ? 'default' : 'outline'}
                onClick={() => setUserType('youth')}
                className="h-12 flex flex-col items-center justify-center space-y-1"
              >
                <Zap className="w-4 h-4" />
                <span className="text-xs">Youth</span>
              </Button>
              <Button
                type="button"
                variant={userType === 'parent' ? 'default' : 'outline'}
                onClick={() => setUserType('parent')}
                className="h-12 flex flex-col items-center justify-center space-y-1"
              >
                <Shield className="w-4 h-4" />
                <span className="text-xs">Parent</span>
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/20">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Signing in...'
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Creating account...'
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center pt-4 border-t border-white/10">
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-800 dark:text-green-200 border-0">
              <Shield className="w-3 h-3 mr-1" />
              100% Private & Secure
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}