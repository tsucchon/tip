'use client';

import { MessageSquare } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function MessageInput({
  value,
  onChange,
  maxLength = 200
}: MessageInputProps) {
  const remainingChars = maxLength - value.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="message" className="flex items-center text-lg font-semibold text-gray-900">
          <MessageSquare className="w-5 h-5 mr-2" />
          メッセージ（任意）
        </label>
        <span className="text-sm text-gray-500">
          {remainingChars} / {maxLength}
        </span>
      </div>
      <textarea
        id="message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={4}
        placeholder="感謝のメッセージを添えましょう（任意）"
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   resize-none text-base transition-colors
                   placeholder:text-gray-400"
      />
      {value.length > 0 && (
        <p className="text-sm text-gray-600">
          プレビュー: &quot;{value}&quot;
        </p>
      )}
    </div>
  );
}
