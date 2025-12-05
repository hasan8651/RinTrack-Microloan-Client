import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/NavBar";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="w-full mx-auto flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
