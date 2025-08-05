import type { Crypto, CryptoDropdown } from "./crypto";
import type { SaveHistoryItem } from "./user-crypto";

export interface getAllCryptosProps {
  setLoading: (key: string, value: boolean) => void;
  setCryptos: (data: Crypto[]) => void;
}

export interface getCryptosToDropdownProps {
  setLoading: (key: string, value: boolean) => void;
  setCryptosToDropdown: (data: CryptoDropdown[]) => void;
  token: string | null;
}

export interface getCryptosQuoteProps {
  setLoading: (key: string, value: boolean) => void;
  setCryptosQuote: (data: Crypto[]) => void;
  token: string | null;
  cmcIds: string;
  userId: number;
  setCryptosHistory: (data: SaveHistoryItem[]) => void;
}
