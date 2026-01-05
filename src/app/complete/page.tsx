'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';
import { useTipStore } from '@/lib/store';

export default function CompletePage() {
  const router = useRouter();
  const { currentStaff, selectedAmount, message, reset } = useTipStore();

  useEffect(() => {
    // 状態がない場合はホームにリダイレクト
    if (!currentStaff || !selectedAmount) {
      router.push('/');
    }
  }, [currentStaff, selectedAmount, router]);

  if (!currentStaff || !selectedAmount) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 成功アイコン */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
            <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping" />
          </div>
        </div>

        {/* メッセージ */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            送信完了！
          </h1>
          <p className="text-lg text-gray-600">
            {currentStaff.name}さんへチップを送りました
          </p>
        </div>

        {/* 送信内容サマリー */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-3 border border-green-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">スタッフ</span>
            <span className="font-semibold text-gray-900">{currentStaff.name}</span>
          </div>
          <div className="flex justify-between items-center border-t pt-3">
            <span className="text-gray-600">金額</span>
            <span className="font-bold text-2xl text-green-600">
              ¥{selectedAmount.toLocaleString()}
            </span>
          </div>
          {message && (
            <div className="border-t pt-3">
              <p className="text-sm text-gray-600 mb-1">メッセージ</p>
              <p className="text-gray-800 italic">&quot;{message}&quot;</p>
            </div>
          )}
        </div>

        {/* ホームに戻るボタン */}
        <Link
          href="/"
          onClick={() => reset()}
          className="inline-flex items-center justify-center w-full py-4 px-6
                     bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     rounded-xl transition-colors shadow-lg active:scale-95
                     transform duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          ホームに戻る
        </Link>

        <p className="text-sm text-gray-500">
          ありがとうございました！
        </p>
      </div>
    </main>
  );
}
