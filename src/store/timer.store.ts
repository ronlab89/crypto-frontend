import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store

interface CryptoTimerState {
  lastFetched: number | null;
  remainingTime: number;
  setLastFetched: (timestamp: number) => void;
  setRemainingTime: (seconds: number) => void;
  resetTimer: () => void;
}

export const REFRESH_INTERVAL = 60000;

const initialState: Pick<CryptoTimerState, "lastFetched" | "remainingTime"> = {
  lastFetched: null,
  remainingTime: REFRESH_INTERVAL,
};

export const useTimerStore = create<CryptoTimerState>()(
  persist(
    (set) => ({
      ...initialState,

      setLastFetched: (timestamp) => set({ lastFetched: timestamp }),
      setRemainingTime: (seconds) => set({ remainingTime: seconds }),
      resetTimer: () =>
        set({
          lastFetched: Date.now(),
          remainingTime: REFRESH_INTERVAL,
        }),
    }),
    {
      name: "timer",
      // onRehydrateStorage: () => (state) => {
      //   // console.log("Rehydrating timer state...", state);
      // },
    }
  )
);
