import type { ButtonProps } from "@/types/button";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, id, extraStyles, disabled, variant, children, action }, ref) => {
    return (
      <button
        onClick={action}
        type={type}
        id={id}
        className={`${
          disabled
            ? "disabled:bg-crypto-dark/10 dark:disabled:bg-crypto-light/10 disabled:text-crypto-dark/30 dark:disabled:text-crypto-light/30 disabled:cursor-none border border-crypto-dark/20 dark:border-crypto-light/20"
            : variant
            ? "text-crypto-dark dark:text-crypto-light bg-crypto-light dark:bg-crypto-dark hover:bg-crypto-dark dark:hover:bg-crypto-light hover:text-crypto-light dark:hover:text-crypto-dark cursor-pointer border-2 border-crypto-dark dark:border-crypto-light hover:border-crypto-dark dark:hover:border-crypto-light"
            : "text-crypto-dark dark:text-crypto-light bg-crypto-light dark:bg-crypto-dark hover:bg-crypto-yellow hover:text-crypto-dark cursor-pointer border-2 border-crypto-yellow hover:border-crypto-yellow"
        } focus:ring-0 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-[8px] text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 transition-colors ${extraStyles}`}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
