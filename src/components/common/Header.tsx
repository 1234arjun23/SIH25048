import React, { useState } from 'react';
import { Menu, X, Globe, Wifi, WifiOff, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout, isOffline, toggleOfflineMode } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RE</span>
            </div>
            <span className="font-bold text-xl text-gray-800">Rural Edu</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Offline/Online Status */}
          <button
            onClick={toggleOfflineMode}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
              isOffline 
                ? 'bg-orange-100 text-orange-700' 
                : 'bg-green-100 text-green-700'
            }`}
          >
            {isOffline ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {isOffline ? t('offline') : t('online')}
            </span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {language.toUpperCase()}
              </span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setShowLanguageMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi');
                    setShowLanguageMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                >
                  हिंदी
                </button>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {user?.name}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 text-sm text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}