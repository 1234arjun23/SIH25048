import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { StudentDashboard } from './components/student/StudentDashboard';
import { LessonsView } from './components/student/LessonsView';
import { GamesView } from './components/student/GamesView';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        if (user?.role === 'student') return <StudentDashboard />;
        return <div className="p-8 text-center">Dashboard for {user?.role}</div>;
      case 'lessons':
        return <LessonsView />;
      case 'games':
        return <GamesView />;
      case 'quizzes':
        return <div className="p-8 text-center">Quizzes View - Coming Soon</div>;
      case 'progress':
        return <div className="p-8 text-center">Progress View - Coming Soon</div>;
      case 'leaderboard':
        return <div className="p-8 text-center">Leaderboard View - Coming Soon</div>;
      case 'badges':
        return <div className="p-8 text-center">Badges View - Coming Soon</div>;
      case 'downloads':
        return <div className="p-8 text-center">Downloads View - Coming Soon</div>;
      default:
        return <div className="p-8 text-center">View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;