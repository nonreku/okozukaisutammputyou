import { useState } from 'react';
import { StampPage } from './StampPage';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface Stamp {
  id: string;
  imageUrl: string;
  title: string;
  country: string;
  year: string;
  value: string;
}

const sampleStamps: Stamp[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1723400024840-e6d628358b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9zdGFnZSUyMHN0YW1wc3xlbnwxfHx8fDE3NTg3MTI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'ヴィンテージローズ',
    country: 'イギリス',
    year: '1965',
    value: '5p'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1596653695022-e3baca8f294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBvc3RhbCUyMHN0YW1wc3xlbnwxfHx8fDE3NTg3MTI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'カラフルコレクション',
    country: 'フランス',
    year: '1982',
    value: '2.50F'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1612798993808-36ca518f7ceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwc3RhbXBzJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NTg3MTI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'アンティークシリーズ',
    country: 'ドイツ',
    year: '1945',
    value: '10pf'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1702825342089-b6af3a870636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXJlJTIwcG9zdGFnZSUyMHN0YW1wc3xlbnwxfHx8fDE3NTg3MTI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'レアスタンプ',
    country: 'アメリカ',
    year: '1938',
    value: '3c'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1723400024840-e6d628358b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9zdGFnZSUyMHN0YW1wc3xlbnwxfHx8fDE3NTg3MTI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'クラシックデザイン',
    country: '日本',
    year: '1956',
    value: '10円'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1596653695022-e3baca8f294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb2xvcmZ1bCUyMHBvc3RhbCUyMHN0YW1wc3xlbnwxfHx8fDE3NTg3MTI2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'モダンスタイル',
    country: 'カナダ',
    year: '1978',
    value: '$0.25'
  }
];

const STAMPS_PER_PAGE = 8;

export function StampBook() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(sampleStamps.length / STAMPS_PER_PAGE);
  const startIndex = (currentPage - 1) * STAMPS_PER_PAGE;
  const currentStamps = sampleStamps.slice(startIndex, startIndex + STAMPS_PER_PAGE);
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-amber-600" />
          <h1 className="text-3xl font-bold text-gray-800">私のスタンプコレクション</h1>
        </div>
        <p className="text-gray-600">世界各国の美しいスタンプを集めました</p>
      </div>

      {/* Book Container */}
      <div className="bg-amber-900 p-6 rounded-xl shadow-2xl">
        <div className="bg-amber-50 p-2 rounded-lg">
          <StampPage stamps={currentStamps} pageNumber={currentPage} />
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 px-4">
          <Button
            variant="outline"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            前のページ
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-amber-100">
              {currentPage} / {totalPages}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentPage === i + 1
                      ? 'bg-amber-300'
                      : 'bg-amber-600 hover:bg-amber-400'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            次のページ
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-8 bg-white rounded-lg shadow-md px-8 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{sampleStamps.length}</div>
            <div className="text-sm text-gray-600">総スタンプ数</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{totalPages}</div>
            <div className="text-sm text-gray-600">ページ数</div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">6</div>
            <div className="text-sm text-gray-600">収集国数</div>
          </div>
        </div>
      </div>
    </div>
  );
}