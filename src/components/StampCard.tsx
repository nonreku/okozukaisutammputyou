import { ImageWithFallback } from './figma/ImageWithFallback';

interface StampCardProps {
  imageUrl: string;
  title: string;
  country: string;
  year: string;
  value: string;
}

export function StampCard({ imageUrl, title, country, year, value }: StampCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="bg-gray-50 p-3 rounded border border-dashed border-gray-300 mb-3">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-24 object-cover rounded"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-xs text-gray-600">{country}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{year}</span>
          <span className="text-xs font-medium text-blue-600">{value}</span>
        </div>
      </div>
    </div>
  );
}