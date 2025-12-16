import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ApprovedLoanDataRow from "../../../components/Dashboard/TableRows/ApprovedLoanDataRow";
import { Helmet } from "react-helmet-async";

const ApprovedLoans = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: approvedLoans = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["approved-loans"],
    queryFn: async () => {
      const result = await axiosSecure.get("/approved-loans");
      return result.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-transparent transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | Approved Loans</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mt-6 md:mt-0 sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Approved Loan Applications
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View all loan applications that have been approved.
            </p>
          </div>
          {isFetching && (
            <span className="text-xs text-blue-500 dark:text-blue-400">
              Updating...
            </span>
          )}
        </div>

        {isError && (
          <p className="mb-4 text-sm text-red-500">
            Failed to load approved loans: {error?.message || "Unknown error"}
          </p>
        )}

        <div className="bg-orange-50 dark:bg-neutral-900/90 border border-blue-400/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-orange-100 dark:bg-neutral-800/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User Info
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Approved Date
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-orange-50 dark:bg-neutral-900/90 divide-y divide-gray-200 dark:divide-neutral-800">
                {approvedLoans.length > 0 ? (
                  approvedLoans.map((loan) => (
                    <ApprovedLoanDataRow
                      key={loan._id}
                      loan={loan}
                      refetch={refetch}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No approved loan applications found.
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

export default ApprovedLoans;
