import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Crypto } from "@/types/crypto";

// Tipado general del store

interface UserState {
  cryptosSelected: Crypto[];

  // Métodos
  setCryptosSelected: (data: Crypto[]) => void;
  resetUser: () => void;
}

const initialState = {
  cryptosSelected: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setCryptosSelected: (data) => set({ cryptosSelected: data }),

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
