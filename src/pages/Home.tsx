import { useEffect } from "react";
import DataTable from "@/components/ui/DataTable";
import { useCoinmarketStore } from "@/store/coinmarket.store";
import { getAllCryptos } from "@/libs/services/coinmarket";
import { useLoadingStore } from "@/store/loading.store";
import { customersColumns } from "@/libs/columns/crypto.columns";
import Loader from "@/components/ui/Loader";
import { ChartComponent } from "@/components/charts/ChartComponent";

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

  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];

  useEffect(() => {
    if (cryptos.length === 0) {
      getCryptos();
    }
  }, []);

  return (
    <section className="w-full h-full flex justify-between items-start gap-10 p-20">
      <article className="w-full h-full">
        <DataTable
          data={cryptos ?? []}
          columns={customersColumns}
          filter={false}
          search={true}
          pagination={true}
        />
      </article>
      <article className="flex flex-col justify-center items-start gap-10">
        <div className="w-[40vw] h-[40vh] rounded-[.5rem] bg-crypto-dark/10 dark:bg-crypto-light/10">
          <ChartComponent data={initialData}></ChartComponent>
        </div>
        <div className="w-[40vw] h-[40vh] rounded-[.5rem] bg-crypto-dark/10 dark:bg-crypto-light/10">
          Chart 2
        </div>
      </article>
      {loading?.allCryptos ? <Loader text="" /> : null}
    </section>
  );
};

export default Home;
