'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  sessionExpiry: Date | null;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_KEY = 'lms_session';
const USER_KEY = 'lms_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);

  useEffect(() => {
    initializeSession();
    
    // Check session validity every minute
    const interval = setInterval(checkSessionValidity, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const initializeSession = () => {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      const userData = localStorage.getItem(USER_KEY);
      
      if (sessionData && userData) {
        const session = JSON.parse(sessionData);
        const expiry = new Date(session.expiry);
        
        if (expiry > new Date()) {
          // Session is still valid
          setUser(JSON.parse(userData));
          setSessionExpiry(expiry);
        } else {
          // Session expired, clear storage
          clearSession();
        }
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const checkSessionValidity = () => {
    if (sessionExpiry && sessionExpiry <= new Date()) {
      logout();
    }
  };

  const createSession = (user: User) => {
    const expiry = new Date(Date.now() + SESSION_DURATION);
    const sessionData = {
      expiry: expiry.toISOString(),
      userId: user.id,
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setSessionExpiry(expiry);
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setSessionExpiry(null);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual backend call
      // Example: const response = await authService.login(email, password)
      
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        createSession(foundUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual backend call
      // Example: const response = await authService.register(userData)
      
      // Mock registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email!,
        name: userData.name!,
        role: userData.role || 'learner',
        tenantId: userData.tenantId!,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(newUser);
      createSession(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // TODO: Replace with actual backend call
      // Example: const response = await userService.updateProfile(user.id, updates)
      
      // Mock update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates, updatedAt: new Date() };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const refreshSession = () => {
    if (user) {
      createSession(user);
    }
  };

  const logout = () => {
    clearSession();
    // Redirect will be handled by the component calling logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        isLoading,
        isAuthenticated: !!user,
        sessionExpiry,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}