import Navbar from "@/components/navigation/Navbar";
import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const LayoutPrivate = () => {
  const token = useAuthStore((state) => state.token);
  const logged = useAuthStore((state) => state.logged);

  if (token === null && !logged) return <Navigate to={"/"} />;

  return (
    <main className="min-w-screen max-w-screen min-h-screen h-screen max-h-full overflow-hidden bg-crypto-light dark:bg-crypto-dark text-crypto-dark dark:text-crypto-light font-crypto-body">
      <Navbar />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default LayoutPrivate;
