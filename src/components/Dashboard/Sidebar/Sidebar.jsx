import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { GrLogout } from "react-icons/gr";
import { FaUserEdit, FaChartLine } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";
import ManagerMenu from "./Menu/ManagerMenu";

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer 
                ${theme === "dark" ? "bg-blue-500" : "bg-gray-300"}`}
    aria-label="Toggle theme"
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform 
                  ${theme === "dark" ? "translate-x-5" : "translate-x-1"}`}
    />
  </button>
);

const Sidebar = () => {
  const { logoutFunction } = useAuth();
  const [role] = useRole();
  const [isActive, setActive] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  const handleToggle = () => setActive((prev) => !prev);

  const sidebarLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? "text-blue-500 bg-blue-50 dark:bg-neutral-700/50 border-b-4 border-blue-500"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-neutral-800"
    }`;

  return (
    <>
      <div className="flex md:hidden shadow-md fixed w-full z-40 border-b bg-orange-100 dark:bg-neutral-900">
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
        <NavLink to="/" className="flex items-center gap-2 p-2">
          <img src="/logo.png" alt="logo" className="h-20 w-auto" />
        </NavLink>

        <div className="ml-auto mr-4 flex items-center">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {isActive && (
        <button
          aria-label="Close menu"
          onClick={() => setActive(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={[
          "z-40",
          "fixed inset-y-0 left-0",
          "w-64",
          "flex flex-col justify-between",
          "overflow-y-auto",
          "px-4 py-6 md:pt-4",
          "border-r border-gray-200 dark:border-neutral-800",
          "bg-orange-100 dark:bg-neutral-900",
          "shadow-lg",
          "transform transition-transform duration-300 ease-in-out",
          isActive ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          <div className="hidden md:flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 px-2 py-4">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="logo" className="h-20" />
            </Link>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-2">
              <MenuItem
                icon={FaChartLine}
                label="Overview"
                address="/dashboard"
                linkClass={sidebarLinkClass}
                end
              />
              {role === "borrower" && (
                <BorrowerMenu linkClass={sidebarLinkClass} />
              )}
              {role === "manager" && (
                <ManagerMenu linkClass={sidebarLinkClass} />
              )}
              {role === "admin" && <AdminMenu linkClass={sidebarLinkClass} />}
            </nav>
          </div>

          <div className="mt-6">
            <hr className="border-gray-200 dark:border-neutral-800" />
            <MenuItem
              icon={FaUserEdit}
              label="My Profile"
              address="/dashboard/profile"
              linkClass={sidebarLinkClass}
            />
            <button
              onClick={logoutFunction}
              className="flex w-full items-center px-4 py-3 mt-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium cursor-pointer"
            >
              <GrLogout className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
