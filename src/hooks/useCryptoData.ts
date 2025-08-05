import { getAllCryptos } from "@/libs/services/coinmarket";
import { REFRESH_INTERVAL, useTimerStore } from "@/store/timer.store";
import type { Crypto } from "@/types/crypto";
import { useEffect, useRef } from "react";

type UseCryptoDataOptions = {
  cryptos: Crypto[];
  setCryptos: (data: Crypto[]) => void;
  setLoading: (key: string, value: boolean) => void;
};

export default function useCryptoData({
  cryptos,
  setCryptos,
  setLoading,
}: UseCryptoDataOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTime = useTimerStore((state) => state.remainingTime);
  const setRemainingTime = useTimerStore((state) => state.setRemainingTime);

  const getCryptos = async () => {
    await getAllCryptos({ setLoading, setCryptos });
  };

  useEffect(() => {
    if (cryptos.length === 0) {
      getCryptos();
    }

    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        const currentTime = useTimerStore.getState().remainingTime;

        if (currentTime <= 1) {
          getCryptos();
          setRemainingTime(REFRESH_INTERVAL);
        } else {
          setRemainingTime(currentTime - 1);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return { remainingTime };
}
