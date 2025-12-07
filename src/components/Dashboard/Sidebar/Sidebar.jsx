import { useContext, useState } from "react";
import { Link } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import logo from "../../../assets/images/logo-flat.png";
// Icons
import { GrLogout } from "react-icons/gr";
import { FaUserEdit, FaChartLine } from "react-icons/fa"; // Updated icons
import { AiOutlineBars } from "react-icons/ai";
// Menu Imports
// import MenuItem from "./Menu/MenuItem";
// import AdminMenu from "./Menu/AdminMenu";
// import SellerMenu from "./Menu/SellerMenu"; // Assuming this is ManagerMenu now
// import CustomerMenu from "./Menu/CustomerMenu";
// import useRole from "../../../hooks/useRole";
// import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import MenuItem from "./Menu/MenuItem";

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);
  // const [role, isRoleLoading] = useRole();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  
  const handleLogout = async () => {
    try {
        await logOut();
        // toast.success("Logged out successfully!");
    } catch (error) {
        console.error("Logout failed:", error);
        // toast.error("Logout failed.");
    }
  }

  return (
    <>
      {/* Small Screen Navbar (Mobile Header) - Fixed for better UX */}
      <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-white flex justify-between md:hidden shadow-md fixed w-full z-30 border-b dark:border-neutral-800">
        <div>
          <div className="block cursor-pointer p-3 font-bold">
            <Link to="/">
              <img src="" alt="logo" width="100" className="h-8" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar - Themed, Fixed, and Modernized */}
      <div
        className={`
          z-20 md:fixed flex flex-col justify-between overflow-x-hidden 
          bg-white dark:bg-neutral-900 
          w-64 space-y-6 px-4 py-7 
          absolute inset-y-0 left-0 
          transform transition duration-300 ease-in-out 
          border-r border-gray-200 dark:border-neutral-800
          ${isActive ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:pt-4
        `}
      >
        <div className="flex flex-col h-full">
          {/* Top Content: Logo & Header (Desktop) */}
          <div className="hidden md:block">
            <div className="w-full flex px-2 py-4 justify-center items-center mx-auto border-b border-gray-100 dark:border-neutral-800">
              <Link to="/" className="flex items-center">
                <img src="" alt="logo" className="h-10" />
                <span className="text-2xl font-extrabold ml-2 text-gray-900 dark:text-white">Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Middle Content: Dynamic Menu Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-2">
              {/* Common Menu: Statistics/Overview */}
              <MenuItem
                icon={FaChartLine}
                label="Statistics / Overview"
                address="/dashboard"
              />
              
              {/* Role-Based Menu
              {role === "borrower" && <CustomerMenu />}
              {/* Assuming 'seller' is the role for 'manager' or 'loan officer' */}
              {/* {role === "manager" && <SellerMenu />} 
              {role === "admin" && <AdminMenu />} */} 
            </nav>
          </div>

          {/* Bottom Content: Profile & Logout */}
          <div className="mt-8">
            <hr className="border-gray-200 dark:border-neutral-700" />

            {/* Profile Link */}
            <MenuItem
              icon={FaUserEdit} // Changed icon for modern look
              label="My Profile"
              address="/dashboard/profile"
            />
            
            {/* Logout Button - Themed with red accent */}
            <button
              onClick={handleLogout}
              className="flex cursor-pointer w-full items-center px-4 py-3 mt-4 text-red-500 hover:bg-red-50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors duration-300 transform font-medium"
            >
              <GrLogout className="w-5 h-5" />
              <span className="mx-4">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;