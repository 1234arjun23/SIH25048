import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Star } from 'lucide-react';
import { LessonCard } from '../common/LessonCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { Lesson } from '../../types';

export function LessonsView() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Mock lessons data
  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      grade: '8',
      description: 'Learn the basics of algebraic expressions and equations',
      content: [
        { id: '1', type: 'video', title: 'What is Algebra?', content: {}, order: 1 },
        { id: '2', type: 'text', title: 'Variables and Constants', content: {}, order: 2 },
        { id: '3', type: 'quiz', title: 'Practice Quiz', content: {}, order: 3 }
      ],
      duration: 25,
      difficulty: 'easy',
      points: 50,
      isDownloaded: true,
      language: 'en'
    },
    {
      id: '2',
      title: 'States of Matter',
      subject: 'Science',
      grade: '7',
      description: 'Explore solid, liquid, and gas states with interactive animations',
      content: [
        { id: '1', type: 'animation', title: 'Molecular Movement', content: {}, order: 1 },
        { id: '2', type: 'text', title: 'Properties of States', content: {}, order: 2 },
        { id: '3', type: 'game', title: 'State Change Game', content: {}, order: 3 }
      ],
      duration: 30,
      difficulty: 'medium',
      points: 75,
      isDownloaded: false,
      language: 'en'
    },
    {
      id: '3',
      title: 'Photosynthesis Process',
      subject: 'Science',
      grade: '9',
      description: 'Understand how plants make their own food through photosynthesis',
      content: [
        { id: '1', type: 'animation', title: 'Plant Cell Structure', content: {}, order: 1 },
        { id: '2', type: 'video', title: 'Light and Dark Reactions', content: {}, order: 2 },
        { id: '3', type: 'quiz', title: 'Photosynthesis Quiz', content: {}, order: 3 }
      ],
      duration: 35,
      difficulty: 'hard',
      points: 100,
      isDownloaded: false,
      language: 'en'
    }
  ];

  const subjects = ['all', 'Mathematics', 'Science', 'English'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleStartLesson = (lessonId: string) => {
    console.log('Starting lesson:', lessonId);
    // In a real app, this would navigate to the lesson player
  };

  const handleDownloadLesson = (lessonId: string) => {
    console.log('Downloading lesson:', lessonId);
    // In a real app, this would download the lesson for offline use
  };

  // Mock progress data
  const getProgress = (lessonId: string) => {
    const progressMap: { [key: string]: number } = {
      '1': 75,
      '2': 30,
      '3': 0
    };
    return progressMap[lessonId] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('lessons')}</h1>
            <p className="text-gray-600">Interactive lessons designed for rural students</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : t(difficulty)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            progress={getProgress(lesson.id)}
            onStart={() => handleStartLesson(lesson.id)}
            onDownload={() => handleDownloadLesson(lesson.id)}
          />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}