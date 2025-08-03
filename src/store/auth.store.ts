import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipado general del store
export type User = {
  name: string;
  lastName: string;
  email: string;
  rol: string;
  createdAt: string;
};

interface AuthState {
  token: string | null;
  logged: boolean;
  userLogged: User | null;

  // Métodos
  setToken: (data: string | null) => void;
  setLogged: (bool: boolean) => void;
  setUserLogged: (user: User) => void;
  resetAuth: () => void;
}

const initialState = {
  token: null,
  logged: false,
  userLogged: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      setToken: (data) => set({ token: data }),
      setLogged: (bool) => set({ logged: bool }),
      setUserLogged: (user) => set({ userLogged: user }),

      resetAuth: () => set(initialState),
    }),
    {
      name: "auth",
      // partialize: (state) => ({
      //   logged: state.logged,
      //   userLogged: state.userLogged,
      // }),
      // onRehydrateStorage: () => (state) => {
      //   // console.log("Rehydrating auth state...", state);
      // },
    }
  )
);
