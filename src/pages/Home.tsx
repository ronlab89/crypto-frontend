import { useEffect } from "react";
import DataTable from "@/components/ui/DataTable";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import { getAllCryptos } from "@/libs/services/coinmarket";
import { useLoadingStore } from "@/store/loading.store";
import { customersColumns } from "@/libs/columns/crypto.columns";
import Loader from "@/components/ui/Loader";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import RadarChart from "@/components/charts/RadarChart";

const Home = () => {
  const cryptos = useCoinmarketStore((state) => state.cryptos);
  const setCryptos = useCoinmarketStore((state) => state.setCryptos);
  const loading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const getCryptos = async () => {
    await getAllCryptos({
      setLoading,
      setCryptos,
    });
  };

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

  // 🧠 Radar Chart - análisis de BTC
  const btc = cryptos.find((c) => c.symbol === "BTC");
  const radarLabels = ["1h", "24h", "7d", "Vol Δ", "Dominancia"];
  const radarData = btc
    ? [
        btc.quote.USD.percent_change_1h,
        btc.quote.USD.percent_change_24h,
        btc.quote.USD.percent_change_7d,
        btc.quote.USD.volume_change_24h,
        btc.quote.USD.market_cap_dominance,
      ]
    : [0, 0, 0, 0, 0];

  useEffect(() => {
    if (cryptos.length === 0) {
      getCryptos();
    }
  }, []);

  return (
    <section className="w-full h-full flex flex-col justify-center items-start gap-10 p-20">
      <section className="w-full h-full flex justify-between items-start gap-10">
        <article className="w-full h-full flex flex-col justify-center items-start gap-10">
          <DataTable
            data={cryptos ?? []}
            columns={customersColumns}
            filter={false}
            search={false}
            pagination={false}
          />
          <div className="w-[40vw] h-[40vh]">
            <LineChart
              title="Variación porcentual (1h, 24h, 7d, 30d)"
              labels={timeLabels}
              datasets={percentageDatasets}
            />
          </div>
        </article>
        <article className="flex flex-col justify-center items-start gap-10">
          <div className="w-[40vw] h-fit">
            <RadarChart
              title="Análisis técnico: BTC"
              labels={radarLabels}
              data={radarData}
              label="BTC"
              color="bg-red-500"
            />
          </div>
        </article>
      </section>
      <section className="w-full h-full flex justify-between items-start gap-10 p-20">
        <article className="w-full h-full">
          <div className="w-full h-full">
            <BarChart
              title="Volumen 24h (USD)"
              labels={volumeLabels}
              datasetLabel="Volumen"
              data={volumeData}
              color="bg-green-400"
            />
          </div>
        </article>
        <article className="w-full h-full">
          <div className="w-full h-full">
            <DoughnutChart
              title="Dominancia del mercado"
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
            />
          </div>
        </article>
      </section>
      {loading?.allCryptos ? <Loader text="" /> : null}
    </section>
  );
};

export default Home;
