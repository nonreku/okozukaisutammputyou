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
    <div className="max-w-full md:max-w-7xl mx-auto px-4 py-6 md:p-8">
      {/* Title */}
      <div className="text-center mb-4 md:mb-8 lg:mb-12">
        <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 md:mb-3 leading-tight">
          おこづかい<br className="md:hidden" />スタンプ帳
        </h1>
        <p className="text-xs md:text-base lg:text-lg text-purple-600">がんばった日にスタンプを押そう！</p>
      </div>

      {/* Stamp Book */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-2 md:p-6 lg:p-8 rounded-lg md:rounded-2xl lg:rounded-3xl shadow-2xl">
        <div className="bg-white p-3 md:p-6 lg:p-8 rounded-lg md:rounded-xl lg:rounded-2xl">
          {/* Month Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 md:mb-6 lg:mb-8">
            <Button
              onClick={goToPrevMonth}
              variant="outline"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base py-2 md:py-default"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>前月</span>
            </Button>
            
            <div className="text-center order-first sm:order-none">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-purple-700 leading-tight">
                {year}年<br className="md:hidden" /> {monthNames[month]}
              </h2>
              <p className="text-xs md:text-base text-purple-500 mt-1">
                {stampedCount}/{totalDays}日 スタンプ済み
              </p>
            </div>
            
            <Button
              onClick={goToNextMonth}
              variant="outline"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base py-2 md:py-default"
            >
              <span>次月</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Day of Week Header */}
          <div className="grid grid-cols-7 gap-1.5 md:gap-2.5 lg:gap-3 mb-2 md:mb-3">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-xs md:text-sm lg:text-lg font-bold text-purple-600 py-2 md:py-3 h-8 md:h-10 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 md:gap-2.5 lg:gap-3">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleStamp(index)}
                disabled={day.date === 0}
                className={`rounded-lg md:rounded-xl lg:rounded-2xl border md:border-2 lg:border-3 transition-all duration-300 aspect-square min-h-12 md:min-h-16 lg:min-h-20 flex items-center justify-center p-1 ${
                  day.date === 0
                    ? 'bg-transparent border-transparent cursor-default'
                    : day.stamped
                    ? 'bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-500 shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-gray-50 border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:scale-105 active:scale-95'
                }`}
              >
                {day.date > 0 && (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-0.5">
                    {/* Date Number */}
                    <div className={`text-sm md:text-lg lg:text-xl font-bold leading-tight ${
                      day.stamped ? 'text-purple-800' : 'text-gray-600'
                    }`}>
                      {day.date}
                    </div>

                    {/* Stamp */}
                    {day.stamped ? (
                      <div className="relative flex items-center justify-center">
                        {/* Stamp Circle */}
                        <div className="absolute">
                          <div className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10 border-2 md:border-3 border-red-500 rounded-full opacity-40 rotate-12"></div>
                        </div>
                        
                        {/* Stamp Text */}
                        <div className="relative text-red-500 text-sm md:text-lg lg:text-2xl font-bold rotate-12">
                          ★
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-300 text-xs md:text-base lg:text-xl leading-none">
                        ◯
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Allowance Settings */}
          <div className="mt-4 md:mt-6 lg:mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg md:rounded-xl lg:rounded-2xl p-3 md:p-5 lg:p-6 border-2 border-green-200">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-3">
                <span className="text-base md:text-lg text-green-700">💰</span>
                <label className="text-xs md:text-sm text-green-700 text-center md:text-left">スタンプ1つ = </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={amountPerStamp}
                  onChange={(e) => setAmountPerStamp(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 md:w-20 px-2 md:px-3 py-1.5 md:py-2 border-2 border-green-300 rounded-lg text-center bg-white text-xs md:text-sm"
                />
                <span className="text-xs md:text-sm text-green-700">円</span>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl shadow-lg text-center">
                <div className="text-white">
                  <div className="text-xs md:text-sm">今月のおこづかい</div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-bold">{totalAllowance.toLocaleString()}円</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 md:mt-4 lg:mt-6 bg-purple-50 rounded-lg md:rounded-xl lg:rounded-2xl p-3 md:p-5 lg:p-6 border-2 border-purple-200">
            <div className="flex justify-between items-center mb-2 md:mb-3 gap-2">
              <span className="text-xs md:text-sm text-purple-700 font-medium">今月の進捗</span>
              <span className="text-xs md:text-sm lg:text-base text-purple-700 font-bold">{Math.round((stampedCount / totalDays) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2 md:h-3 lg:h-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 md:h-3 lg:h-4 rounded-full transition-all duration-500"
                style={{ width: `${(stampedCount / totalDays) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Message */}
      <div className="mt-4 md:mt-6 lg:mt-8 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg">
          <span className="text-lg md:text-2xl">✨</span>
          <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-tight text-center sm:text-left">
            {stampedCount === totalDays
              ? '全部完了！すごい！'
              : stampedCount >= totalDays * 0.8
              ? 'いい調子！がんばってるね！'
              : stampedCount >= totalDays * 0.5
              ? 'もう少し！がんばろう！'
              : 'さあ、スタンプを集めよう！'}
          </span>
          <span className="text-lg md:text-2xl">✨</span>
        </div>
      </div>
    </div>
  );
}