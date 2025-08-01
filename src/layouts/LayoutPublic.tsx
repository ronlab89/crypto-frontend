import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <main className="min-w-screen max-w-screen min-h-screen max-h-screen overflow-hidden bg-crypto-light dark:bg-crypto-dark text-crypto-dark dark:text-crypto-light font-crypto-body">
      <header>navbar</header>
      <Outlet />
    </main>
  );
};

export default LayoutPublic;
