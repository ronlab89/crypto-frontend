import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "onBlur"
  > {
  icon?: ReactNode;
  text: string;
  type: string;
  id: string;
  min?: number | string;
  max?: number | string;
  placeholder?: string;
  value?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string | false;
  errorId?: { message: string } | undefined;
  name?: string;
  checked?: boolean;
  divStyles?: string;
  styles?: string;
  mode?: "login" | "register" | "other";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface SelectProps
  extends Omit<
    InputHTMLAttributes<HTMLSelectElement>,
    "type" | "onChange" | "onBlur"
  > {
  label: string;
  id: string;
  icon?: ReactNode;
  defaultOption: string;
  options: { name: string; value: string }[];
  error?: string | false;
  name?: string;
  errorId?: { message: string } | undefined;
  divStyles?: string;
  styles?: string;
  mode?: "login" | "register" | "other";
  onChange?: (
    e: ChangeEvent<HTMLSelectElement>
  ) => void | Promise<void | boolean>;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void | Promise<void | boolean>;
}
