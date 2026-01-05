'use client';

import { useState } from 'react';
import { TIP_PRESETS } from '@/lib/types';
import { formatCurrency, cn } from '@/lib/utils';

interface TipSelectorProps {
  selectedAmount: number | null;
  onChange: (amount: number) => void;
}

const MAX_CUSTOM_AMOUNT = 100000;

export default function TipSelector({ selectedAmount, onChange }: TipSelectorProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');

  const isPresetAmount = TIP_PRESETS.includes(selectedAmount as any);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 数字のみを許可
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }

    setCustomAmount(value);
    setError('');

    if (value === '') {
      onChange(null as any);
      return;
    }

    const numValue = parseInt(value, 10);

    // バリデーション
    if (numValue > MAX_CUSTOM_AMOUNT) {
      setError(`金額は${formatCurrency(MAX_CUSTOM_AMOUNT)}以下にしてください`);
      return;
    }

    if (numValue <= 0) {
      setError('1円以上の金額を入力してください');
      return;
    }

    onChange(numValue);
  };

  const handlePresetClick = (amount: number) => {
    setCustomAmount('');
    setError('');
    onChange(amount);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">チップ金額を選択</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TIP_PRESETS.map((amount) => (
          <button
            key={amount}
            onClick={() => handlePresetClick(amount)}
            className={cn(
              "py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200",
              "border-2 min-h-[60px] active:scale-95",
              selectedAmount === amount && isPresetAmount
                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            )}
            aria-label={`${formatCurrency(amount)}のチップを選択`}
            aria-pressed={selectedAmount === amount && isPresetAmount}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>

      {/* カスタム金額入力 */}
      <div className="space-y-2">
        <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700">
          または任意の金額を入力（上限: {formatCurrency(MAX_CUSTOM_AMOUNT)}）
        </label>
        <div className="relative">
          <input
            id="custom-amount"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="金額を入力"
            className={cn(
              "w-full py-3 px-4 pr-12 rounded-xl border-2 text-lg font-semibold",
              "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
              error
                ? "border-red-300 bg-red-50"
                : customAmount && !error
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white hover:border-blue-400"
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
            円
          </span>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      {selectedAmount && !error && (
        <p className="text-center text-sm text-gray-600">
          選択中: <span className="font-bold text-blue-600">{formatCurrency(selectedAmount)}</span>
        </p>
      )}
    </div>
  );
}
