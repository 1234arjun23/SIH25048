import React from 'react';
import { Play, Download, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { Lesson } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface LessonCardProps {
  lesson: Lesson;
  progress?: number;
  onStart: () => void;
  onDownload?: () => void;
}

export function LessonCard({ lesson, progress = 0, onStart, onDownload }: LessonCardProps) {
  const { t } = useLanguage();

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{lesson.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-500">{lesson.subject}</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500">Grade {lesson.grade}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
          {t(lesson.difficulty)}
        </span>
      </div>

      {progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{t('progress')}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{lesson.duration} min</span>
        </div>
        <div className="flex items-center space-x-1">
          <BookOpen className="h-4 w-4" />
          <span>{lesson.content.length} sections</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">⭐</span>
          <span>{lesson.points} {t('points')}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onStart}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>{progress > 0 ? t('continue') : t('start')}</span>
        </button>
        
        {onDownload && (
          <button
            onClick={onDownload}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              lesson.isDownloaded
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {lesson.isDownloaded ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}