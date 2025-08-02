import DataTable from "@/components/ui/DataTable";

const Home = () => {
  return (
    <section className="w-full h-full flex justify-between items-start p-20">
      <article>
        <DataTable
          data={[]}
          columns={[]}
          filter={false}
          search={true}
          pagination={true}
        />
      </article>
      <article className="flex flex-col justify-center items-start gap-10">
        <div className="w-[40vw] h-[40vh] rounded-[.5rem] bg-crypto-dark/10 dark:bg-crypto-light/10">
          Chart 1
        </div>
        <div className="w-[40vw] h-[40vh] rounded-[.5rem] bg-crypto-dark/10 dark:bg-crypto-light/10">
          Chart 2
        </div>
      </article>
    </section>
  );
};

export default Home;
