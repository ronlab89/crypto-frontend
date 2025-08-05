import type { ReactNode } from "react";

export interface ButtonProps {
  type?: "submit" | "reset" | "button";
  id?: string;
  extraStyles?: string;
  disabled?: boolean;
  variant?: boolean;
  children: ReactNode;
  action?: () => void;
}
