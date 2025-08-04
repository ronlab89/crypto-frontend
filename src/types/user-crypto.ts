import type { Crypto } from "./crypto";

export interface AddCryptoUserProps {
  setLoading: (key: string, value: boolean) => void;
  token: string | null;
  userId: number;
  selectedIds: number[];
  setCryptosSelected: (data: Crypto[]) => void;
}

export interface getCryptoUserProps {
  setLoading: (key: string, value: boolean) => void;
  token: string | null;
  userId: number;
  setCryptosSelected: (data: Crypto[]) => void;
}
