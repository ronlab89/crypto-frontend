import { forwardRef, lazy, Suspense } from "react";

import { useToggleStore } from "@/store/toggle.store";

const FormErrors = lazy(() => import("@/components/forms/FormErrors"));
import Eye from "@/icons/Eye";
import EyeClosed from "@/icons/EyeClosed";
import type { InputProps } from "@/types/input";

const InputText = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      text,
      type,
      id,
      min,
      max,
      placeholder,
      value,
      readOnly,
      disabled,
      // error,
      errorId,
      name,
      checked,
      divStyles,
      styles,
      onChange,
      onBlur,
    }: InputProps,
    ref
  ) => {
    const toggleShow = useToggleStore((state) => state.toggleShow);
    const setToggleShow = useToggleStore((state) => state.setToggleShow);

    return (
      <div
        className={`pb-0 ${
          type === "checkbox"
            ? "w-fit pt-0 flex justify-start items-center flex-row-reverse gap-x-2"
            : `${divStyles}`
        }`}
      >
        <label
          htmlFor={id}
          className="w-full flex justify-between items-center mb-1 text-xs text-crypto-dark/80 dark:text-crypto-light/80"
        >
          <span className="text-sm font-medium">{text}</span>
          <Suspense fallback={""}>
            <FormErrors error={errorId} />
          </Suspense>
        </label>
        <div className="relative text-slate-600">
          <span
            className={`${
              type === "checkbox" ? "hidden" : ""
            } absolute inset-y-0 left-0 flex items-center p-1 pl-3`}
          >
            {icon}
          </span>
          <input
            type={type}
            // error={error}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            max={max}
            ref={ref}
            readOnly={readOnly}
            disabled={disabled}
            value={value}
            name={name}
            id={id}
            checked={checked}
            placeholder={placeholder}
            autoComplete="off"
            className={`${
              type === "checkbox"
                ? "w-4 h-4 text-slate-700 bg-slate-100 border-slate-300 rounded-[.5rem] focus:ring-dizlogik-800 focus:ring-0"
                : `${styles} flex pl-12 h-9 w-full rounded-[.5rem] border border-crypto-dark/50 dark:border-crypto-light/50 border-input bg-crypto-light dark:bg-crypto-dark text-crypto-dark/80 dark:text-crypto-light/80 px-3 py-1 text-xs shadow-sm font-medium placeholder:text-crypto-dark/50 dark:placeholder:text-crypto-light/50 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-800 dark:focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50`
            }`}
          />
          <span
            onClick={() => setToggleShow(!toggleShow.status, id)}
            className={`${
              id === "password" || id === "repassword" ? "" : "hidden"
            } absolute inset-y-0 right-0 flex items-center p-1 pr-3 cursor-pointer`}
          >
            {toggleShow.status && toggleShow.id === id ? (
              <EyeClosed
                width={16}
                height={16}
                styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
              />
            ) : (
              <Eye
                width={16}
                height={16}
                styles={"text-crypto-dark/80 dark:text-crypto-light/80"}
              />
            )}
          </span>
        </div>
      </div>
    );
  }
);

export default InputText;
