import { useState } from 'react';
import { Star, CheckCircle, Wallet } from 'lucide-react';

interface DayActivity {
  day: string;
  dayOfWeek: string;
  emoji: string;
  activity: string;
  amount: number;
  completed: boolean;
}

const weekDays: DayActivity[] = [
  {
    day: '月',
    dayOfWeek: '月曜日',
    emoji: '🧹',
    activity: 'お部屋のお掃除',
    amount: 100,
    completed: false
  },
  {
    day: '火',
    dayOfWeek: '火曜日',
    emoji: '📚',
    activity: '宿題を完了',
    amount: 150,
    completed: false
  },
  {
    day: '水',
    dayOfWeek: '水曜日',
    emoji: '🍽️',
    activity: '食器洗い',
    amount: 80,
    completed: false
  },
  {
    day: '木',
    dayOfWeek: '木曜日',
    emoji: '🤝',
    activity: 'ママのお手伝い',
    amount: 120,
    completed: false
  },
  {
    day: '金',
    dayOfWeek: '金曜日',
    emoji: '📖',
    activity: '読書30分',
    amount: 100,
    completed: false
  },
  {
    day: '土',
    dayOfWeek: '土曜日',
    emoji: '🌱',
    activity: 'お庭の水やり',
    amount: 60,
    completed: false
  },
  {
    day: '日',
    dayOfWeek: '日曜日',
    emoji: '🎨',
    activity: 'お絵かき練習',
    amount: 90,
    completed: false
  }
];

export function WeeklyStampBook() {
  const [activities, setActivities] = useState<DayActivity[]>(weekDays);

  const toggleCompleted = (index: number) => {
    setActivities(prev => prev.map((activity, i) => 
      i === index ? { ...activity, completed: !activity.completed } : activity
    ));
  };

  const totalEarned = activities
    .filter(activity => activity.completed)
    .reduce((sum, activity) => sum + activity.amount, 0);

  const completedCount = activities.filter(activity => activity.completed).length;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl">🌟</span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            おこづかいスタンプ帳
          </h1>
          <span className="text-5xl">🌟</span>
        </div>
        <p className="text-purple-600">がんばった日にスタンプを押そう！</p>
      </div>

      {/* Stamp Book */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl">
        <div className="bg-white p-8 rounded-2xl">
          {/* Week Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
            {activities.map((activity, index) => (
              <button
                key={activity.day}
                onClick={() => toggleCompleted(index)}
                className={`relative p-6 rounded-2xl border-4 transition-all duration-300 hover:scale-105 ${
                  activity.completed
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-400 shadow-xl'
                    : 'bg-gray-50 border-gray-300 hover:border-purple-300'
                }`}
              >
                {/* Day of Week */}
                <div className={`text-center mb-3 text-xl font-bold ${
                  activity.completed ? 'text-purple-700' : 'text-gray-500'
                }`}>
                  {activity.day}
                </div>

                {/* Emoji */}
                <div className="text-5xl text-center mb-3">
                  {activity.emoji}
                </div>

                {/* Activity Name */}
                <div className={`text-center mb-3 text-sm min-h-[40px] flex items-center justify-center ${
                  activity.completed ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {activity.activity}
                </div>

                {/* Amount */}
                <div className="flex items-center justify-center gap-1">
                  <Star className={`w-5 h-5 ${
                    activity.completed ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
                  }`} />
                  <span className={`font-bold text-lg ${
                    activity.completed ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    ¥{activity.amount}
                  </span>
                </div>

                {/* Completed Badge */}
                {activity.completed && (
                  <div className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                )}

                {/* Stamp Effect */}
                {activity.completed && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-red-500 opacity-20 rotate-12 border-8 border-red-500 rounded-full w-24 h-24 flex items-center justify-center">
                      <span className="text-2xl font-bold">完了</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-purple-700 font-medium">今週の進捗</span>
              <span className="text-purple-700">{completedCount}/7日</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / 7) * 100}%` }}
              ></div>
            </div>
            
            {/* Total Earned */}
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4">
              <Wallet className="w-6 h-6" />
              <span className="font-medium">今週の獲得金額:</span>
              <span className="text-2xl font-bold">¥{totalEarned}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Message */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-full shadow-xl">
          <span className="text-2xl">✨</span>
          <span className="font-bold text-lg">
            {completedCount === 7 
              ? '全部完了！すごい！' 
              : completedCount >= 5 
              ? 'いい調子！がんばってるね！'
              : completedCount >= 3
              ? 'もう少し！がんばろう！'
              : 'さあ、スタンプを集めよう！'}
          </span>
          <span className="text-2xl">✨</span>
        </div>
      </div>
    </div>
  );
}
