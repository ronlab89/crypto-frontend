import { useToggleStore } from "@/store/toggle.store";
import { useAuthStore } from "@/store/auth.store";

import ToggleTheme from "@/components/ui/ToggleTheme";
import UserDropdown from "@/components/navigation/UserDropdown";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const toggleDropdownUser = useToggleStore(
    (state) => state.toggleDropdownUser
  );
  const setToggleDropdownUser = useToggleStore(
    (state) => state.setToggleDropdownUser
  );
  const logged = useAuthStore((state) => state.logged);
  const token = useAuthStore((state) => state.token);
  const userLogged = useAuthStore((state) => state.userLogged);
  return (
    <header className="antialiased">
      <nav className="bg-crypto-light border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-crypto-dark">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <NavLink to={"/"} className="flex mr-4">
              <img
                src="/logo.svg"
                className="mr-3 h-7 md:h-8"
                alt="FlowBite Logo"
              />
              <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-crypto-light font-crypto-title">
                Crypto Investment
              </span>
            </NavLink>
          </div>
          <div
            className={`flex items-center ${
              !logged && !token ? "gap-4" : "gap-2"
            } lg:order-2 relative`}
          >
            <ToggleTheme position="relative" right="0" top="top-[1px]" />

            {!logged && !token ? (
              <div className="flex items-center gap-4">
                <NavLink to={"/login"}>
                  <span className="block text-[0.6rem] 3xs:text-xs md:text-sm dark:bg-crypto-light bg-crypto-dark dark:text-crypto-dark text-crypto-light font-medium px-3 py-1 rounded-[.5rem] cursor-pointer">
                    Iniciar sesión
                  </span>
                </NavLink>
                <NavLink to={"/register"}>
                  <span className="block text-[0.6rem] 3xs:text-xs md:text-sm bg-crypto-yellow text-crypto-dark font-medium px-3 py-1 rounded-[.5rem] cursor-pointer">
                    Registrarse
                  </span>
                </NavLink>
              </div>
            ) : (
              <button
                type="button"
                className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
                onClick={() => setToggleDropdownUser(!toggleDropdownUser)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-7 md:w-8 h-7 md:h-8 rounded-full flex items-center justify-center text-sm bg-crypto-yellow/20 border-2 border-crypto-yellow">
                  {userLogged?.name[0]} {userLogged?.lastName[0]}
                </div>
              </button>
            )}

            {/* <!-- Dropdown menu --> */}
            <UserDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
