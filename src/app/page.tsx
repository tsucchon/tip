'use client';

import { useRouter } from 'next/navigation';
import { Coins } from 'lucide-react';
import QRScanner from '@/components/QRScanner';
import { extractStaffIdFromQR } from '@/lib/mockData';

export default function Home() {
  const router = useRouter();

  const handleScan = (data: string) => {
    const staffId = extractStaffIdFromQR(data);

    if (staffId) {
      router.push(`/staff/${staffId}`);
    } else {
      alert('有効なQRコードではありません。もう一度お試しください。');
    }
  };

  const handleError = (error: string) => {
    console.error('QRスキャンエラー:', error);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-600 rounded-full">
              <Coins className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            チップ投げアプリ
          </h1>
          <p className="text-lg text-gray-600">
            QRコードをスキャンして<br />
            スタッフにチップを送ろう
          </p>
        </div>

        {/* QRスキャナー */}
        <QRScanner onScan={handleScan} onError={handleError} />

        {/* デモ用リンク */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 text-center">
            デモ用スタッフ一覧
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/staff/staff_001')}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200
                         text-gray-800 font-medium rounded-lg transition-colors
                         text-left"
            >
              山田 太郎（バリスタ）
            </button>
            <button
              onClick={() => router.push('/staff/staff_002')}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200
                         text-gray-800 font-medium rounded-lg transition-colors
                         text-left"
            >
              佐藤 花子（フロアスタッフ）
            </button>
            <button
              onClick={() => router.push('/staff/staff_003')}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200
                         text-gray-800 font-medium rounded-lg transition-colors
                         text-left"
            >
              鈴木 次郎（シェフ）
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center pt-2">
            ※ QRコードがない場合はこちらから選択できます
          </p>
        </div>
      </div>
    </main>
  );
}
