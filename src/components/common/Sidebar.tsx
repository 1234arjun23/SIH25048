import React from 'react';
import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  HelpCircle, 
  BarChart3, 
  Trophy, 
  Award, 
  Users,
  Settings,
  Upload,
  Download
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ isOpen, currentView, onViewChange }: SidebarProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const studentMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'lessons', label: t('lessons'), icon: BookOpen },
    { id: 'games', label: t('games'), icon: Gamepad2 },
    { id: 'quizzes', label: t('quizzes'), icon: HelpCircle },
    { id: 'progress', label: t('progress'), icon: BarChart3 },
    { id: 'leaderboard', label: t('leaderboard'), icon: Trophy },
    { id: 'badges', label: t('badges'), icon: Award },
    { id: 'downloads', label: 'Downloads', icon: Download },
  ];

  const teacherMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'lessons', label: t('lessons'), icon: BookOpen },
    { id: 'quizzes', label: 'Create Quiz', icon: HelpCircle },
    { id: 'upload-games', label: 'Upload Games', icon: Upload },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Management', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return studentMenuItems;
      case 'teacher':
        return teacherMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return [];
    }
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 md:static md:inset-0`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {getMenuItems().map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}