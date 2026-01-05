import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <AlertCircle className="w-24 h-24 text-gray-400" />
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            ページが見つかりません
          </h2>
          <p className="text-gray-600">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center py-3 px-6
                     bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     rounded-xl transition-colors shadow-lg active:scale-95
                     transform duration-200 space-x-2"
        >
          <Home className="w-5 h-5" />
          <span>ホームに戻る</span>
        </Link>
      </div>
    </main>
  );
}
