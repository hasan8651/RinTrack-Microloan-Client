import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ManageLoanDataRow from "../../../components/Dashboard/TableRows/ManageLoanDataRow";

const AllLoan = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allLoans = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axiosSecure.get("/loans");
      return result.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-neutral-900 transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              All Loans
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View and manage all loan products in the system.
            </p>
          </div>
          {isFetching && (
            <span className="text-xs text-blue-500 dark:text-blue-400">
              Updating...
            </span>
          )}
        </div>

        {/* Error message */}
        {isError && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/40 rounded-xl px-4 py-2">
            Failed to load loans: {error?.message || "Unknown error"}
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white dark:bg-neutral-900/90 border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-gray-50 dark:bg-neutral-800/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Show on Home
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <motion.tbody
                className="bg-white dark:bg-neutral-900/90 divide-y divide-gray-200 dark:divide-neutral-800"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {allLoans.length > 0 ? (
                  allLoans.map((loan) => (
                    <ManageLoanDataRow
                      key={loan._id}
                      loan={loan}
                      refetch={refetch}
                      variants={cardVariants}
                      adminView  // <- NEW: tells the row to render admin columns
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No loans found.
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLoan;