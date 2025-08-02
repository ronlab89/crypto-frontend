import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";

const UserDropdown = () => {
  const toggleDropdownUser = useToggleStore(
    (state) => state.toggleDropdownUser
  );
  const userLogged = useAuthStore((state) => state.userLogged);
  return (
    <div
      className={`${
        toggleDropdownUser ? "absolute top-[25px] right-[-10px]" : "hidden"
      } z-50 my-4 w-56 text-base list-none bg-crypto-dark/10 rounded divide-y divide-gray-100 shadow dark:bg-crypto-light/10 dark:divide-gray-600`}
      id="dropdown"
    >
      <div className="py-3 px-4">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {userLogged?.name}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {userLogged?.email}
        </span>
      </div>
      <ul
        className="py-1 text-gray-500 dark:text-gray-400"
        aria-labelledby="dropdown"
      >
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
