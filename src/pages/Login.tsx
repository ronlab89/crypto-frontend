import InputText from "@/components/forms/InputText";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Arrow from "@/icons/Arrow";
import Envelope from "@/icons/Envelope";
import Padlock from "@/icons/Padlock";
import { login } from "@/libs/services/auth";
import { formValidate } from "@/libs/utils/formValidate";
import { useAuthStore } from "@/store/auth.store";
import { useLoadingStore } from "@/store/loading.store";
import { useToggleStore } from "@/store/toggle.store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toggleShow = useToggleStore((state) => state.toggleShow);
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setToken = useAuthStore((state) => state.setToken);
  const setLogged = useAuthStore((state) => state.setLogged);
  const setUserLogged = useAuthStore((state) => state.setUserLogged);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onLogin = (data: { email: string; password: string }): void => {
    login({
      data,
      setLoading,
      navigate,
      setToken,
      setLogged,
      setUserLogged,
    });
  };

  useEffect(() => {
    if (loading.login) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [loading.login]);

  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-zinc-100/30 dark:bg-crypto-light/10 rounded-lg shadow border border-crypto-dark/30 dark:border-crypto-light/30 md:mt-0 sm:max-w-sm xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingresa a tu cuenta
            </h2>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onLogin)}
            >
              <InputText
                divStyles="mb-4"
                icon={
                  <Envelope
                    width={20}
                    height={20}
                    styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
                  />
                }
                type={"email"}
                text={"Correo electrónico"}
                placeholder={"user@gmail.com"}
                id={"email"}
                mode={"login"}
                error={errors.email && "error-input"}
                {...register("email", {
                  required,
                  validate: validateTrim,
                  pattern: patternEmail,
                })}
                errorId={
                  errors.email
                    ? { message: errors.email.message || "" }
                    : undefined
                }
              />
              <InputText
                divStyles="mb-5"
                icon={
                  <Padlock
                    width={16}
                    height={16}
                    styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
                  />
                }
                type={
                  toggleShow.status && toggleShow.id === "password"
                    ? "text"
                    : "password"
                }
                text={"Contraseña"}
                placeholder={"•••••••••"}
                id={"password"}
                mode={"login"}
                error={errors.password && "error-input"}
                {...register("password", {
                  required,
                  validate: validateTrim,
                  minLength: minLength,
                })}
                errorId={
                  errors.password
                    ? { message: errors.password.message || "" }
                    : undefined
                }
              />

              <Button
                type="submit"
                id="register-button"
                extraStyles="flex justify-center items-center mt-5"
                disabled={false}
                variant={false}
              >
                <>
                  <span>Ingresar</span>
                  <Arrow width={20} height={20} styles="ml-2" />
                </>
              </Button>
            </form>
          </div>
        </div>
      </div>
      {loading?.login ? <Loader text="" /> : null}
    </section>
  );
};

export default Login;
