import { useToggleStore } from "@/store/toggle.store";
import ToggleTheme from "@/components/ui/ToggleTheme";

const Navbar = () => {
  const toggleDropdownUser = useToggleStore(
    (state) => state.toggleDropdownUser
  );
  const setToggleDropdownUser = useToggleStore(
    (state) => state.setToggleDropdownUser
  );
  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <a href="/" className="flex mr-4">
              <img src="/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-crypto-light font-crypto-title">
                Crypto Investment
              </span>
            </a>
          </div>
          <div className="flex items-center lg:order-2 relative">
            <ToggleTheme position="relative" right="0" top="0" />
            <span className="block">Login</span>

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
            {/* <!-- Dropdown menu --> */}
            <div
              className={`${
                toggleDropdownUser
                  ? "absolute top-[25px] right-[-10px]"
                  : "hidden"
              } z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Neil sims
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
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
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
