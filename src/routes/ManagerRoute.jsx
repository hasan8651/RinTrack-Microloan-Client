import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const ManagerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "manager" || role === "admin") return children;
  return <Navigate to="/" replace="true" />;
};

export default ManagerRoute;