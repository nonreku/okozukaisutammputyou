import { useState } from 'react';

interface DayStamp {
  day: string;
  stamped: boolean;
}

const initialWeek: DayStamp[] = [
  { day: '月', stamped: false },
  { day: '火', stamped: false },
  { day: '水', stamped: false },
  { day: '木', stamped: false },
  { day: '金', stamped: false },
  { day: '土', stamped: false },
  { day: '日', stamped: false }
];

export function SimpleStampBook() {
  const [week, setWeek] = useState<DayStamp[]>(initialWeek);

  const toggleStamp = (index: number) => {
    setWeek(prev => prev.map((day, i) => 
      i === index ? { ...day, stamped: !day.stamped } : day
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
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
          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-6">
            {week.map((day, index) => (
              <button
                key={day.day}
                onClick={() => toggleStamp(index)}
                className={`aspect-square rounded-3xl border-4 transition-all duration-300 hover:scale-110 active:scale-95 ${
                  day.stamped
                    ? 'bg-gradient-to-br from-yellow-300 to-orange-400 border-yellow-500 shadow-2xl'
                    : 'bg-gray-50 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                {/* Day Label */}
                <div className={`text-3xl font-bold mb-4 ${
                  day.stamped ? 'text-purple-800' : 'text-gray-400'
                }`}>
                  {day.day}
                </div>

                {/* Stamp */}
                {day.stamped && (
                  <div className="relative">
                    {/* Stamp Circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 border-8 border-red-500 rounded-full opacity-40 rotate-12"></div>
                    </div>
                    
                    {/* Stamp Text */}
                    <div className="relative text-red-500 text-4xl font-bold rotate-12">
                      ★
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!day.stamped && (
                  <div className="text-gray-300 text-5xl">
                    ○
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}