import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store

interface CryptoTimerState {
  lastFetched: number | null;
  remainingTime: number;
  setLastFetched: (timestamp: number) => void;
  setRemainingTime: (seconds: number) => void;
  // Quote Data
  lastFetchedQuote: number | null;
  remainingTimeQuote: number;
  setLastFetchedQuote: (timestamp: number) => void;
  setRemainingTimeQuote: (seconds: number) => void;
  resetTimer: () => void;
}

export const REFRESH_INTERVAL = 1800;
export const REFRESH_INTERVAL_QUOTE = 600;

const initialState: Omit<
  CryptoTimerState,
  | "setLastFetched"
  | "setRemainingTime"
  | "setLastFetchedQuote"
  | "setRemainingTimeQuote"
  | "resetTimer"
> = {
  lastFetched: null,
  remainingTime: REFRESH_INTERVAL,
  lastFetchedQuote: null,
  remainingTimeQuote: REFRESH_INTERVAL_QUOTE,
};

export const useTimerStore = create<CryptoTimerState>()(
  persist(
    (set) => ({
      ...initialState,

      setLastFetched: (timestamp) => set({ lastFetched: timestamp }),
      setRemainingTime: (seconds) => set({ remainingTime: seconds }),
      setLastFetchedQuote: (timestamp) => set({ lastFetchedQuote: timestamp }),
      setRemainingTimeQuote: (seconds) => set({ remainingTimeQuote: seconds }),
      resetTimer: () =>
        set({
          lastFetched: Date.now(),
          remainingTime: REFRESH_INTERVAL,
          lastFetchedQuote: Date.now(),
          remainingTimeQuote: REFRESH_INTERVAL_QUOTE,
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
