import type { RegisterOptions } from "react-hook-form";

type FormValidate = {
  required: RegisterOptions["required"];
  patternEmail: RegisterOptions["pattern"];
  patternUrl: RegisterOptions["pattern"];
  patternPhone: RegisterOptions["pattern"];
  patternNit: RegisterOptions["pattern"];
  minLength: RegisterOptions["minLength"];
  maxLength: RegisterOptions["maxLength"];
  validateTrim: RegisterOptions["validate"];
  validateEquals: (value: string) => RegisterOptions["validate"];
};

export const formValidate = (): FormValidate => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },

    patternEmail: {
      value:
        /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
      message: "Formato de email no válido",
    },

    patternUrl: {
      value:
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?\/?$/,
      message: "Formato de URL no válido",
    },

    patternPhone: {
      value: /^\d{10}$/,
      message: "10 números",
    },

    patternNit: {
      value: /^\d+$/,
      message: "Solo números",
    },

    minLength: {
      value: 8,
      message: "Mínimo 8 caracteres",
    },

    maxLength: {
      value: 30,
      message: "Máximo 30 caracteres",
    },

    validateTrim: (v: string) => {
      if (!v.trim()) {
        return "No se admiten espacios en blanco";
      }
      return true;
    },

    validateEquals: (value: string) => ({
      equals: (v: string) => v === value || "Las contraseñas no coinciden",
    }),
  };
};
