import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface DayStamp {
  date: number;
  dayOfWeek: string;
  stamped: boolean;
}

const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

const generateMonth = (year: number, month: number): DayStamp[] => {
  const days: DayStamp[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // 月初の曜日を取得（0:日曜日, 1:月曜日, ...）
  let firstDayOfWeek = firstDay.getDay();
  // 月曜日始まりに変換（0:月曜日, 1:火曜日, ...）
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  // 前月の空白セルを追加
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: 0, dayOfWeek: '', stamped: false });
  }
  
  // 本月の日付を追加
  for (let date = 1; date <= daysInMonth; date++) {
    const dayIndex = (firstDayOfWeek + date - 1) % 7;
    days.push({
      date,
      dayOfWeek: daysOfWeek[dayIndex],
      stamped: false
    });
  }
  
  return days;
};

export function MonthlyStampBook() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [days, setDays] = useState<DayStamp[]>(generateMonth(year, month));
  const [amountPerStamp, setAmountPerStamp] = useState(10); // 1スタンプあたりの金額

  const toggleStamp = (index: number) => {
    if (days[index].date === 0) return; // 空白セルは無視
    
    setDays(prev => prev.map((day, i) => 
      i === index ? { ...day, stamped: !day.stamped } : day
    ));
  };

  const goToPrevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;
    setMonth(newMonth);
    setYear(newYear);
    setDays(generateMonth(newYear, newMonth));
  };

  const goToNextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;
    setMonth(newMonth);
    setYear(newYear);
    setDays(generateMonth(newYear, newMonth));
  };

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  
  const stampedCount = days.filter(day => day.date !== 0 && day.stamped).length;
  const totalDays = days.filter(day => day.date !== 0).length;
  const totalAllowance = stampedCount * amountPerStamp; // 獲得したお小遣いの合計

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          おこづかいスタンプ帳
        </h1>
        <p className="text-purple-600 text-xl">がんばった日にスタンプを押そう！</p>
      </div>

      {/* Stamp Book */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-10 rounded-3xl shadow-2xl">
        <div className="bg-white p-10 rounded-2xl">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={goToPrevMonth}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              前月
            </Button>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-700">
                {year}年 {monthNames[month]}
              </h2>
              <p className="text-purple-500 mt-2">
                {stampedCount}/{totalDays}日 スタンプ済み
              </p>
            </div>
            
            <Button
              onClick={goToNextMonth}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              次月
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day of Week Header */}
          <div className="grid grid-cols-7 gap-3 mb-3">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-xl font-bold text-purple-600 py-3"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleStamp(index)}
                disabled={day.date === 0}
                className={`aspect-square rounded-2xl border-4 transition-all duration-300 ${
                  day.date === 0
                    ? 'bg-transparent border-transparent cursor-default'
                    : day.stamped
                    ? 'bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-500 shadow-xl hover:scale-105 active:scale-95'
                    : 'bg-gray-50 border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:scale-105 active:scale-95'
                }`}
              >
                {day.date > 0 && (
                  <div className="flex flex-col items-center justify-center h-full">
                    {/* Date Number */}
                    <div className={`text-2xl font-bold mb-2 ${
                      day.stamped ? 'text-purple-800' : 'text-gray-600'
                    }`}>
                      {day.date}
                    </div>

                    {/* Stamp */}
                    {day.stamped ? (
                      <div className="relative">
                        {/* Stamp Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-red-500 rounded-full opacity-40 rotate-12"></div>
                        </div>
                        
                        {/* Stamp Text */}
                        <div className="relative text-red-500 text-3xl font-bold rotate-12">
                          ★
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-300 text-3xl">
                        ○
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Allowance Settings */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-green-700 text-xl">💰</span>
                <label className="text-green-700">スタンプ1つ = </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={amountPerStamp}
                  onChange={(e) => setAmountPerStamp(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-2 border-2 border-green-300 rounded-lg text-center bg-white"
                />
                <span className="text-green-700">円</span>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-xl shadow-lg">
                <div className="text-white text-center">
                  <div className="text-sm">今月のおこづかい</div>
                  <div className="text-3xl">{totalAllowance.toLocaleString()}円</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-purple-700 font-medium">今月の進捗</span>
              <span className="text-purple-700">{Math.round((stampedCount / totalDays) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(stampedCount / totalDays) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Message */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-full shadow-xl">
          <span className="text-2xl">✨</span>
          <span className="font-bold text-lg">
            {stampedCount === totalDays
              ? '全部完了！すごい！'
              : stampedCount >= totalDays * 0.8
              ? 'いい調子！がんばってるね！'
              : stampedCount >= totalDays * 0.5
              ? 'もう少し！がんばろう！'
              : 'さあ、スタンプを集めよう！'}
          </span>
          <span className="text-2xl">✨</span>
        </div>
      </div>
    </div>
  );
}