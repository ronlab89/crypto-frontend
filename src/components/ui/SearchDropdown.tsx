import { useToggleStore } from "@/store/toggle.store";
import InputSearch from "../forms/InputSearch";
import { useState } from "react";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import Button from "./Button";
import { useAuthStore } from "@/store/auth.store";
import { addCryptoUser } from "@/libs/services/cryptousers";
import { useLoadingStore } from "@/store/loading.store";
import { useUserStore } from "@/store/user.store";

const SearchDropdown = () => {
  const toggleSearchDropdown = useToggleStore(
    (state) => state.toggleSearchDropdown
  );
  const cryptosToDropdown = useCoinmarketStore(
    (state) => state.cryptosToDropdown
  );
  const token = useAuthStore((state) => state.token);
  const userLogged = useAuthStore((state) => state.userLogged);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const cryptosSelected = useUserStore((state) => state.cryptosSelected);
  const setCryptosSelected = useUserStore((state) => state.setCryptosSelected);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredCryptos = cryptosToDropdown.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCryptos = async () => {
    const userId = userLogged?.id;
    if (typeof userId !== "number") {
      console.error("User ID is not defined.");
      return;
    }
    console.log({ selectedIds, userId });
    await addCryptoUser({
      setLoading,
      token,
      userId,
      selectedIds,
      setCryptosSelected,
    });
    setSelectedIds([]);
    setSearchTerm("");
  };

  return (
    <div
      id="dropdownSearch"
      className={`z-10 ${
        toggleSearchDropdown ? "absolute right-[15px]" : "hidden"
      } bg-crypto-light dark:bg-crypto-dark rounded-lg shadow-sm w-60 flex flex-col items-start`}
    >
      <InputSearch
        id="input-group-search"
        filtering={searchTerm}
        setFiltering={setSearchTerm}
        width="w-full"
        placeholder="Buscar crypto"
        required={false}
      />
      <ul
        className="w-full h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        {filteredCryptos?.map((crypto) => {
          const isSelected = cryptosSelected.some(
            (c) => Number(c.id) === Number(crypto.id)
          );
          return (
            <li key={crypto.cmcId}>
              <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`checkbox-item-${crypto.id}`}
                  type="checkbox"
                  checked={selectedIds.includes(crypto.id)}
                  onChange={(e) => {
                    if (isSelected) return;
                    const isChecked = e.target.checked;
                    setSelectedIds((prev) =>
                      isChecked
                        ? [...prev, crypto.id]
                        : prev.filter((id) => id !== crypto.id)
                    );
                  }}
                  disabled={isSelected}
                  className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500`}
                />
                <label
                  htmlFor="checkbox-item-11"
                  className={`w-full py-2 ms-2 text-sm font-medium rounded-sm ${
                    isSelected
                      ? "text-crypto-dark/40 dark:text-crypto-light/40"
                      : "text-crypto-dark/80 dark:text-crypto-light/80"
                  }`}
                >
                  {crypto?.name}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        type="button"
        id="add-crypto-button"
        extraStyles="flex justify-center items-center mt-5 self-center"
        disabled={false}
        variant={false}
        action={handleAddCryptos}
      >
        <span>Agregar a tabla</span>
      </Button>
    </div>
  );
};

export default SearchDropdown;
