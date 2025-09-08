import React from 'react';
import { BookOpen, Gamepad2, Trophy, Award, TrendingUp, Clock } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Student, Badge } from '../../types';

export function StudentDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const student = user as Student;

  const recentBadges: Badge[] = [
    {
      id: '1',
      title: 'Math Wizard',
      description: 'Completed 10 math lessons',
      icon: '🧙‍♂️',
      color: '#3B82F6',
      requirements: 'Complete 10 math lessons',
      earnedAt: new Date()
    },
    {
      id: '2',
      title: 'Science Explorer',
      description: 'Discovered 5 science concepts',
      icon: '🔬',
      color: '#10B981',
      requirements: 'Complete 5 science lessons',
      earnedAt: new Date()
    }
  ];

  const todayTasks = [
    { id: '1', title: 'Complete Algebra Basics', type: 'lesson', points: 50, estimated: '15 min' },
    { id: '2', title: 'Math Puzzle Challenge', type: 'game', points: 30, estimated: '10 min' },
    { id: '3', title: 'Science Quiz: Physics', type: 'quiz', points: 40, estimated: '12 min' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {t('welcome')}, {student?.name}! 👋
            </h1>
            <p className="text-blue-100 mt-2">
              Ready to learn something new today?
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{student?.level}</div>
            <div className="text-blue-100 text-sm">{t('level')}</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-blue-100 mb-2">
            <span>Level {student?.level} Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div className="bg-white h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-blue-100 text-sm mt-1">250 more points to level up!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Points"
          value={student?.totalPoints || 0}
          icon={Trophy}
          color="yellow"
          trend={12}
        />
        <StatCard
          title="Lessons Completed"
          value={student?.completedLessons?.length || 0}
          icon={BookOpen}
          color="blue"
          trend={8}
        />
        <StatCard
          title="Games Played"
          value={15}
          icon={Gamepad2}
          color="purple"
          trend={5}
        />
        <StatCard
          title="Badges Earned"
          value={student?.badges?.length || 0}
          icon={Award}
          color="green"
          trend={20}
        />
      </div>

      {/* Today's Tasks & Recent Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Today's Tasks</span>
          </h2>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">{task.type} • {task.estimated}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-600 font-medium">+{task.points}</div>
                  <div className="text-xs text-gray-500">{t('points')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Badges */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span>Recent Badges</span>
          </h2>
          <div className="space-y-4">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{badge.title}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors text-left">
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Continue Learning</h3>
            <p className="text-sm text-gray-600">Resume your last lesson</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left">
            <Gamepad2 className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Play Games</h3>
            <p className="text-sm text-gray-600">Learn through fun games</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-left">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Progress</h3>
            <p className="text-sm text-gray-600">Check your achievements</p>
          </button>
        </div>
      </div>
    </div>
  );
}