import { Staff, TipFormData, TipTransaction } from './types';

export const MOCK_STAFF: Staff[] = [
  {
    id: 'staff_001',
    name: '山田 太郎',
    nameKana: 'やまだ たろう',
    photoUrl: 'https://ui-avatars.com/api/?name=Taro+Yamada&background=3b82f6&color=fff&size=256',
    position: 'バリスタ',
    department: 'カフェ',
    bio: '笑顔でお客様をお迎えします！コーヒーが大好きです。',
    joinedDate: '2023-04-01',
    specialties: ['ラテアート', 'エスプレッソ', '接客']
  },
  {
    id: 'staff_002',
    name: '佐藤 花子',
    nameKana: 'さとう はなこ',
    photoUrl: 'https://ui-avatars.com/api/?name=Hanako+Sato&background=ec4899&color=fff&size=256',
    position: 'フロアスタッフ',
    department: 'レストラン',
    bio: '美味しい料理とともに素敵な時間を提供します。',
    joinedDate: '2023-06-15',
    specialties: ['ワインペアリング', '料理説明', '多言語対応']
  },
  {
    id: 'staff_003',
    name: '鈴木 次郎',
    nameKana: 'すずき じろう',
    photoUrl: 'https://ui-avatars.com/api/?name=Jiro+Suzuki&background=10b981&color=fff&size=256',
    position: 'シェフ',
    department: 'キッチン',
    bio: '季節の食材を活かした料理をお届けします。',
    joinedDate: '2022-01-10',
    specialties: ['イタリアン', '創作料理', '食材選び']
  }
];

// スタッフ取得関数（実際のAPIを模倣）
export async function getStaffById(id: string): Promise<Staff | null> {
  // 実際のAPI呼び出しをシミュレート
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_STAFF.find(staff => staff.id === id) || null;
}

// チップ送信のモック処理
export async function sendTipMock(data: TipFormData): Promise<TipTransaction> {
  // API呼び出しをシミュレート（1秒の遅延）
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: `tx_${Date.now()}`,
    staffId: data.staffId,
    amount: data.amount || 0,
    message: data.message,
    timestamp: new Date().toISOString(),
    status: 'completed'
  };
}

// QRコードからスタッフIDを抽出する関数
export function extractStaffIdFromQR(qrData: string): string | null {
  try {
    // QRコード形式: https://tip.app/staff/[staffId]
    const url = new URL(qrData);
    const pathParts = url.pathname.split('/');
    const staffIndex = pathParts.indexOf('staff');

    if (staffIndex !== -1 && pathParts[staffIndex + 1]) {
      return pathParts[staffIndex + 1];
    }

    // パターン2: 直接staffIdが含まれている場合
    if (qrData.startsWith('staff_')) {
      return qrData;
    }

    return null;
  } catch {
    // URLとしてパースできない場合、直接staffIdとして扱う
    if (qrData.startsWith('staff_')) {
      return qrData;
    }
    return null;
  }
}
