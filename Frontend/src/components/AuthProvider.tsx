// src/components/AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'youth' | 'parent';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'youth' | 'parent') => Promise<boolean>;
  signup: (email: string, password: string, name: string, type: 'youth' | 'parent') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('cm_token');
    const strUser = localStorage.getItem('cm_user');
    if (token && strUser) {
      try {
        setUser(JSON.parse(strUser));
      } catch (e) {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'youth' | 'parent') => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: u } = res.data;
      if (!token) throw new Error('No token returned');
      localStorage.setItem('cm_token', token);
      localStorage.setItem('cm_user', JSON.stringify(u));
      setUser(u);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Login failed', err);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, type: 'youth' | 'parent') => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/register', { email, password, name, role: type === 'parent' ? 'parent' : 'child' });
      const { token, user: u } = res.data;
      if (!token) throw new Error('No token returned');
      localStorage.setItem('cm_token', token);
      localStorage.setItem('cm_user', JSON.stringify(u));
      setUser(u);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Signup failed', err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('cm_token');
    localStorage.removeItem('cm_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}