import "@/assets/css/loader.css";

interface LoaderProps {
  text: string;
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <section className="w-screen h-screen flex justify-center items-center z-[5000] fixed top-0 left-0">
      <div className="flex flex-col justify-center items-center">
        <span className="loader"></span>
        <span className="pt-2 text-[1.2rem] font-semibold animate-pulse text-Shippingco-text dark:text-Shippingco-textdark">
          {text}
        </span>
      </div>
    </section>
  );
};

export default Loader;
