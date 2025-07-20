import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { validateAdminCredentials, getAdminByEmail, AdminCredential } from '../data/adminCredentials';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, otp?: string, adminRole?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  adminCredential: AdminCredential | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [adminCredential, setAdminCredential] = useState<AdminCredential | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('dbu_user');
    const savedAdminCred = localStorage.getItem('dbu_admin_credential');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedAdminCred) {
      setAdminCredential(JSON.parse(savedAdminCred));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, otp?: string, adminRole?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let mockUser: User;
      let adminCred: AdminCredential | null = null;
      
      if (adminRole) {
        // Validate admin credentials
        adminCred = validateAdminCredentials(email, adminRole);
        
        if (!adminCred) {
          throw new Error('Unauthorized: Invalid admin credentials for this role');
        }

        // Additional security: Check if email matches the expected pattern for the role
        if (!email.endsWith('@dbu.edu.et')) {
          throw new Error('Invalid email domain. Must be @dbu.edu.et');
        }

        // Create admin user
        mockUser = {
          id: `admin-${adminRole}`,
          name: adminCred.name,
          email: adminCred.email,
          role: adminRole as any,
          branch: adminCred.branch,
          isVerified: true
        };

        setAdminCredential(adminCred);
        localStorage.setItem('dbu_admin_credential', JSON.stringify(adminCred));
      } else {
        // Student login - only allow @dbu.edu.et emails
        if (!email.endsWith('@dbu.edu.et')) {
          throw new Error('Invalid email domain. Must be @dbu.edu.et');
        }

        // Check if this email is reserved for admin use
        const reservedAdmin = getAdminByEmail(email);
        if (reservedAdmin) {
          throw new Error('This email is reserved for administrative use. Please use admin portal.');
        }

        mockUser = {
          id: '1',
          name: 'Student User',
          email,
          studentId: 'DBU/2021/001',
          role: 'student',
          isVerified: true
        };
      }

      setUser(mockUser);
      localStorage.setItem('dbu_user', JSON.stringify(mockUser));
      
      // Log admin access
      if (adminRole && adminCred) {
        logAdminAccess(mockUser, adminCred);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '2',
        name: 'Hanna Solomon',
        email: 'hanna.solomon@dbu.edu.et',
        studentId: 'DBU/2022/156',
        role: 'student',
        isVerified: true
      };

      setUser(mockUser);
      localStorage.setItem('dbu_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAdminCredential(null);
    localStorage.removeItem('dbu_user');
    localStorage.removeItem('dbu_admin_credential');
  };

  const logAdminAccess = (user: User, adminCred: AdminCredential) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      adminEmail: user.email,
      adminName: adminCred.name,
      role: user.role,
      action: 'LOGIN',
      ipAddress: '192.168.1.1', // In real app, get actual IP
      permissions: adminCred.permissions
    };
    
    // Store in localStorage for demo (in real app, send to server)
    const existingLogs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    existingLogs.push(logEntry);
    localStorage.setItem('admin_logs', JSON.stringify(existingLogs));
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    isLoading,
    adminCredential
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}