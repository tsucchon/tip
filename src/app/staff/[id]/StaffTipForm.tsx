'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Staff } from '@/lib/types';
import { useTipStore } from '@/lib/store';
import StaffCard from '@/components/StaffCard';
import TipSelector from '@/components/TipSelector';
import MessageInput from '@/components/MessageInput';

interface StaffTipFormProps {
  staff: Staff;
}

export default function StaffTipForm({ staff }: StaffTipFormProps) {
  const router = useRouter();
  const { setStaff, selectedAmount, setAmount, message, setMessage } = useTipStore();

  useEffect(() => {
    // スタッフ情報をストアに保存
    setStaff(staff);
  }, [staff, setStaff]);

  const handleNext = () => {
    if (!selectedAmount) {
      alert('チップ金額を選択してください');
      return;
    }
    router.push('/confirm');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        {/* ヘッダー */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            チップを送る
          </h1>
        </div>

        {/* スタッフ情報 */}
        <StaffCard staff={staff} />

        {/* 金額選択 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <TipSelector
            selectedAmount={selectedAmount}
            onChange={setAmount}
          />
        </div>

        {/* メッセージ入力 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <MessageInput
            value={message}
            onChange={setMessage}
          />
        </div>

        {/* 次へボタン */}
        <button
          onClick={handleNext}
          disabled={!selectedAmount}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700
                     text-white font-semibold rounded-xl transition-all
                     shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed
                     active:scale-95 transform duration-200
                     flex items-center justify-center space-x-2"
        >
          <span>確認画面へ</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}
