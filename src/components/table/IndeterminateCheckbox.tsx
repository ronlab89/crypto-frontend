import React, { useEffect, useRef } from "react";

interface IndeterminateCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  className?: string;
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      if (ref.current) {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }
  }, [ref, indeterminate]);

  return (
    <>
      <label htmlFor="indeterminate-checkbox" className="sr-only"></label>
      <input
        id="indeterminate-checkbox"
        type="checkbox"
        ref={ref}
        className={`${className} cursor-pointer`}
        {...rest}
      />
    </>
  );
}

export default IndeterminateCheckbox;
