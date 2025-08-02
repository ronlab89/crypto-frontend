import type { Crypto } from "./crypto";

export interface getAllCryptosProps {
  setLoading: (key: string, value: boolean) => void;
  setCryptos: (data: Crypto[]) => void;
}
