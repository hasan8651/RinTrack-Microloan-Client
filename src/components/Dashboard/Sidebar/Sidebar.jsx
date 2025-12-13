import { useState } from "react";
import { Link, NavLink } from "react-router";
import { GrLogout } from "react-icons/gr";
import { FaUserEdit, FaChartLine } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/ManagerMenu";
import BorrowerMenu from "./Menu/BorrowerMenu";
import ManagerMenu from "./Menu/ManagerMenu";

const Sidebar = () => {
  const { logoutFunction } = useAuth();
  const [role] = useRole();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };


const sidebarLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors duration-200 ${
    isActive
      ? "text-blue-500 bg-blue-50 dark:bg-neutral-700/50 border-b-4 border-blue-500"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-neutral-800"
  }`;






  return (
    <>
      {/* Mobile Header */}
<div className="flex  md:hidden shadow-md fixed w-full z-40 border-b bg-base-100 dark:bg-neutral-900">
<button onClick={handleToggle} className="mobile-menu-button p-4 focus:outline-none text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors" >
<AiOutlineBars className="h-6 w-6" />
</button>
<NavLink to="/" className="flex items-center gap-2 p-2">
<img src="/logo.png" alt="logo" className="h-20 w-auto" />
</NavLink>
</div>



  {/* Optional backdrop on mobile when open */}
  {isActive && (
    <button
      aria-label="Close menu"
      onClick={() => setActive(false)}
      className="fixed inset-0 z-30 bg-black/40 md:hidden"
    />
  )}

  {/* Sidebar */}
  <aside
    className={[
      "z-40",                         // above content
      "fixed inset-y-0 left-0",       // full height
      "w-64",                         // width
      "flex flex-col justify-between",
      "overflow-y-auto",
      "px-4 py-6 md:pt-4",
      "border-r border-gray-200 dark:border-neutral-800",
      "bg-base-100 dark:bg-neutral-900", // <— background added
      "shadow-lg",                    // optional
      "transform transition-transform duration-300 ease-in-out",
      isActive ? "translate-x-0" : "-translate-x-full",
      "md:translate-x-0"              // always visible on md+
    ].join(" ")}
  >
    <div className="flex flex-col h-full">
      {/* Desktop Logo */}
      <div className="hidden md:block">
        <div className="w-full flex px-2 py-4 justify-center items-center mx-auto border-b border-gray-100 dark:border-neutral-800">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="logo" className="h-20" />
          </Link>
        </div>
      </div>

      {/* Nav */}
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="space-y-2">
          <MenuItem icon={FaChartLine} label="Overview" address="/dashboard" linkClass={sidebarLinkClass} end/>
          {role === "borrower" && <BorrowerMenu linkClass={sidebarLinkClass}/>}
          {role === "manager" && <ManagerMenu linkClass={sidebarLinkClass}/>}
          {role === "admin" && <AdminMenu linkClass={sidebarLinkClass}/>}
        </nav>
      </div>

      {/* Profile + Logout */}
      <div className="mt-6">
        <hr className="border-gray-200 dark:border-neutral-800" />
        <MenuItem icon={FaUserEdit} label="My Profile" address="/dashboard/profile" linkClass={sidebarLinkClass} />
        <button
          onClick={logoutFunction}
          className="flex w-full items-center px-4 py-3 mt-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
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
