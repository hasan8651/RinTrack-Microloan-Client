import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Suspended = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: suspendInfo = {} } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center  dark:from-neutral-900 dark:to-neutral-800 px-6 py-16 text-base-content transition-colors duration-500">
      <div className="max-w-3xl w-full bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl border border-red-200 dark:border-neutral-700 rounded-3xl shadow-2xl p-10 text-center animate-fadeIn">
        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-500/20 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-red-600 dark:text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-red-400 mb-4">
          Your Account Has Been Suspended
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          You no longer have access to your dashboard features. Your account was
          suspended due to the following reason:
        </p>

        <div className="bg-red-50 dark:bg-neutral-800 border border-red-200 dark:border-neutral-700 rounded-xl p-6 text-left shadow-inner mb-8">
          <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
            Suspension Reason
          </h3>
          <p className="text-gray-800 dark:text-gray-300 text-lg">
            {suspendInfo?.suspendReason || "No reason provided"}
          </p>

          <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mt-6 mb-2">
            Feedback
          </h3>
          <p className="text-gray-800 dark:text-gray-300 text-lg">
            {suspendInfo?.feedback || "No feedback provided"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition shadow-lg hover:scale-[1.03]"
          >
            Go to Home
          </button>
          <Link
            to="/contact-us"
            className="px-8 py-3 rounded-xl font-semibold border-2 border-red-400 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-neutral-800 transition shadow-md"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Suspended;
