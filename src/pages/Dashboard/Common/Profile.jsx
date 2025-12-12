import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: profileInfo = {},
    isLoading,
     } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const result = await axiosSecure.get(`/users/${user.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner/>

 const { name, email, image, role, created_at, last_loggedIn } = profileInfo;

  return (
    <div className="min-h-screen flex justify-center items-center py-12 px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500">
            <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-6">
                 <div className="relative -mb-20">
              <img
                src={
                  image ||
                  user?.photoURL ||
                  "https://img.icons8.com/windows/64/user.png"
                }
                alt={`${name}'s profile`}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
              />
            </div>
          </div>
    
        <div className="p-6 pt-20 sm:p-8 sm:pt-20">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {name}
          </h2>

          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full uppercase ${
              role === "admin"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            } tracking-wider`}
          >
            {role}
          </span>

          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
            Welcome to your profile dashboard. Here you can see all your registered details.
          </p>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
              <i className="fas fa-envelope text-primary text-xl dark:text-white"></i>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  {email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <i className="fas fa-calendar-check text-primary text-xl dark:text-white"></i>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Account Created
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  {new Date(created_at).toLocaleDateString()}
                  {" | "}
                  {new Date(created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <i className="fas fa-sign-in-alt text-primary text-xl dark:text-white"></i>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Logged In
                </p>
        
                  <p className="text-gray-700 dark:text-gray-200 font-semibold">
                    {new Date(last_loggedIn).toLocaleDateString()}
                    {" | "}
                    {new Date(last_loggedIn).toLocaleTimeString()}
                  </p>
          
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <i className="fas fa-user-tag text-primary text-xl dark:text-white"></i>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  User Role
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold capitalize">
                  {role}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              // onClick={() => console.log('Edit Profile Clicked') will fix by hasan}
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
