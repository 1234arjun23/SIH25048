import React from 'react';
import { Users, BookOpen, BarChart3, TrendingUp, Clock, Award, HelpCircle, Upload } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Teacher } from '../../types';

export function TeacherDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const teacher = user as Teacher;

  const recentActivities = [
    { id: '1', student: 'Priya Sharma', action: 'Completed Algebra Basics', time: '2 hours ago', points: 50 },
    { id: '2', student: 'Raj Kumar', action: 'Started Science Quiz', time: '3 hours ago', points: 30 },
    { id: '3', student: 'Anita Singh', action: 'Earned Math Wizard Badge', time: '5 hours ago', points: 100 },
  ];

  const upcomingTasks = [
    { id: '1', title: 'Review Quiz Results', type: 'review', dueDate: 'Today', priority: 'high' },
    { id: '2', title: 'Create New Quiz', type: 'quiz', dueDate: 'Tomorrow', priority: 'medium' },
    { id: '3', title: 'Upload Game Content', type: 'upload', dueDate: 'Friday', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {t('welcome')}, {teacher?.name}! 👨‍🏫
            </h1>
            <p className="text-green-100 mt-2">
              Manage your students and create engaging content
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{teacher?.students?.length || 0}</div>
            <div className="text-green-100 text-sm">Active Students</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={teacher?.students?.length || 0}
          icon={Users}
          color="blue"
          trend={5}
        />
        <StatCard
          title="Lessons Created"
          value={12}
          icon={BookOpen}
          color="green"
          trend={8}
        />
        <StatCard
          title="Quizzes Created"
          value={8}
          icon={HelpCircle}
          color="purple"
          trend={15}
        />
        <StatCard
          title="Games Uploaded"
          value={5}
          icon={Upload}
          color="yellow"
          trend={10}
        />
      </div>

      {/* Recent Activities & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Student Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Recent Student Activities</span>
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{activity.student}</h3>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-medium">+{activity.points}</div>
                  <div className="text-xs text-gray-500">{t('points')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Upcoming Tasks</span>
          </h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">{task.type}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{task.dueDate}</p>
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
            <HelpCircle className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Create Quiz</h3>
            <p className="text-sm text-gray-600">Design custom quizzes for students</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-left">
            <Upload className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Upload Games</h3>
            <p className="text-sm text-gray-600">Add interactive learning games</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors text-left">
            <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-600">Track student progress</p>
          </button>
        </div>
      </div>
    </div>
  );
}