import { create } from 'zustand';
import { Staff } from './types';

interface TipStore {
  // 状態
  currentStaff: Staff | null;
  selectedAmount: number | null;
  message: string;

  // アクション
  setStaff: (staff: Staff | null) => void;
  setAmount: (amount: number | null) => void;
  setMessage: (message: string) => void;
  reset: () => void;
}

export const useTipStore = create<TipStore>((set) => ({
  // 初期状態
  currentStaff: null,
  selectedAmount: null,
  message: '',

  // アクション
  setStaff: (staff) => set({ currentStaff: staff }),
  setAmount: (amount) => set({ selectedAmount: amount }),
  setMessage: (message) => set({ message }),
  reset: () => set({
    currentStaff: null,
    selectedAmount: null,
    message: ''
  }),
}));
