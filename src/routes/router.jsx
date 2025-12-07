import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllLoans from "../pages/AllLoans/AllLoans";
import LoanDetails from "../pages/LoanDetails/LoanDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Home />,
      },
        {
        path: "/loans",
        element: <AllLoans/>,
      },
        {
        path: "/loans/:id",
        element: <LoanDetails/>,
      },
        {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
    ],
  },
]);
