'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

interface UseQRScannerResult {
  videoRef: React.RefObject<HTMLVideoElement>;
  result: string | null;
  error: string | null;
  isScanning: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
}

export function useQRScanner(): UseQRScannerResult {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const startScanning = useCallback(async () => {
    if (!videoRef.current) {
      setError('Video要素が見つかりません');
      return;
    }

    setError(null);
    setIsScanning(true);

    try {
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      // 利用可能なカメラデバイスを取得
      const videoInputDevices = await codeReader.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error('カメラデバイスが見つかりません');
      }

      // 背面カメラを優先的に選択
      const selectedDevice = videoInputDevices.find(
        device => device.label.toLowerCase().includes('back')
      ) || videoInputDevices[0];

      // QRコードスキャン開始
      await codeReader.decodeFromVideoDevice(
        selectedDevice.deviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            setResult(result.getText());
            stopScanning();
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('スキャンエラー:', error);
          }
        }
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
      setError(errorMessage);
      setIsScanning(false);
      console.error('QRスキャナー起動エラー:', err);
    }
  }, [stopScanning]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return {
    videoRef,
    result,
    error,
    isScanning,
    startScanning,
    stopScanning,
  };
}
