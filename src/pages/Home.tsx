import DataTable from "@/components/ui/DataTable";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import { useLoadingStore } from "@/store/loading.store";
import { cryptoPublicColumns } from "@/libs/columns/crypto.columns";
import Loader from "@/components/ui/Loader";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import RadarChart from "@/components/charts/RadarChart";
import { useToggleStore } from "@/store/toggle.store";
import useCryptoData from "@/hooks/useCryptoData";
import { CountdownTimer } from "@/components/ui/CountDownTimer";

const Home = () => {
  const cryptos = useCoinmarketStore((state) => state.cryptos);
  const setCryptos = useCoinmarketStore((state) => state.setCryptos);
  const toggleCryptoSelected = useToggleStore(
    (state) => state.toggleCryptoSelected
  );
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  // 📈 Datos para Percentage Line Chart
  const timeLabels = ["1h", "24h", "7d", "30d"];
  const percentageDatasets = cryptos.map((c) => ({
    label: c.symbol,
    data: [
      c.quote.USD.percent_change_1h,
      c.quote.USD.percent_change_24h,
      c.quote.USD.percent_change_7d,
      c.quote.USD.percent_change_30d,
    ],
    color: "bg-purple-500",
  }));

  // 🧩 Datos para Dominancia
  const dominanceLabels = cryptos.map((c) => c.symbol);
  const dominanceData = cryptos.map((c) => c.quote.USD.market_cap_dominance);

  // 💹 Datos para volumen
  const volumeLabels = cryptos.map((c) => c.name);
  const volumeData = cryptos.map((c) => c.quote.USD.volume_24h);

  // 🧠 Radar Chart - análisis de Crypto Seleccionado
  const crypto = cryptos.find((c) => c.symbol === toggleCryptoSelected);
  const radarLabels = ["1h", "24h", "7d", "Vol Δ", "Dominancia"];
  const radarData = crypto
    ? [
        crypto.quote.USD.percent_change_1h,
        crypto.quote.USD.percent_change_24h,
        crypto.quote.USD.percent_change_7d,
        crypto.quote.USD.volume_change_24h,
        crypto.quote.USD.market_cap_dominance,
      ]
    : [0, 0, 0, 0, 0];

  const { remainingTime } = useCryptoData({
    cryptos,
    setCryptos,
    setLoading,
  });

  return (
    <section className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-start gap-0 px-5 sm:px-10 pt-[65vh] 5xs:pt-[54vh] sm:pt-[45vh] md:pt-[42vh] lg:pt-[150px] pb-[0px] lg:pb-[100px]">
      <article className="w-full h-full flex flex-col sm:flex-row sm:justify-between items-center gap-x-10 gap-y-0 sm:mb-10">
        <h2 className="text-sm font-semibold text-crypto-dark dark:text-crypto-light">
          Top 10 Crypto Monedas{" "}
        </h2>
        <CountdownTimer secondsRemaining={remainingTime} />
      </article>
      <section className="w-full h-fit flex flex-col items-center justify-start lg:flex-row lg:justify-between lg:items-start gap-x-10 gap-y-0">
        <article className="w-full max-h-full overflow-x-auto overflow-y-hidden h-fit flex flex-col justify-center items-start gap-10 mb-10 lg:mb-0">
          <DataTable
            data={cryptos ?? []}
            columns={cryptoPublicColumns}
            filter={false}
            search={false}
            pagination={false}
          />
        </article>
        <article className="w-full lg:w-[30vw] h-fit">
          <div className="w-full lg:w-[30vw] h-fit">
            <RadarChart
              title={`Análisis técnico: ${toggleCryptoSelected}`}
              showTitle={false}
              labels={radarLabels}
              data={radarData}
              label="BTC"
              color="bg-red-500"
              width="w-full"
              height="h-[25vh] sm:h-[30vh] lg:h-[50vh]"
            />
          </div>
        </article>
      </section>
      <section className="w-full h-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 lg:gap-5 p-0 mt-10">
        <div className="w-full lg:w-[30vw] h-fit">
          <LineChart
            title="Variación porcentual (1h, 24h, 7d, 30d)"
            showTitle={false}
            labels={timeLabels}
            datasets={percentageDatasets}
            width="w-full"
            height="h-[25vh] sm:h-[30vh] lg:h-[35vh]"
          />
        </div>
        <div className="w-full lg:w-[30vw] h-fit">
          <BarChart
            title="Volumen 24h (USD)"
            showTitle={false}
            labels={volumeLabels}
            datasetLabel="Volumen"
            data={volumeData}
            color="bg-green-400"
            width="w-full"
            height="h-[25vh] sm:h-[30vh] lg:h-[35vh]"
          />
        </div>
        <div className="w-full lg:w-[30vw] h-fit">
          <DoughnutChart
            title="Dominancia del mercado"
            showTitle={false}
            labels={dominanceLabels}
            data={dominanceData}
            colors={[
              "bg-blue-500",
              "bg-green-500",
              "bg-red-500",
              "bg-yellow-500",
              "bg-purple-500",
              "bg-blue-500",
              "bg-green-500",
              "bg-red-500",
              "bg-yellow-500",
              "bg-purple-500",
            ]}
            width="w-full"
            height="h-[25vh] sm:h-[30vh] lg:h-[35vh]"
          />
        </div>
      </section>
      {loading?.allCryptos ? <Loader text="" /> : null}
    </section>
  );
};

export default Home;
