import { logout } from "@/libs/services/auth";
import { useAuthStore } from "@/store/auth.store";
import { useLoadingStore } from "@/store/loading.store";
import { useToggleStore } from "@/store/toggle.store";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const token = useAuthStore((state) => state.token);
  const toggleDropdownUser = useToggleStore(
    (state) => state.toggleDropdownUser
  );
  const userLogged = useAuthStore((state) => state.userLogged);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const resetLoading = useLoadingStore((state) => state.resetLoading);
  const resetToggles = useToggleStore((state) => state.resetToggles);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout({
      setLoading,
      token,
      navigate,
      resetAuth,
      resetLoading,
      resetToggles,
    });
  };

  return (
    <div
      className={`${
        toggleDropdownUser ? "absolute top-[25px] right-[-10px]" : "hidden"
      } z-50 my-4 w-56 text-base list-none bg-zinc-100/30 dark:bg-zinc-900 rounded divide-y divide-gray-100 shadow dark:divide-gray-600`}
      id="dropdown"
    >
      <div className="py-3 px-4">
        <span className="block text-sm font-semibold text-crypto-dark dark:text-crypto-light">
          {userLogged?.name} {userLogged?.lastName}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {userLogged?.email}
        </span>
      </div>
      <ul
        className="py-1 text-gray-500 dark:text-gray-400"
        aria-labelledby="dropdown"
      >
        <li
          className="block py-2 px-4 text-sm text-crypto-dark/80 dark:text-crypto-light/80 hover:text-crypto-yellow dark:hover:text-crypto-yellow transition-colors cursor-pointer"
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
