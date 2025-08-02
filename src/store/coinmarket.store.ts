import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Crypto } from "@/types/crypto";

// Tipado general del store

interface CoinmarketState {
  cryptos: Crypto[];

  // Métodos
  setCryptos: (data: Crypto[]) => void;
  resetCoinmarket: () => void;
}

const initialState = {
  cryptos: [],
};

export const useCoinmarketStore = create<CoinmarketState>()(
  persist(
    (set) => ({
      ...initialState,

      setCryptos: (data) => set({ cryptos: data }),

      resetCoinmarket: () => set(initialState),
    }),
    {
      name: "coinmarket",
      // onRehydrateStorage: () => (state) => {
      //   // console.log("Rehydrating coinmarket state...", state);
      // },
    }
  )
);
