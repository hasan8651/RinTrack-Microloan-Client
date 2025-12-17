import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import AllApplicationDataRow from "../../../components/Dashboard/TableRows/AllApplicationDataRow";
import { Helmet } from "react-helmet-async";

const statusOptions = ["All", "Pending", "Approved", "Rejected"];

const LoanApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("All");

  const {
    data: allLoans = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const result = await axiosSecure.get("/loan-applications");
      return result.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const filteredLoans =
    statusFilter === "All"
      ? allLoans
      : allLoans.filter((loan) => loan.status === statusFilter);

  return (
    <div className="min-h-screen transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | Loan Application</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
           <div className="flex flex-col mt-6 md:mt-0 gap-3 mb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Loan Applications
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View and manage all submitted loan applications.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            {isFetching && (
              <span className="text-xs text-blue-500 dark:text-blue-400">
                Updating...
              </span>
            )}

            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-colors cursor-pointer ${
                    statusFilter === status
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-orange-50 dark:bg-neutral-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isError && (
          <p className="mb-4 text-sm text-red-500">
            Failed to load loan applications: {error?.message || "Unknown error"}
          </p>
        )}

        <div className=" border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-orange-100 dark:bg-neutral-800/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User (Email, Name)
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Loan Category
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-orange-50 dark:bg-neutral-900/90 divide-y divide-gray-200 dark:divide-neutral-800">
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <AllApplicationDataRow
                      key={loan._id}
                      loan={loan}
                      refetch={refetch}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No loan applications found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;