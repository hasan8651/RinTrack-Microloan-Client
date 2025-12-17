import { Outlet } from "react-router";
import { useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  useEffect(() => {
    localStorage.getItem("theme") === "light" ? "light" : "dark";
  }, []);

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="pt-16 md:pt-0 p-4 md:p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
