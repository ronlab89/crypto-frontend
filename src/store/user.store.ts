import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Crypto } from "@/types/crypto";
import type { SaveHistoryItem } from "@/types/user-crypto";

// Tipado general del store

interface UserState {
  cryptosSelected: Crypto[];
  cryptosQuote: Crypto[];
  cryptosHistory: SaveHistoryItem[];

  // Métodos
  setCryptosSelected: (data: Crypto[]) => void;
  setCryptosQuote: (data: Crypto[]) => void;
  setCryptosHistory: (data: SaveHistoryItem[]) => void;
  resetUser: () => void;
}

const initialState = {
  cryptosSelected: [],
  cryptosQuote: [],
  cryptosHistory: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setCryptosSelected: (data) => set({ cryptosSelected: data }),
      setCryptosQuote: (data) => set({ cryptosQuote: data }),
      setCryptosHistory: (data) => set({ cryptosHistory: data }),

      resetUser: () => set(initialState),
    }),
    {
      name: "user",
      // onRehydrateStorage: () => (state) => {
      //   // console.log("Rehydrating user state...", state);
      // },
    }
  )
);
