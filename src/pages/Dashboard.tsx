import { lazy, Suspense, useEffect } from "react";
import { useToggleStore } from "@/store/toggle.store";
import Button from "@/components/ui/Button";
import Angle from "@/icons/Angle";
import { useLoadingStore } from "@/store/loading.store";
import { syncCryptos } from "@/libs/services/coinmarket";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import { useAuthStore } from "@/store/auth.store";
import DataTable from "@/components/ui/DataTable";
import { cryptoSelectedColumns } from "@/libs/columns/crypto.columns";
import { useUserStore } from "@/store/user.store";
import { formatterus } from "@/libs/utils/formatter";
import SparklineChart from "@/components/charts/SparklineChart";
import BarChart from "@/components/charts/BarChart";
import { CountdownTimer } from "@/components/ui/CountDownTimer";
import useCryptosQuoteData from "@/hooks/useCryptosQuoteData";
import { getCryptosUser } from "@/libs/services/cryptousers";

const Loader = lazy(() => import("@/components/ui/Loader"));
const Modal = lazy(() => import("@/components/ui/Modal"));

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
  const setCryptosSelected = useUserStore((state) => state.setCryptosSelected);
  const cryptosQuote = useUserStore((state) => state.cryptosQuote);
  const setCryptosQuote = useUserStore((state) => state.setCryptosQuote);
  const toggleCryptoSelected = useToggleStore(
    (state) => state.toggleCryptoSelected
  );
  const userLogged = useAuthStore((state) => state.userLogged);
  const setCryptosHistory = useUserStore((state) => state.setCryptosHistory);

  const { remainingTimeQuote } = useCryptosQuoteData({
    token,
    cryptosQuote,
    setCryptosQuote,
    setLoading,
  });

  const sync = async () => {
    await syncCryptos({
      setLoading,
      setCryptosToDropdown,
      token,
    });
  };

  const userIdsSelected = cryptosSelected.map((crypto) => Number(crypto.id));

  const cmcIds = cryptosToDropdown
    .filter((crypto) => userIdsSelected.includes(crypto.id))
    .map((crypto) => crypto.cmcId)
    .join(",");

  useEffect(() => {
    if (cryptosToDropdown.length === 0) {
      sync();
    }
    if (cryptosSelected.length === 0) {
      if (userLogged) {
        getCryptosUser({
          setLoading,
          token,
          userId: userLogged.id,
          setCryptosSelected,
          selectedCmcIds: cmcIds,
          setCryptosQuote,
          setCryptosHistory,
        });
      }
    }
  }, []);

  const data = cryptosQuote[Number(toggleCryptoSelected)];
  // const data = cryptosQuote[2];

  // 📈 Datos para Percentage Line Chart
  const timeLabels = ["1h", "24h", "7d", "30d"];
  const percentageDatasets = [
    {
      label: "% de cambio",
      data: [
        data?.quote?.USD?.percent_change_1h,
        data?.quote?.USD?.percent_change_24h,
        data?.quote?.USD?.percent_change_7d,
        data?.quote?.USD?.percent_change_30d,
      ],
      backgroundColor: [
        data?.quote?.USD?.percent_change_1h >= 0 ? "#4ade80" : "#f87171", // green or red
        data?.quote?.USD?.percent_change_24h >= 0 ? "#4ade80" : "#f87171",
        data?.quote?.USD?.percent_change_7d >= 0 ? "#4ade80" : "#f87171",
        data?.quote?.USD?.percent_change_30d >= 0 ? "#4ade80" : "#f87171",
      ],
      borderRadius: 6,
    },
  ];

  return (
    <section className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-start items-start gap-0 px-[20px] sm:px-10 pt-[0px] pb-[100px]">
      <article className="w-full h-[100px] flex flex-col sm:flex-row sm:justify-between items-center order-1">
        <CountdownTimer secondsRemaining={remainingTimeQuote} />
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
      <section className="w-full h-fit 2xl:px-[0px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 justify-items-center items-center order-3 lg:order-2 mt-10 lg:mt-0">
        <SparklineChart
          title={`Precio ${data?.name} (USD)`}
          value={`${formatterus.format(data?.quote?.USD.price)}`}
          subtitle={`${data?.quote?.USD?.percent_change_24h.toFixed(2)}% (24h)`}
          dataPoints={[
            data?.quote?.USD?.percent_change_1h,
            data?.quote?.USD?.percent_change_24h,
            data?.quote?.USD?.percent_change_7d,
            data?.quote?.USD?.percent_change_30d,
          ]}
          isPositive={data?.quote?.USD?.percent_change_24h >= 0}
        />

        <SparklineChart
          title={`Capitalización ${data?.name} (USD)`}
          value={`${formatterus.format(data?.quote?.USD?.market_cap)}`}
          subtitle={`Dominancia: ${data?.quote?.USD?.market_cap_dominance.toFixed(
            2
          )}%`}
          dataPoints={[
            data?.quote?.USD?.percent_change_1h,
            data?.quote?.USD?.percent_change_24h,
            data?.quote?.USD?.percent_change_7d,
            data?.quote?.USD?.percent_change_30d,
          ]}
          isPositive={data?.quote?.USD?.market_cap_dominance >= 0}
        />
        <SparklineChart
          title={`Volumen ${data?.name} (USD) (24h)`}
          value={`${formatterus.format(data?.quote?.USD?.volume_24h)}`}
          subtitle={`Cambio: ${data?.quote?.USD?.volume_change_24h.toFixed(
            2
          )}%`}
          dataPoints={[
            data?.quote?.USD?.volume_change_24h,
            data?.quote?.USD?.volume_change_24h - 1,
            data?.quote?.USD?.volume_change_24h - 2,
            data?.quote?.USD?.volume_change_24h - 3,
          ]}
          isPositive={data?.quote?.USD?.volume_change_24h >= 0}
        />
        <SparklineChart
          title={`Tendencia de precio ${data?.name} (USD)`}
          value={`${formatterus.format(data?.quote?.USD?.price)}`}
          subtitle="Ultimos 30 días"
          dataPoints={[
            data?.quote?.USD?.percent_change_1h,
            data?.quote?.USD?.percent_change_24h,
            data?.quote?.USD?.percent_change_7d,
            data?.quote?.USD?.percent_change_30d,
          ]}
          isPositive={data?.quote?.USD?.percent_change_30d >= 0}
        />
      </section>
      <section className="w-full h-fit flex flex-col gap-10 lg:px-[20px] order-2 lg:order-3 mt-5 sm:mt-0 lg:mt-10">
        <section className="w-full h-fit flex flex-col lg:flex-row lg:justify-between items-center">
          <article className="w-full lg:w-full relative">
            <DataTable
              data={cryptosSelected ?? []}
              columns={cryptoSelectedColumns}
              filter={false}
              search={true}
              pagination={true}
              initialPages={7}
            />
          </article>
          <article className="w-full flex flex-col justify-end items-end gap-10 mt-50 sm:mt-40 md:mt-0">
            <div className="w-full lg:w-[90%] h-fit md:pt-[150px] lg:pt-0">
              <BarChart
                title="Resumen de rendimiento"
                showTitle={false}
                labels={timeLabels}
                datasetLabel="% de rendimiento"
                data={percentageDatasets[0].data}
                color=""
                width="w-full"
                height="h-[25vh] sm:h-[35vh]"
              />
            </div>
          </article>
        </section>
      </section>
      <Suspense fallback={""}>
        <Modal />
      </Suspense>
      {loading?.syncCryptos ||
      loading?.cryptosToDropdown ||
      loading.addUserCryptos ||
      loading.getUserCryptos ||
      loading.cryptosQuote ||
      loading.addCryptosHistory ? (
        <Suspense fallback={""}>
          <Loader text="" />
        </Suspense>
      ) : null}
    </section>
  );
};

export default Dashboard;
