import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import { Toaster } from "sonner";

const LayoutPublic = () => {
  return (
    <main className="min-w-screen max-w-screen min-h-screen max-h-screen overflow-hidden bg-crypto-light dark:bg-crypto-dark text-crypto-dark dark:text-crypto-light font-crypto-body">
      <Navbar />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default LayoutPublic;
