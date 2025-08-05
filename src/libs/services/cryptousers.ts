import axios from "axios";
import { notify } from "../utils/alertNotify";
import type {
  AddCryptosToHistoryProps,
  AddCryptoUserProps,
  getCryptosHistoryProps,
  getCryptoUserProps,
} from "@/types/user-crypto";
import { getCryptosQuote } from "./coinmarket";

const addCryptoUser = async ({
  setLoading,
  token,
  userId,
  selectedIds,
  setCryptosSelected,
  selectedCmcIds,
  setCryptosQuote,
  setCryptosHistory,
}: AddCryptoUserProps): Promise<void> => {
  try {
    setLoading("addUserCryptos", true);
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL_BASE}/user-cryptos`,
      data: {
        userId,
        cryptoIds: selectedIds,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 201) {
      getCryptosUser({
        setLoading,
        token,
        userId,
        setCryptosSelected,
        selectedCmcIds,
        setCryptosQuote,
        setCryptosHistory,
      });
      notify("success", "Se agregaron los cryptos a tu lista personal");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("addUserCryptos", false);
  }
};

const getCryptosUser = async ({
  setLoading,
  token,
  userId,
  setCryptosSelected,
  selectedCmcIds,
  setCryptosQuote,
  setCryptosHistory,
}: getCryptoUserProps): Promise<void> => {
  try {
    setLoading("getUserCryptos", true);
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL_BASE}/user-cryptos/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setCryptosSelected(res.data);
      getCryptosQuote({
        setLoading,
        setCryptosQuote,
        token,
        cmcIds: selectedCmcIds,
        userId,
        setCryptosHistory,
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("getUserCryptos", false);
  }
};

const addCryptosToHistory = async ({
  setLoading,
  token,
  cryptosData,
  setCryptosHistory,
}: AddCryptosToHistoryProps): Promise<void> => {
  try {
    setLoading("addCryptosHistory", true);
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL_BASE}/price-history`,
      data: cryptosData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 201) {
      getCryptosHistory({
        setLoading,
        token,
        setCryptosHistory,
      });
      notify("success", "Se actualizo el historial de los cryptos");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("addCryptosHistory", false);
  }
};

const getCryptosHistory = async ({
  setLoading,
  token,
  setCryptosHistory,
}: getCryptosHistoryProps): Promise<void> => {
  try {
    setLoading("getCryptosHistory", true);
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL_BASE}/price-history`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setCryptosHistory(res.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("getCryptosHistory", false);
  }
};

export {
  addCryptoUser,
  getCryptosUser,
  addCryptosToHistory,
  getCryptosHistory,
};
