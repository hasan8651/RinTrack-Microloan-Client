import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllLoans from "../pages/AllLoans/AllLoans";
import LoanDetails from "../pages/LoanDetails/LoanDetails";
import DashboardLayout from "../layout/DashboardLayout";
import LoanForm from "../pages/LoanForm/LoanForm";
import MyLoans from "../pages/Dashboard/Borrower/Myloans";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";
import ManageLoans from "../pages/Dashboard/Manager/ManageLoans";
import UpdateLoans from "../pages/Dashboard/Manager/UpdateLoans";
import PendingLoans from "../pages/Dashboard/Manager/PendingLoans";



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
        path: "/loan-form/:id",
        element: <LoanForm/>,
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

  {
    path: "/dashboard",
    element: 
     
        <DashboardLayout />
      
   ,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: "/dashboard/profile",
        element: <MyLoans gg />,
      },
      {
        path: "/dashboard/my-loans",
        element: <MyLoans />,
      },
       {
        path: "/dashboard/add-loan",
        element: 
            <AddLoan/>,
                 },
       {
        path: "/dashboard/update-loan/:id",
        element: 
            <UpdateLoans/>,
                 },
       {
        path: "/dashboard/manage-loans",
        element: 
            <ManageLoans/>,
                 },
       {
        path: "/dashboard/pending-loans",
        element: 
            <PendingLoans/>,
                 },
       {
        path: "/dashboard/approved-loans",
        element: 
            <AddLoan gg/>,
                 },
       {
        path: "/dashboard/loan-applications",
        element: 
            <AddLoan gg/>,
                 },
       {
        path: "/dashboard/all-loan",
        element: 
            <AddLoan gg/>,
                 },
       {
        path: "/dashboard/manage-users",
        element: 
            <AddLoan gg/>,
                 },
    ]}

]);
