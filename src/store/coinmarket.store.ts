import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Crypto, CryptoDropdown } from "@/types/crypto";

// Tipado general del store

interface CoinmarketState {
  cryptos: Crypto[];
  cryptosToDropdown: CryptoDropdown[];

  // Métodos
  setCryptos: (data: Crypto[]) => void;
  setCryptosToDropdown: (data: CryptoDropdown[]) => void;
  resetCoinmarket: () => void;
}

const initialState = {
  cryptos: [],
  cryptosToDropdown: [],
};

export const useCoinmarketStore = create<CoinmarketState>()(
  persist(
    (set) => ({
      ...initialState,

      setCryptos: (data) => set({ cryptos: data }),
      setCryptosToDropdown: (data) => set({ cryptosToDropdown: data }),

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
