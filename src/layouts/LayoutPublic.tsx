import ToggleTheme from "@/components/ui/ToggleTheme";
import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <main className="min-w-screen max-w-screen min-h-screen max-h-screen overflow-hidden bg-crypto-light dark:bg-crypto-dark text-crypto-dark dark:text-crypto-light font-crypto-body">
      <header>
        navbar
        <ToggleTheme position="absolute" right="0" top="0" />
      </header>
      <Outlet />
    </main>
  );
};

export default LayoutPublic;
