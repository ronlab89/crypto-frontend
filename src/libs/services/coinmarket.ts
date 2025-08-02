import axios from "axios";
import { notify } from "../utils/alertNotify";
import type { getAllCryptosProps } from "@/types/coinmarket";

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
      console.log({ cryptos: res.data });
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

export { getAllCryptos };
