import { useQuery } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaCalendarCheck,
  FaSignInAlt,
  FaUserTag,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import EditProfileModal from "../../../components/Modal/EditProfileModal";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    data: profileInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { name, email, image, role, created_at, last_loggedIn } = profileInfo;

  const safeDateTime = (value) =>
    value ? new Date(value).toLocaleString() : "N/A";

  const displayName = name || user?.displayName || "User";
  const displayEmail = email || user?.email || "Not available";
  const avatar =
    image || user?.photoURL || "https://img.icons8.com/windows/64/user.png";

  return (
    <div className="min-h-screen transition-colors duration-300 p-4 md:p-8 flex items-start md:items-center justify-center">
      <Helmet>
        <title>RinTrack | User Profile</title>
      </Helmet>
      <div className="w-full max-w-4xl bg-orange-100 dark:bg-neutral-900/95 border border-gray-200 dark:border-blue-400/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-32 md:h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0">
            <img
              src={avatar}
              alt={`${displayName}'s profile`}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-neutral-900 object-cover shadow-xl"
            />
          </div>
        </div>

        <div className="pt-20 md:pt-10 pb-8 px-6 md:px-8">
          <div className="md:ml-40 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              {displayName}
            </h2>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs md:text-sm font-semibold rounded-full uppercase tracking-wider
                ${
                  role === "admin"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : role === "manager"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }
              `}
            >
              {role || "User"}
            </span>
            <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl">
              Welcome to your profile dashboard. Here you can see your account
              details and recent activity.
            </p>
          </div>

          <hr className="my-6 border-gray-200 dark:border-neutral-800" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Email Address
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold break-all">
                  {displayEmail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FaCalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Account Created
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold">
                  {safeDateTime(created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <FaSignInAlt className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Last Logged In
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold">
                  {safeDateTime(last_loggedIn)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <FaUserTag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  User Role
                </p>
                <p className="mt-1 text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold capitalize">
                  {role || "user"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:justify-end gap-3 px-6 md:px-8 pb-4">
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-500 to-sky-600 
                       hover:from-blue-600 hover:to-sky-700 
                       shadow-md shadow-blue-500/30 transition-colors cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <EditProfileModal
          key={profileInfo?.email}
          isOpen={isEditOpen}
          closeModal={() => setIsEditOpen(false)}
          profileInfo={profileInfo}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default Profile;
