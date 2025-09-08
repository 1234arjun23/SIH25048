import React, { useState } from 'react';
import { Search, Gamepad2, Trophy, Clock, Star } from 'lucide-react';
import { GameCard } from '../common/GameCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { Game } from '../../types';

export function GamesView() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Mock games data
  const games: Game[] = [
    {
      id: '1',
      title: 'Math Puzzle Master',
      type: 'puzzle',
      description: 'Solve mathematical puzzles to unlock new levels',
      difficulty: 'easy',
      points: 50,
      isDownloaded: true,
      language: 'en'
    },
    {
      id: '2',
      title: 'Memory Science',
      type: 'memory',
      description: 'Match scientific concepts and definitions',
      difficulty: 'medium',
      points: 75,
      isDownloaded: false,
      language: 'en'
    },
    {
      id: '3',
      title: 'Fraction Adventure',
      type: 'math',
      description: 'Journey through the land of fractions and decimals',
      difficulty: 'hard',
      points: 100,
      isDownloaded: true,
      language: 'en'
    },
    {
      id: '4',
      title: 'Chemistry Lab',
      type: 'science',
      description: 'Conduct virtual experiments safely',
      difficulty: 'medium',
      points: 85,
      isDownloaded: false,
      language: 'en'
    }
  ];

  const gameTypes = ['all', 'puzzle', 'memory', 'math', 'science'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || game.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || game.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const handlePlayGame = (gameId: string) => {
    console.log('Playing game:', gameId);
    // In a real app, this would launch the game
  };

  const handleDownloadGame = (gameId: string) => {
    console.log('Downloading game:', gameId);
    // In a real app, this would download the game for offline play
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('games')}</h1>
            <p className="text-gray-600">Learn through fun and interactive games</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <Gamepad2 className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {gameTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
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

      {/* Featured Game */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">🌟 Featured Game</h2>
            <h3 className="text-2xl font-bold">Math Puzzle Master</h3>
            <p className="text-purple-100 mt-2">
              Challenge your problem-solving skills with engaging math puzzles
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>50 points</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>~15 min</span>
              </div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Play Now
          </button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onPlay={() => handlePlayGame(game.id)}
            onDownload={() => handleDownloadGame(game.id)}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}