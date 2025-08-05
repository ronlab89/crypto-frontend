import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store
interface ToggleWithId {
  status: boolean;
  id: string | number | null;
}

interface ToggleState {
  toggleDropdownUser: boolean;
  toggleModal: boolean;
  toggleCryptoSelected: string;
  toggleShow: ToggleWithId;
  toggleSearchDropdown: boolean;

  // Métodos
  setToggleDropdownUser: (bool: boolean) => void;
  setToggleModal: (bool: boolean) => void;
  setToggleCryptoSelected: (crypto: string) => void;
  setToggleShow: (status: boolean, id: string) => void;
  setToggleSearchDropdown: (bool: boolean) => void;
  resetToggles: () => void;
}

const initialState = {
  toggleDropdownUser: false,
  toggleModal: false,
  toggleCryptoSelected: "",
  toggleShow: { status: false, id: null } as ToggleWithId,
  toggleSearchDropdown: false,
};

export const useToggleStore = create<ToggleState>()(
  persist(
    (set) => ({
      ...initialState,

      setToggleDropdownUser: (bool) => set({ toggleDropdownUser: bool }),
      setToggleModal: (bool) => set({ toggleModal: bool }),
      setToggleCryptoSelected: (crypto) =>
        set({ toggleCryptoSelected: crypto }),
      setToggleShow: (bool, id) =>
        set((state) => ({
          toggleShow: {
            status:
              id === state.toggleShow.id ? !state.toggleShow.status : bool,
            id: id === state.toggleShow.id ? null : id,
          },
        })),
      setToggleSearchDropdown: (bool) => set({ toggleSearchDropdown: bool }),

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
