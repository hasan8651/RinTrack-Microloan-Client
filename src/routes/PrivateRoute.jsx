import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading: isUserLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (loading || isUserLoading) return <LoadingSpinner />;

  if (userInfo?.status === "suspended") return <Navigate to="/suspended" />;

  if (!user) return <Navigate state={location.pathname} to="/login" />;

  return children;
};

export default PrivateRoute;
