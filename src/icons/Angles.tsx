import { IconProps } from "@/Interfaces/icon.interface";

const Angles = ({ width, height, styles }: IconProps) => {
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
        strokeWidth="2"
        d="m11 18l-6-6l6-6m8 12l-6-6l6-6"
      />
    </svg>
  );
};

export default Angles;
