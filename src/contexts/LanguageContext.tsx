import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcome: 'Welcome',
    login: 'Login',
    logout: 'Logout',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Admin',
    dashboard: 'Dashboard',
    lessons: 'Lessons',
    games: 'Games',
    quizzes: 'Quizzes',
    progress: 'Progress',
    leaderboard: 'Leaderboard',
    badges: 'Badges',
    profile: 'Profile',
    settings: 'Settings',
    offline: 'Offline Mode',
    online: 'Online',
    download: 'Download',
    downloaded: 'Downloaded',
    sync: 'Sync',
    points: 'Points',
    level: 'Level',
    rank: 'Rank',
    complete: 'Complete',
    start: 'Start',
    continue: 'Continue',
    mathematics: 'Mathematics',
    science: 'Science',
    english: 'English',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  },
  hi: {
    welcome: 'स्वागत',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    student: 'छात्र',
    teacher: 'शिक्षक',
    admin: 'प्रशासक',
    dashboard: 'डैशबोर्ड',
    lessons: 'पाठ',
    games: 'खेल',
    quizzes: 'प्रश्नोत्तरी',
    progress: 'प्रगति',
    leaderboard: 'लीडरबोर्ड',
    badges: 'बैज',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    offline: 'ऑफ़लाइन मोड',
    online: 'ऑनलाइन',
    download: 'डाउनलोड',
    downloaded: 'डाउनलोड किया गया',
    sync: 'समक्रमण',
    points: 'अंक',
    level: 'स्तर',
    rank: 'रैंक',
    complete: 'पूर्ण',
    start: 'शुरू',
    continue: 'जारी रखें',
    mathematics: 'गणित',
    science: 'विज्ञान',
    english: 'अंग्रेजी',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}