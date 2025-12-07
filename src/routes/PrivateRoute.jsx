import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
