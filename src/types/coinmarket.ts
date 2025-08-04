import type { Crypto, CryptoDropdown } from "./crypto";

export interface getAllCryptosProps {
  setLoading: (key: string, value: boolean) => void;
  setCryptos: (data: Crypto[]) => void;
}

export interface getCryptosToDropdownProps {
  setLoading: (key: string, value: boolean) => void;
  setCryptosToDropdown: (data: CryptoDropdown[]) => void;
  token: string | null;
}
