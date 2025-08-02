import type { LoadingState } from "@/types/loader";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store
interface loaderState {
  loading: LoadingState;
  // Métodos
  setLoading: (key: string, value: boolean) => void;
  resetLoading: () => void;
}

const initialState = {
  loading: {},
};

export const useLoadingStore = create<loaderState>()(
  persist(
    (set) => ({
      ...initialState,

      setLoading: (key, value) =>
        set((state) => ({
          loading: {
            ...state.loading,
            [key]: value,
          },
        })),

      resetLoading: () => set(initialState),
    }),
    {
      name: "loading",
      // onRehydrateStorage: () => (state) => {
      //   // console.log("Rehydrating loading state...", state);
      // },
    }
  )
);
