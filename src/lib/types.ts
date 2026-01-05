export interface Staff {
  id: string;
  name: string;
  nameKana: string;
  photoUrl: string;
  position: string;
  department: string;
  bio: string;
  joinedDate: string;
  specialties: string[];
}

export interface TipTransaction {
  id: string;
  staffId: string;
  amount: number;
  message: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TipFormData {
  staffId: string;
  amount: number | null;
  message: string;
  customAmount?: number;
}

export const TIP_PRESETS = [100, 500, 1000, 2000, 5000] as const;
export type TipPreset = typeof TIP_PRESETS[number];
