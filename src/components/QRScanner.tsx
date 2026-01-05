'use client';

import { useEffect } from 'react';
import { Camera, AlertCircle, Loader2 } from 'lucide-react';
import { useQRScanner } from '@/hooks/useQRScanner';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onScan, onError }: QRScannerProps) {
  const { videoRef, result, error, isScanning, startScanning } = useQRScanner();

  useEffect(() => {
    if (result) {
      onScan(result);
    }
  }, [result, onScan]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* カメラビュー */}
      <div className="relative aspect-square bg-black rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          aria-label="QRコードスキャン用カメラビュー"
        />

        {/* スキャンガイド */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-4 border-white rounded-2xl opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-blue-500 rounded-2xl animate-pulse" />
            </div>
          </div>
        )}

        {/* スキャン中インジケーター */}
        {isScanning && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm font-medium text-gray-900">
                QRコードをスキャン中...
              </span>
            </div>
          </div>
        )}

        {/* エラー表示 */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm space-y-4 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  エラーが発生しました
                </h3>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700
                           text-white font-semibold rounded-lg transition-colors"
              >
                再試行
              </button>
            </div>
          </div>
        )}
      </div>

      {/* スキャン開始ボタン */}
      {!isScanning && !error && (
        <button
          onClick={startScanning}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700
                     text-white font-semibold rounded-xl transition-all
                     shadow-lg active:scale-95 transform duration-200
                     flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>QRコードをスキャン</span>
        </button>
      )}

      {/* 説明テキスト */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          スタッフのQRコードをカメラに向けてください
        </p>
        <p className="text-xs text-gray-500">
          カメラへのアクセス許可が必要です
        </p>
      </div>
    </div>
  );
}
