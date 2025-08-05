import Search from "@/icons/Search";
import type { SearchInputProps } from "@/types/input";

const InputSearch = ({
  filtering,
  setFiltering,
  id,
  width,
  placeholder,
  required,
}: SearchInputProps) => {
  return (
    <div className={`relative ${width}`}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3">
        <Search
          width={15}
          height={15}
          styles={"text-crypto-dark/50 dark:text-crypto-light/50"}
        />
      </div>
      <input
        type="search"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        id={id}
        className="ps-10 text-sm mb-0 flex pl-12 h-9 w-full rounded-[.5rem] border border-crypto-dark dark:border-crypto-light bg-transparent px-3 py-1 shadow-sm transition-colors font-medium text-crypto-dark dark:text-crypto-light placeholder:text-crypto-dark/50 dark:placeholder:text-crypto-light/50 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crypto-yellow disabled:cursor-not-allowed disabled:opacity-50
              "
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputSearch;
