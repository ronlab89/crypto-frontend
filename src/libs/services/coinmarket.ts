import axios from "axios";
import { notify } from "../utils/alertNotify";
import type {
  getAllCryptosProps,
  getCryptosQuoteProps,
  getCryptosToDropdownProps,
} from "@/types/coinmarket";
import { transformToHistories } from "../utils/transformData";
import { addCryptosToHistory } from "./cryptousers";

const getAllCryptos = async ({
  setLoading,
  setCryptos,
}: getAllCryptosProps): Promise<void> => {
  try {
    setLoading("allCryptos", true);
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL_BASE}/coinmarket/public/top`,
      withCredentials: true,
    });
    if (res.status === 200) {
      const cryptos = res.data.data;
      notify("success", "Datos de cryptos cargados");
      setCryptos(cryptos);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("allCryptos", false);
  }
};

const syncCryptos = async ({
  setLoading,
  setCryptosToDropdown,
  token,
}: getCryptosToDropdownProps): Promise<void> => {
  try {
    setLoading("syncCryptos", true);
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL_BASE}/cryptos/sync`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      notify("success", res.data.message);
      getCryptosToDropdown({ setLoading, setCryptosToDropdown, token });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("syncCryptos", false);
  }
};

const getCryptosToDropdown = async ({
  setLoading,
  setCryptosToDropdown,
  token,
}: getCryptosToDropdownProps): Promise<void> => {
  try {
    setLoading("cryptosToDropdown", true);
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL_BASE}/cryptos`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setCryptosToDropdown(res.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("cryptosToDropdown", false);
  }
};

const getCryptosQuote = async ({
  setLoading,
  setCryptosQuote,
  token,
  cmcIds,
  userId,
  setCryptosHistory,
}: getCryptosQuoteProps): Promise<void> => {
  try {
    setLoading("cryptosQuote", true);
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL_BASE}/coinmarket/quote`,
      data: {
        id: cmcIds,
        convert: "USD",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setCryptosQuote(res.data);
      const cryptosData = transformToHistories(userId, res.data);
      await addCryptosToHistory({
        setLoading,
        token,
        cryptosData: cryptosData.histories,
        setCryptosHistory,
      });
      notify("success", "Se han actualizado los datos de las cryptos");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("cryptosQuote", false);
  }
};

export { getAllCryptos, syncCryptos, getCryptosToDropdown, getCryptosQuote };
