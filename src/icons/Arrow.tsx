import type { IconProps } from "@/types/icons";

const Arrow = ({ width, height, styles }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={styles}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 12h16m0 0l-6-6m6 6l-6 6"
      />
    </svg>
  );
};

export default Arrow;
