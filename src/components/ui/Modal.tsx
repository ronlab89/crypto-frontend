import Close from "@/icons/Close";

import { useToggleStore } from "@/store/toggle.store";
import DataTable from "./DataTable";
import { cryptoHistoryColumns } from "@/libs/columns/history.columns";

const Modal = () => {
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const setToggleModal = useToggleStore((state) => state.setToggleModal);
  const modalData = useToggleStore((state) => state.modalData) ?? [];
  const setModalData = useToggleStore((state) => state.setModalData);
  return (
    // <!-- Main modal -->
    <section
      className={` ${
        toggleModal
          ? "bottom-[0px] left-[0px]"
          : "translate-y-[100vh] bottom-[0px] left-[0px]"
      } w-screen h-[95vh] md:h-[95vh] lg:h-[91.5vh] px-6 sm:px-8 pt-0 pb-8 fixed z-40 overflow-hidden transition-transform duration-500 ease-in-out bg-crypto-light dark:bg-crypto-dark rounded-[0rem] flex flex-col border-t-2 border-crypto-yellow`}
    >
      <article className="w-full h-[60px] flex justify-between items-center">
        <h2>Historial: {modalData[0]?.name}</h2>
        <span
          onClick={() => {
            setToggleModal(!toggleModal);
            setModalData([]);
          }}
          className="pt-2.5 cursor-pointer border-0 w-8 h-8 z-[70] text-crypto-dark dark:text-crypto-light hover:text-crypto-yellow dark:hover:text-crypto-yellow transition-colors"
        >
          <Close width={15} height={15} styles={""} />
          <span className="sr-only">Close</span>
        </span>
      </article>

      <article className="w-full lg:w-full relative">
        <DataTable
          data={modalData ?? []}
          columns={cryptoHistoryColumns}
          filter={false}
          search={true}
          pagination={true}
          initialPages={10}
        />
      </article>
    </section>
  );
};

export default Modal;
