import InputText from "@/components/forms/InputText";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Arrow from "@/icons/Arrow";
import Envelope from "@/icons/Envelope";
import Padlock from "@/icons/Padlock";
import User from "@/icons/User";
import { signup } from "@/libs/services/auth";
import { formValidate } from "@/libs/utils/formValidate";
import { useLoadingStore } from "@/store/loading.store";
import { useToggleStore } from "@/store/toggle.store";
import type { UserType } from "@/types/User";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const toggleShow = useToggleStore((state) => state.toggleShow);
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  const watchPassword = watch("password");

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onRegister = (data: UserType): void => {
    signup({
      data,
      setLoading,
      navigate,
    });
  };

  useEffect(() => {
    if (loading.register) {
      reset({
        name: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
      });
    }
  }, [loading.register]);

  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-zinc-100/30 dark:bg-crypto-light/10 rounded-lg shadow border border-crypto-dark/30 dark:border-crypto-light/30 md:mt-0 sm:max-w-sm xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea una cuenta
            </h2>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onRegister)}
            >
              <InputText
                divStyles="mb-4"
                icon={
                  <User
                    width={16}
                    height={16}
                    styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
                  />
                }
                type={"name"}
                text={"Nombre"}
                placeholder={"Primer nombre"}
                id={"name"}
                error={errors.name && "error-input"}
                {...register("name", {
                  required,
                  validate: validateTrim,
                })}
                errorId={
                  errors.name
                    ? { message: errors.name.message || "" }
                    : undefined
                }
              />
              <InputText
                divStyles="mb-4"
                icon={
                  <User
                    width={16}
                    height={16}
                    styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
                  />
                }
                type={"lastName"}
                text={"Apellido"}
                placeholder={"Primer apellido"}
                id={"lastName"}
                error={errors.lastName && "error-input"}
                {...register("lastName", {
                  required,
                  validate: validateTrim,
                })}
                errorId={
                  errors.lastName
                    ? { message: errors.lastName.message || "" }
                    : undefined
                }
              />
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
              <InputText
                divStyles="mb-4"
                icon={
                  <Padlock
                    width={16}
                    height={16}
                    styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
                  />
                }
                type={
                  toggleShow.status && toggleShow.id === "repassword"
                    ? "text"
                    : "password"
                }
                text={"Repite contraseña"}
                placeholder={"•••••••••"}
                id={"repassword"}
                error={errors.repassword && "error-input"}
                {...register("repassword", {
                  required,
                  // validate: validateEquals("password"),
                  minLength: minLength,
                  validate: (value) =>
                    value === watchPassword || "Las contraseñas no coinciden",
                })}
                errorId={
                  errors.repassword
                    ? { message: errors.repassword.message || "" }
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
                  <span>Crear</span>
                  <Arrow width={20} height={20} styles="ml-2" />
                </>
              </Button>
            </form>
          </div>
        </div>
      </div>
      {loading?.register ? <Loader text="" /> : null}
    </section>
  );
};

export default Register;
