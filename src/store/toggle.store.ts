import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store
interface ToggleWithId {
  status: boolean;
  id: string | number | null;
}

export interface itemData {
  id: string | number;
  name: string;
  symbol: string;
  market_cap: number;
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  createdAt: string;
}

interface ToggleState {
  toggleDropdownUser: boolean;
  toggleModal: boolean;
  toggleCryptoSelected: string;
  toggleShow: ToggleWithId;
  toggleSearchDropdown: boolean;
  modalData?: itemData[];

  // Métodos
  setToggleDropdownUser: (bool: boolean) => void;
  setToggleModal: (bool: boolean) => void;
  setToggleCryptoSelected: (crypto: string) => void;
  setToggleShow: (status: boolean, id: string) => void;
  setToggleSearchDropdown: (bool: boolean) => void;
  setModalData: (data: itemData[]) => void;
  resetToggles: () => void;
}

const initialState = {
  toggleDropdownUser: false,
  toggleModal: false,
  toggleCryptoSelected: "",
  toggleShow: { status: false, id: null } as ToggleWithId,
  toggleSearchDropdown: false,
  modalData: [],
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
      setModalData: (data: itemData[]) => set({ modalData: data }),

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
