'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { useTipStore } from '@/lib/store';
import { sendTipMock } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

export default function ConfirmPage() {
  const router = useRouter();
  const { currentStaff, selectedAmount, message } = useTipStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 必要な情報がない場合はホームにリダイレクト
    if (!currentStaff || !selectedAmount) {
      router.push('/');
    }
  }, [currentStaff, selectedAmount, router]);

  const handleSubmit = async () => {
    if (!currentStaff || !selectedAmount) return;

    setIsSubmitting(true);

    try {
      // モック送信処理
      await sendTipMock({
        staffId: currentStaff.id,
        amount: selectedAmount,
        message: message
      });

      // 完了画面へ遷移
      router.push('/complete');
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };

  if (!currentStaff || !selectedAmount) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        {/* ヘッダー */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            送信内容の確認
          </h1>
        </div>

        {/* 確認カード */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* スタッフ情報 */}
          <div className="flex items-center space-x-4 pb-4 border-b">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={currentStaff.photoUrl}
                alt={currentStaff.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">チップを送る相手</p>
              <p className="text-xl font-bold text-gray-900">{currentStaff.name}</p>
              <p className="text-sm text-gray-600">{currentStaff.position}</p>
            </div>
          </div>

          {/* 金額 */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 mb-2">チップ金額</p>
            <p className="text-4xl font-bold text-blue-600">
              {formatCurrency(selectedAmount)}
            </p>
          </div>

          {/* メッセージ */}
          {message && (
            <div className="bg-gray-50 rounded-lg p-4 border-t">
              <p className="text-sm text-gray-600 mb-2 font-semibold">メッセージ</p>
              <p className="text-gray-800">&quot;{message}&quot;</p>
            </div>
          )}
        </div>

        {/* 確認メッセージ */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center">
            上記の内容で送信します。よろしいですか？
          </p>
        </div>

        {/* 送信ボタン */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700
                     text-white font-semibold rounded-xl transition-all
                     shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed
                     active:scale-95 transform duration-200
                     flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>送信中...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>送信する</span>
            </>
          )}
        </button>

        {/* 注意事項 */}
        <p className="text-xs text-gray-500 text-center">
          ※ これはデモ画面です。実際の決済は行われません。
        </p>
      </div>
    </main>
  );
}
