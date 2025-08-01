import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store
interface ToggleState {
  toggleDropdownUser: boolean;

  // Métodos
  setToggleDropdownUser: (bool: boolean) => void;
  resetToggles: () => void;
}

const initialState = {
  toggleDropdownUser: false,
};

export const useToggleStore = create<ToggleState>()(
  persist(
    (set) => ({
      ...initialState,

      setToggleDropdownUser: (bool) => set({ toggleDropdownUser: bool }),
      resetToggles: () => set(initialState),
    }),
    {
      name: "toggle",
      // onRehydrateStorage: () => (state) => {
      //   // console.log("Rehydrating toggle state...", state);
      // },
    }
  )
);
