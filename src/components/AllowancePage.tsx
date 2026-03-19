import { AllowanceStamp } from './AllowanceStamp';

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

interface AllowancePageProps {
  activities: AllowanceActivity[];
  pageNumber: number;
  weekOf: string;
}

export function AllowancePage({ activities, pageNumber, weekOf }: AllowancePageProps) {
  const completedCount = activities.filter(activity => activity.completed).length;
  const totalEarned = activities
    .filter(activity => activity.completed)
    .reduce((sum, activity) => sum + activity.amount, 0);

  return (
    <div 
      className="p-8 rounded-lg shadow-inner border border-pink-200 min-h-[600px]" 
      style={{ backgroundColor: '#fef7ff' }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-purple-800">
            第{pageNumber}週 ({weekOf})
          </h2>
          <p className="text-sm text-purple-600">
            完了: {completedCount}/{activities.length} | 獲得: ¥{totalEarned}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl">🌟</div>
          <div className="text-xs text-purple-600">がんばったね！</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <AllowanceStamp
            key={activity.id}
            activity={activity.activity}
            amount={activity.amount}
            date={activity.date}
            completed={activity.completed}
            imageUrl={activity.imageUrl}
            emoji={activity.emoji}
            category={activity.category}
          />
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="flex items-center justify-center h-48 text-purple-400">
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <p>この週の目標はまだ設定されていません</p>
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      {activities.length > 0 && (
        <div className="mt-6 bg-white rounded-full p-2 border border-purple-200">
          <div className="flex justify-between items-center mb-1 px-2">
            <span className="text-xs text-purple-600">週間進捗</span>
            <span className="text-xs text-purple-600">{Math.round((completedCount / activities.length) * 100)}%</span>
          </div>
          <div className="w-full bg-purple-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / activities.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}