import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Home from "../pages/Home/Home";


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
      
    ],
  },
]);
