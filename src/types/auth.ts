import type { Dispatch, SetStateAction } from "react";
import type { UserType } from "./User";

type LoginType = {
  email: string;
  password: string;
};

export interface LoginProps {
  data: LoginType;
  setLoading: (key: string, value: boolean) => void;
  navigate: (to: string) => void;
  setToken: (data: string) => void;
  setLogged: (bool: boolean) => void;
}

export interface RegisterProps {
  data: UserType;
  setLoading: (key: string, value: boolean) => void;
  navigate: (to: string) => void;
}

export interface LogoutProps {
  setLoading: (key: string, value: boolean) => void;
  setError: Dispatch<SetStateAction<string | null>>;
  resetAuth: () => void;
  resetCoinmarket: () => void;
  resetLoading: () => void;
  resetTimer: () => void;
  resetToggles: () => void;
}
