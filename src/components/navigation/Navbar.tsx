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
  const userLogged = useAuthStore((state) => state.userLogged);
  const token = useAuthStore((state) => state.token);

  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <NavLink to={"/"} className="flex mr-4">
              <img src="/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-crypto-light font-crypto-title">
                Crypto Investment
              </span>
            </NavLink>
          </div>
          <div className="flex items-center gap-4 lg:order-2 relative">
            <ToggleTheme position="relative" right="0" top="0" />

            {!userLogged && !token ? (
              <div className="flex items-center gap-4">
                <NavLink to={"/login"}>
                  <span className="block text-sm dark:bg-crypto-light bg-crypto-dark dark:text-crypto-dark text-crypto-light font-medium px-3 py-1 rounded-[.5rem] cursor-pointer">
                    Iniciar sesión
                  </span>
                </NavLink>
                <NavLink to={"/register"}>
                  <span className="block text-sm bg-crypto-yellow text-crypto-dark font-medium px-3 py-1 rounded-[.5rem] cursor-pointer">
                    Registrarse
                  </span>
                </NavLink>
              </div>
            ) : (
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
                onClick={() => setToggleDropdownUser(!toggleDropdownUser)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
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
