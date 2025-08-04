import { lazy, Suspense, useEffect } from "react";
import { useToggleStore } from "@/store/toggle.store";
import Button from "@/components/ui/Button";
import Angle from "@/icons/Angle";
import { useLoadingStore } from "@/store/loading.store";
import Loader from "@/components/ui/Loader";
import { syncCryptos } from "@/libs/services/coinmarket";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import { useAuthStore } from "@/store/auth.store";
import DataTable from "@/components/ui/DataTable";
import { cryptoSelectedColumns } from "@/libs/columns/crypto.columns";
import { useUserStore } from "@/store/user.store";

const SearchDropdown = lazy(() => import("@/components/ui/SearchDropdown"));

const Dashboard = () => {
  const toggleSearchDropdown = useToggleStore(
    (state) => state.toggleSearchDropdown
  );
  const setToggleSearchDropdown = useToggleStore(
    (state) => state.setToggleSearchDropdown
  );
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const cryptosToDropdown = useCoinmarketStore(
    (state) => state.cryptosToDropdown
  );
  const setCryptosToDropdown = useCoinmarketStore(
    (state) => state.setCryptosToDropdown
  );
  const token = useAuthStore((state) => state.token);
  const cryptosSelected = useUserStore((state) => state.cryptosSelected);

  const sync = async () => {
    await syncCryptos({
      setLoading,
      setCryptosToDropdown,
      token,
    });
  };

  useEffect(() => {
    if (cryptosToDropdown.length === 0) {
      sync();
    }
  }, []);

  return (
    <section className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-start items-start gap-0 px-10 pt-[50px] pb-[100px]">
      <article className="w-full h-[100px] flex justify-between items-start">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="relative">
          <Button
            type="button"
            id="dropdownSearchButton"
            extraStyles="flex justify-center items-center mt-5"
            disabled={false}
            variant={false}
            action={() => setToggleSearchDropdown(!toggleSearchDropdown)}
          >
            <>
              <span>Selección de crypto monedas</span>
              <Angle width={20} height={20} styles="ml-2 rotate-[-90deg]" />
            </>
          </Button>
          <Suspense fallback={""}>
            <SearchDropdown />
          </Suspense>
        </div>
      </article>
      <article className="w-full h-full flex justify-between items-start gap-10">
        <section className="w-[40vw] h-fit">
          <DataTable
            data={cryptosSelected ?? []}
            columns={cryptoSelectedColumns}
            filter={false}
            search={true}
            pagination={true}
          />
        </section>
        <section className="w-[60vw] h-full grid grid-cols-2 gap-10 justify-items-center items-center p-4">
          <article className="w-full h-[300px] bg-amber-100"></article>
          <article className="w-full h-[300px] bg-amber-100"></article>
          <article className="w-full h-[300px] bg-amber-100"></article>
          <article className="w-full h-[300px] bg-amber-100"></article>
        </section>
      </article>
      {loading?.syncCryptos ||
      loading?.cryptosToDropdown ||
      loading.addUserCryptos ||
      loading.getUserCryptos ? (
        <Loader text="" />
      ) : null}
    </section>
  );
};

export default Dashboard;
