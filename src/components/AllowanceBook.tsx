import { useState } from 'react';
import { AllowancePage } from './AllowancePage';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Wallet, Target, TrendingUp } from 'lucide-react';

interface AllowanceActivity {
  id: string;
  activity: string;
  amount: number;
  date: string;
  completed: boolean;
  imageUrl?: string;
  emoji: string;
  category: 'chore' | 'study' | 'save' | 'help';
}

const sampleActivities: AllowanceActivity[] = [
  {
    id: '1',
    activity: 'お部屋のお掃除',
    amount: 100,
    date: '月曜日',
    completed: true,
    imageUrl: 'https://images.unsplash.com/photo-1748518557177-fd9ffd0df1f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2hvcmVzJTIwY2xlYW5pbmd8ZW58MXx8fHwxNzU4NzEzMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🧹',
    category: 'chore'
  },
  {
    id: '2',
    activity: '宿題を完了',
    amount: 150,
    date: '火曜日',
    completed: true,
    imageUrl: 'https://images.unsplash.com/photo-1544830281-1d5169d6b2af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGhvbWV3b3JrJTIwc3R1ZHl8ZW58MXx8fHwxNzU4NzEzMDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '📚',
    category: 'study'
  },
  {
    id: '3',
    activity: '貯金箱に入金',
    amount: 200,
    date: '水曜日',
    completed: true,
    imageUrl: 'https://images.unsplash.com/photo-1622219999459-ab5b14e5f45a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWdneSUyMGJhbmslMjBjb2luc3xlbnwxfHx8fDE3NTg3MTMwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🐷',
    category: 'save'
  },
  {
    id: '4',
    activity: 'ママのお手伝い',
    amount: 120,
    date: '木曜日',
    completed: false,
    emoji: '🤝',
    category: 'help'
  },
  {
    id: '5',
    activity: '食器洗い',
    amount: 80,
    date: '金曜日',
    completed: true,
    emoji: '🍽️',
    category: 'chore'
  },
  {
    id: '6',
    activity: '読書30分',
    amount: 100,
    date: '土曜日',
    completed: false,
    emoji: '📖',
    category: 'study'
  },
  {
    id: '7',
    activity: 'お庭の水やり',
    amount: 60,
    date: '日曜日',
    completed: true,
    emoji: '🌱',
    category: 'chore'
  },
  {
    id: '8',
    activity: '算数の練習',
    amount: 130,
    date: '月曜日',
    completed: false,
    emoji: '🔢',
    category: 'study'
  }
];

const ACTIVITIES_PER_PAGE = 7; // 1週間

export function AllowanceBook() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(sampleActivities.length / ACTIVITIES_PER_PAGE);
  const startIndex = (currentPage - 1) * ACTIVITIES_PER_PAGE;
  const currentActivities = sampleActivities.slice(startIndex, startIndex + ACTIVITIES_PER_PAGE);
  
  const totalEarned = sampleActivities
    .filter(activity => activity.completed)
    .reduce((sum, activity) => sum + activity.amount, 0);
  
  const totalPossible = sampleActivities.reduce((sum, activity) => sum + activity.amount, 0);
  const completedCount = sampleActivities.filter(activity => activity.completed).length;
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const getWeekLabel = (pageNum: number) => {
    const dates = ['9月第1週', '9月第2週', '9月第3週', '9月第4週'];
    return dates[pageNum - 1] || `${pageNum}週目`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Wallet className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            みんなのおこづかい帳
          </h1>
        </div>
        <p className="text-purple-600">がんばってお手伝いや勉強をしてお小遣いをためよう！</p>
      </div>

      {/* Book Container */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl shadow-2xl">
        <div className="bg-purple-50 p-2 rounded-lg">
          <AllowancePage 
            activities={currentActivities} 
            pageNumber={currentPage}
            weekOf={getWeekLabel(currentPage)}
          />
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 px-4">
          <Button
            variant="outline"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 bg-white/90 hover:bg-white border-white/50"
          >
            <ChevronLeft className="w-4 h-4" />
            前の週
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">
              {getWeekLabel(currentPage)}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentPage === i + 1
                      ? 'bg-yellow-300'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 bg-white/90 hover:bg-white border-white/50"
          >
            次の週
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="w-6 h-6 text-green-500" />
            <span className="text-green-600 font-medium">獲得金額</span>
          </div>
          <div className="text-3xl font-bold text-green-600">¥{totalEarned}</div>
          <div className="text-sm text-gray-500">目標: ¥{totalPossible}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-6 h-6 text-blue-500" />
            <span className="text-blue-600 font-medium">完了タスク</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">{completedCount}</div>
          <div className="text-sm text-gray-500">全{sampleActivities.length}タスク</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <span className="text-purple-600 font-medium">達成率</span>
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {Math.round((completedCount / sampleActivities.length) * 100)}%
          </div>
          <div className="text-sm text-gray-500">すごいね！</div>
        </div>
      </div>
      
      {/* Motivation Message */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg">
          <span className="text-xl">🌟</span>
          <span className="font-medium">
            {completedCount >= sampleActivities.length * 0.8 
              ? "すごい！よくがんばったね！" 
              : "もう少し！がんばろう！"}
          </span>
          <span className="text-xl">🌟</span>
        </div>
      </div>
    </div>
  );
}