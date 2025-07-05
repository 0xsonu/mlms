'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tenant, Theme } from '@/lib/types';
import { mockTenants } from '@/lib/mock-data';

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant) => void;
  tenants: Tenant[];
  currentTheme: Theme;
  switchTheme: (themeName: string) => void;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Theme definitions with proper HSL values
const themes: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    colors: {
      primary: '217.2 91.2% 59.8%',
      secondary: '217.2 32.6% 17.5%',
      accent: '217.2 32.6% 17.5%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '222.2 84% 4.9%',
      cardForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '217.2 91.2% 59.8%',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      heading: 'Inter, system-ui, sans-serif',
    },
  },
  corporate: {
    name: 'Corporate',
    colors: {
      primary: '210 100% 12%',
      secondary: '210 40% 96%',
      accent: '0 84.2% 60.2%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '210 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '210 100% 12%',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      heading: 'Inter, system-ui, sans-serif',
    },
  },
  'edu-bright': {
    name: 'Edu Bright',
    colors: {
      primary: '262.1 83.3% 57.8%',
      secondary: '220 14.3% 95.9%',
      accent: '38.4 92.1% 50.2%',
      background: '0 0% 100%',
      foreground: '224 71.4% 4.1%',
      card: '0 0% 100%',
      cardForeground: '224 71.4% 4.1%',
      muted: '220 14.3% 95.9%',
      mutedForeground: '220 8.9% 46.1%',
      border: '220 13% 91%',
      input: '220 13% 91%',
      ring: '262.1 83.3% 57.8%',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      heading: 'Inter, system-ui, sans-serif',
    },
  },
};

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants] = useState<Tenant[]>(mockTenants);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.dark);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tenant from domain/subdomain
    // In production, this would fetch based on the current domain
    const initializeTenant = async () => {
      try {
        // Mock: Get tenant from localStorage or default to first tenant
        const savedTenantId = localStorage.getItem('currentTenantId');
        const tenant = savedTenantId 
          ? tenants.find(t => t.id === savedTenantId) || tenants[0]
          : tenants[0];
        
        setCurrentTenant(tenant);
        const theme = themes[tenant.theme];
        setCurrentTheme(theme);
        
        // Apply theme to document
        applyTheme(theme, tenant.theme === 'dark');
      } catch (error) {
        console.error('Failed to initialize tenant:', error);
        setCurrentTenant(tenants[0]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTenant();
  }, [tenants]);

  const handleSetCurrentTenant = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    localStorage.setItem('currentTenantId', tenant.id);
    const theme = themes[tenant.theme];
    setCurrentTheme(theme);
    applyTheme(theme, tenant.theme === 'dark');
  };

  const switchTheme = (themeName: string) => {
    const theme = themes[themeName];
    if (theme && currentTenant) {
      setCurrentTheme(theme);
      applyTheme(theme, themeName === 'dark');
      
      // Update tenant theme preference
      const updatedTenant = { ...currentTenant, theme: themeName as any };
      setCurrentTenant(updatedTenant);
      localStorage.setItem('currentTenantId', updatedTenant.id);
    }
  };

  const applyTheme = (theme: Theme, isDark: boolean) => {
    const root = document.documentElement;
    
    // Apply dark class for dark mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply theme colors as CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVarName}`, value);
    });
    
    // Apply fonts
    root.style.setProperty('--font-sans', theme.fonts.sans);
    root.style.setProperty('--font-heading', theme.fonts.heading);
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        setCurrentTenant: handleSetCurrentTenant,
        tenants,
        currentTheme,
        switchTheme,
        isLoading,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}