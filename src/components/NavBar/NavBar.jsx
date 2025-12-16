import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { FaMoon, FaSun } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logoutFunction, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: dbUser, isLoading: dbLoading } = useQuery({
    queryKey: ["navbar-user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const userImg =
    dbUser?.image ||
    user?.photoURL ||
    "https://img.icons8.com/windows/64/user.png";

  const linkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-colors duration-200 rounded-lg ${
      isActive
        ? "text-blue-500 bg-blue-50 dark:bg-neutral-700/50 border-b-2 border-blue-500"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-neutral-800"
    }`;

  const guestLinks = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/loans" className={linkClass}>
          All Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className={linkClass}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" className={linkClass}>
          Contact
        </NavLink>
      </li>

      {!loading && (
        <>
          <li className="hidden md:block">
            <NavLink
              to="/login"
              className="mt-1 btn btn-sm w-18 text-white bg-blue-500 hover:bg-blue-600 border-none rounded-lg font-bold shadow-md"
            >
              Login
            </NavLink>
          </li>

          <li className="hidden md:block">
            <NavLink
              to="/register"
              className="mt-1 btn btn-sm w-18 text-white bg-orange-500 hover:bg-orange-600 border-none rounded-lg font-bold shadow-md"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/loans" className={linkClass}>
          All Loans
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
      </li>
      <li className="hidden md:block">
        <button
          onClick={logoutFunction}
          className="mt-1 btn btn-sm w-18 text-white bg-red-500 hover:bg-red-600 border-none rounded-lg font-bold shadow-md cursor-pointer"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="bg-orange-100 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-50 transition-colors duration-300 shadow-md">
      <div className="navbar container mx-auto p-2 h-16">
        <div className="navbar-start flex">
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:bg-transparent p-0"
          >
            <img src="/logo.png" alt="logo" className="h-[70px] w-auto" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
              RinTrack
            </span>
          </NavLink>
        </div>

        <div className="navbar-end flex items-center space-x-2">
          <div className="navbar-center hidden md:flex mr-8">
            <ul className="menu menu-horizontal px-2 space-x-2">
              {!user?.email ? guestLinks : userLinks}
            </ul>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : user && user?.email ? (
            <div className="dropdown dropdown-end ml-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-blue-500/50 hover:border-blue-500 p-0"
              >
                <div className="w-10 rounded-full">
                  {dbLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <img
                      alt="user photo"
                      src={userImg}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-orange-100 dark:bg-neutral-800 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-neutral-700"
              >
                <li className="p-2 text-center border-b dark:border-neutral-700">
                  <p className="font-bold text-gray-900 dark:text-white truncate">
                    {dbUser?.name || user.displayName || "User"}
                  </p>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="dark:text-gray-200  dark:hover:bg-neutral-700"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logoutFunction}
                    className="text-red-500 hover:bg-red-100 dark:hover:bg-neutral-700/50 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex space-x-2 md:hidden ml-2">
              <NavLink
                to="/login"
                className="btn btn-sm w-18 text-white bg-blue-500 hover:bg-blue-600 border-none rounded-lg font-bold"
              >
                Login
              </NavLink>
            </div>
          )}

          <label className="swap swap-rotate text-xl border-2 border-blue-500/50 rounded-full p-1.5 text-gray-600 dark:text-gray-300 ml-2">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <FaSun className="swap-off fill-current w-6 h-6 transition-transform duration-300" />
            <FaMoon className="swap-on fill-current w-6 h-6 transition-transform duration-300" />
          </label>

          <div className="dropdown dropdown-end md:hidden ml-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <AiOutlineMenu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-orange-100 dark:bg-neutral-800 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-neutral-700 right-0"
            >
              {!user?.email ? guestLinks : userLinks}

              {!user?.email && (
                <>
                  <li>
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={linkClass}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
