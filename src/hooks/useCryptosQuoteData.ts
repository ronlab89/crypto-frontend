import { useEffect, useRef } from "react";
import { getCryptosQuote } from "@/libs/services/coinmarket";
import { REFRESH_INTERVAL_QUOTE, useTimerStore } from "@/store/timer.store";
import type { Crypto } from "@/types/crypto";
import { useUserStore } from "@/store/user.store";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import { useAuthStore } from "@/store/auth.store";

type UseCryptosQuoteDataOptions = {
  setLoading: (key: string, value: boolean) => void;
  cryptosQuote?: Crypto[];
  setCryptosQuote: (data: Crypto[]) => void;
  token: string | null;
};

export default function useCryptosQuoteData({
  token,
  setCryptosQuote,
  setLoading,
}: UseCryptosQuoteDataOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeQuote = useTimerStore((state) => state.remainingTimeQuote);
  const setRemainingTimeQuote = useTimerStore(
    (state) => state.setRemainingTimeQuote
  );
  const cryptosSelected = useUserStore((state) => state.cryptosSelected);
  const cryptosToDropdown = useCoinmarketStore(
    (state) => state.cryptosToDropdown
  );
  const userLogged = useAuthStore((state) => state.userLogged);
  const setCryptosHistory = useUserStore((state) => state.setCryptosHistory);

  const userIdsSelected = cryptosSelected.map((crypto) => Number(crypto.id));

  const cmcIds = cryptosToDropdown
    .filter((crypto) => userIdsSelected.includes(crypto.id))
    .map((crypto) => crypto.cmcId)
    .join(",");

  const fetchQuotes = async () => {
    if (typeof userLogged?.id !== "number") return;
    await getCryptosQuote({
      setLoading,
      setCryptosQuote,
      token,
      cmcIds,
      userId: userLogged.id,
      setCryptosHistory,
    });
  };

  useEffect(() => {
    if (cmcIds.length > 0) {
      fetchQuotes();
    }

    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        const currentTime = useTimerStore.getState().remainingTimeQuote;

        if (currentTime <= 1) {
          fetchQuotes();
          setRemainingTimeQuote(REFRESH_INTERVAL_QUOTE);
        } else {
          setRemainingTimeQuote(currentTime - 1);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [token, cmcIds]);

  return { remainingTimeQuote };
}
