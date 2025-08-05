import type { Crypto } from "./crypto";

export interface AddCryptoUserProps {
  setLoading: (key: string, value: boolean) => void;
  token: string | null;
  userId: number;
  selectedIds: number[];
  setCryptosSelected: (data: Crypto[]) => void;
  selectedCmcIds: string;
  setCryptosQuote: (data: Crypto[]) => void;
  setCryptosHistory: (data: SaveHistoryItem[]) => void;
}

export interface getCryptoUserProps {
  setLoading: (key: string, value: boolean) => void;
  token: string | null;
  userId: number;
  setCryptosSelected: (data: Crypto[]) => void;
  selectedCmcIds: string;
  setCryptosQuote: (data: Crypto[]) => void;
  setCryptosHistory: (data: SaveHistoryItem[]) => void;
}

export type SaveHistoryItem = {
  userId: number;
  cryptoId: number;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  volume24h: number;
  percent_change_24h: number;
};

export interface AddCryptosToHistoryProps {
  setLoading: (key: string, value: boolean) => void;
  token: string | null;
  cryptosData: SaveHistoryItem[];
  setCryptosHistory: (data: SaveHistoryItem[]) => void;
}

export interface getCryptosHistoryProps {
  setLoading: (key: string, value: boolean) => void;
  token: string | null;
  setCryptosHistory: (data: SaveHistoryItem[]) => void;
}
