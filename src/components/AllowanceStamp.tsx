import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, CheckCircle } from 'lucide-react';

interface AllowanceStampProps {
  activity: string;
  amount: number;
  date: string;
  completed: boolean;
  imageUrl?: string;
  emoji: string;
  category: 'chore' | 'study' | 'save' | 'help';
}

const categoryColors = {
  chore: 'bg-green-100 border-green-300 text-green-700',
  study: 'bg-blue-100 border-blue-300 text-blue-700',
  save: 'bg-purple-100 border-purple-300 text-purple-700',
  help: 'bg-orange-100 border-orange-300 text-orange-700'
};

const categoryLabels = {
  chore: 'お手伝い',
  study: '勉強',
  save: '貯金',
  help: 'ヘルプ'
};

export function AllowanceStamp({ activity, amount, date, completed, imageUrl, emoji, category }: AllowanceStampProps) {
  return (
    <div className={`relative p-4 rounded-xl shadow-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      completed 
        ? 'bg-white border-green-400 shadow-green-100' 
        : 'bg-gray-50 border-gray-300 opacity-60'
    }`}>
      {/* Completed Badge */}
      {completed && (
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      )}
      
      {/* Category Badge */}
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mb-3 ${categoryColors[category]}`}>
        <span>{categoryLabels[category]}</span>
      </div>
      
      {/* Image or Emoji */}
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-lg border border-yellow-200 mb-3 flex items-center justify-center h-20">
        {imageUrl ? (
          <ImageWithFallback
            src={imageUrl}
            alt={activity}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-3xl">{emoji}</span>
        )}
      </div>
      
      {/* Content */}
      <div className="space-y-2">
        <h3 className={`font-medium ${completed ? 'text-gray-900' : 'text-gray-500'}`}>
          {activity}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm ${completed ? 'text-gray-600' : 'text-gray-400'}`}>
            {date}
          </span>
          <div className="flex items-center gap-1">
            <Star className={`w-4 h-4 ${completed ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
            <span className={`font-bold ${completed ? 'text-green-600' : 'text-gray-400'}`}>
              ¥{amount}
            </span>
          </div>
        </div>
      </div>
      
      {/* Progress Stamp Effect */}
      {completed && (
        <div className="absolute inset-0 bg-green-500 opacity-10 rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
}