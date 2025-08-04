import axios from "axios";
import { notify } from "../utils/alertNotify";
import type {
  getAllCryptosProps,
  getCryptosToDropdownProps,
} from "@/types/coinmarket";

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
      // notify("success", res.data.message);
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

export { getAllCryptos, syncCryptos, getCryptosToDropdown };
