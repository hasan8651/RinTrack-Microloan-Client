import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
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
import ApprovedLoans from "../pages/Dashboard/Manager/ApprovedLoans";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Suspended from "../pages/Suspended/Suspended";
import Statistics from "../pages/Dashboard/Common/Statistics";
import Profile from "../pages/Dashboard/Common/Profile";
import ManagerRoute from "./ManagerRoute";
import BorrowerRoute from "./BorrowerRoute";
import AdminRoute from "./AdminRoute";

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
        element: (<PrivateRoute><LoanDetails/></PrivateRoute>),
      },
       {
        path: "/loan-form/:id",
        element: <LoanForm/>,
      },
       {
        path: "/payment-success",
        element: <PaymentSuccess/>,
      },
      {
        path: "/about-us",
        element: <AboutUs/>,
      },
      {
        path: "/contact-us",
        element: <ContactUs/>,
      },
       {
        path: '/suspended',
        element: <Suspended/>
      }
        {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      
    ],
  },

  {
    path: "/dashboard",
    element: (<PrivateRoute><DashboardLayout/></PrivateRoute>),
    children: [
      {
      index: true,
      element: (<PrivateRoute><Statistics/></PrivateRoute>),
      },
      {
        path: "profile",
        element: (<PrivateRoute><Profile/></PrivateRoute>),
      },
      {
        path: "my-loans",
        element: (<PrivateRoute><BorrowerRoute><MyLoans/></BorrowerRoute></PrivateRoute>),
      },
       {
        path: "add-loan",
        element: (<PrivateRoute><ManagerRoute><AddLoan/></ManagerRoute></PrivateRoute>),
        },
       {
        path: "update-loan/:id",
        element: <UpdateLoans/>,
        },
       {
        path: "manage-loans",
         element: (<PrivateRoute><ManagerRoute><ManageLoans/></ManagerRoute></PrivateRoute>),
        },
       {
        path: "pending-loans",
       element: (<PrivateRoute><ManagerRoute><PendingLoans/></ManagerRoute></PrivateRoute>)
        },
       {
        path: "approved-loans",
        element: (<PrivateRoute><ManagerRoute><ApprovedLoans/></ManagerRoute></PrivateRoute>),
        },
       {
        path: "loan-applications",
        element: (<PrivateRoute><AdminRoute><LoanApplication/></AdminRoute></PrivateRoute>),
     },
       {
        path: "all-loan",
        element: (<PrivateRoute><AdminRoute><AllLoan/></AdminRoute></PrivateRoute>),
       },
       {
        path: "manage-users",
        element: (<PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>),
       },
    ]}

]);
