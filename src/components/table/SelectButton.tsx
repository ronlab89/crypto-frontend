import CheckCircle from "@/icons/CheckCircle";
import CircleDashed from "@/icons/CircleDashed";
import { useToggleStore } from "@/store/toggle.store";

const SelectButton = ({ crypto }: { crypto: string }) => {
  const toggleCryptoSelected = useToggleStore(
    (state) => state.toggleCryptoSelected
  );
  const setToggleCryptoSelected = useToggleStore(
    (state) => state.setToggleCryptoSelected
  );

  const handleSelectCrypto = (crypto: string) => {
    setToggleCryptoSelected(crypto);
  };
  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => {
        if (toggleCryptoSelected === crypto) return;
        handleSelectCrypto(crypto);
      }}
    >
      <span
        className={`${
          toggleCryptoSelected === crypto ? "text-crypto-yellow" : ""
        }`}
      >
        {toggleCryptoSelected === crypto ? "Seleccionado" : "Seleccionar"}
      </span>
      <span>
        {toggleCryptoSelected === crypto ? (
          <CheckCircle width={12} height={12} styles={"text-crypto-yellow"} />
        ) : (
          <CircleDashed
            width={12}
            height={12}
            styles={"text-crypto-dark/50 dark:text-crypto-light/50"}
          />
        )}
      </span>
    </button>
  );
};

export default SelectButton;
