import { StampCard } from './StampCard';

interface Stamp {
  id: string;
  imageUrl: string;
  title: string;
  country: string;
  year: string;
  value: string;
}

interface StampPageProps {
  stamps: Stamp[];
  pageNumber: number;
}

export function StampPage({ stamps, pageNumber }: StampPageProps) {
  return (
    <div className="bg-cream-100 p-8 rounded-lg shadow-inner border border-amber-200 min-h-[600px]" style={{ backgroundColor: '#fefdf8' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">ページ {pageNumber}</h2>
        <div className="text-sm text-gray-500">
          {stamps.length} スタンプ
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stamps.map((stamp) => (
          <StampCard
            key={stamp.id}
            imageUrl={stamp.imageUrl}
            title={stamp.title}
            country={stamp.country}
            year={stamp.year}
            value={stamp.value}
          />
        ))}
      </div>
      
      {stamps.length === 0 && (
        <div className="flex items-center justify-center h-48 text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">📮</div>
            <p>このページにはまだスタンプがありません</p>
          </div>
        </div>
      )}
    </div>
  );
}