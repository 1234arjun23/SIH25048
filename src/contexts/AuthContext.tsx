import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Student, Teacher, Admin } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isOffline: boolean;
  toggleOfflineMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'student@rural.edu',
    role: 'student',
    language: 'en',
    grade: '8th',
    totalPoints: 1250,
    level: 5,
    badges: [
      {
        id: '1',
        title: 'Math Wizard',
        description: 'Completed 10 math lessons',
        icon: '🧙‍♂️',
        color: '#3B82F6',
        requirements: 'Complete 10 math lessons'
      }
    ],
    completedLessons: ['1', '2', '3']
  } as Student,
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'teacher@rural.edu',
    role: 'teacher',
    language: 'en',
    subjects: ['Mathematics', 'Science'],
    students: ['1']
  } as Teacher,
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@rural.edu',
    role: 'admin',
    language: 'en',
    permissions: ['manage_users', 'manage_content']
  } as Admin
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('rural_edu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Check network status
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('rural_edu_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rural_edu_user');
  };

  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isOffline,
      toggleOfflineMode
    }}>
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