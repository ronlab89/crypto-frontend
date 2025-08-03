import type { LoginProps, LogoutProps, RegisterProps } from "@/types/auth.ts";
import axios from "axios";
import { notify } from "../utils/alertNotify";

const login = async ({
  data,
  setLoading,
  navigate,
  setToken,
  setLogged,
  setUserLogged,
}: LoginProps): Promise<void> => {
  try {
    setLoading("login", true);
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL_BASE}/auth/login`,
      data: { email: data.email, password: data.password },
      withCredentials: true,
    });
    if (res.status === 200) {
      setToken(res.data.token);
      setLogged(true);
      setUserLogged(res.data.user);
      notify("success", "¡Bienvenido! ");
      navigate("/dashboard");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("login", false);
  }
};

const signup = async ({
  data,
  setLoading,
  navigate,
}: RegisterProps): Promise<void> => {
  try {
    setLoading("register", true);
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL_BASE}/auth/register`,
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      withCredentials: true,
    });
    if (res.status === 201) {
      notify("success", "Registro exitoso");
      navigate("/login");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("register", false);
  }
};

const logout = async ({
  setLoading,
  resetAuth,
  resetCoinmarket,
  resetLoading,
  resetTimer,
  resetToggles,
}: LogoutProps): Promise<void> => {
  try {
    setLoading("logout", true);
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL_BASE}/auth/logout`,
      withCredentials: true,
    });
    if (res.status === 200) {
      resetAuth();
      resetCoinmarket();
      resetLoading();
      resetTimer();
      resetToggles();
      notify("success", "Sesión cerrada");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorMessage = error.response?.data?.message as string;
      notify("error", errorMessage);
    }
  } finally {
    setLoading("logout", false);
  }
};

export { login, signup, logout };
