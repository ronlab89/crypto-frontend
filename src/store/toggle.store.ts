import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store
interface ToggleState {
  toggleDropdownUser: boolean;
  toggleModal: boolean;
  toggleCryptoSelected: string;

  // Métodos
  setToggleDropdownUser: (bool: boolean) => void;
  setToggleModal: (bool: boolean) => void;
  setToggleCryptoSelected: (crypto: string) => void;
  resetToggles: () => void;
}

const initialState = {
  toggleDropdownUser: false,
  toggleModal: false,
  toggleCryptoSelected: "BTC",
};

export const useToggleStore = create<ToggleState>()(
  persist(
    (set) => ({
      ...initialState,

      setToggleDropdownUser: (bool) => set({ toggleDropdownUser: bool }),
      setToggleModal: (bool) => set({ toggleModal: bool }),
      setToggleCryptoSelected: (crypto) =>
        set({ toggleCryptoSelected: crypto }),

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
