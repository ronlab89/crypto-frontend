import axios from "axios";
import { notify } from "../utils/alertNotify";
import type {
  AddCryptoUserProps,
  getCryptoUserProps,
} from "@/types/user-crypto";

const addCryptoUser = async ({
  setLoading,
  token,
  userId,
  selectedIds,
  setCryptosSelected,
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
      getCryptosUser({ setLoading, token, userId, setCryptosSelected });
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
    console.log("getCryptosUser", res);
    if (res.status === 200) {
      setCryptosSelected(res.data);
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

export { addCryptoUser, getCryptosUser };
