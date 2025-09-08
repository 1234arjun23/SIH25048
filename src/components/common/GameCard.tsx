import React from 'react';
import { Play, Download, CheckCircle, Clock } from 'lucide-react';
import { Game } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface GameCardProps {
  game: Game;
  onPlay: () => void;
  onDownload?: () => void;
}

export function GameCard({ game, onPlay, onDownload }: GameCardProps) {
  const { t } = useLanguage();

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{game.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{game.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[game.difficulty]}`}>
          {t(game.difficulty)}
        </span>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>~15 min</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">⭐</span>
          <span>{game.points} {t('points')}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onPlay}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>{t('start')}</span>
        </button>
        
        {onDownload && (
          <button
            onClick={onDownload}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              game.isDownloaded
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {game.isDownloaded ? (
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