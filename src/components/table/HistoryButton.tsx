import Details from "@/icons/Details";
import { useToggleStore } from "@/store/toggle.store";
import { useUserStore } from "@/store/user.store";

const HistoryButton = ({ crypto }: { crypto: string }) => {
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const setToggleModal = useToggleStore((state) => state.setToggleModal);
  const setModalData = useToggleStore((state) => state.setModalData);
  const cryptosHistory = useUserStore((state) => state.cryptosHistory);

  const handleHistoryCrypto = (crypto: string) => {
    const dataCrypto = cryptosHistory.filter((c) => c?.name === crypto);
    console.log({ dataCrypto });
    setToggleModal(!toggleModal);
    setModalData(dataCrypto);
  };
  return (
    <button
      className="flex items-center gap-2 cursor-pointer text-crypto-dark dark:text-crypto-light"
      onClick={() => {
        handleHistoryCrypto(crypto);
      }}
    >
      <span className={`${""}`}>Historial</span>
      <span>
        <Details width={12} height={12} styles={"text-crypto-yellow"} />
      </span>
    </button>
  );
};

export default HistoryButton;
