import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import BorrowerAppliedDataRow from "../../../components/Dashboard/TableRows/BorrowerAppliedDataRow";
import { Helmet } from "react-helmet-async";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myLoans = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["my-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-loans/${user?.email}`);
      return result.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      refetch();
      window.history.replaceState({}, document.title, "/dashboard/my-loans");
    }
  }, [refetch]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-base-100 dark:bg-neutral-900 transition-colors duration-300 p-4 md:p-8">
      <Helmet>
        <title>RinTrack | My Loans</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mt-6 md:mt-0 sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              My Loans
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track your loan applications, status, and payment progress.
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
            Failed to load loans: {error?.message || "Unknown error"}
          </p>
        )}

          <div className="bg-orange-50 dark:bg-neutral-900/90 border border-gray-200 dark:border-blue-400/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 text-sm">
              <thead className="bg-orange-100 dark:bg-neutral-800/80">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Loan ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Loan Info
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-neutral-900/90 divide-y divide-gray-200 dark:divide-neutral-800">
                {myLoans.length > 0 ? (
                  myLoans.map((myLoan) => (
                    <BorrowerAppliedDataRow
                      key={myLoan._id}
                      myLoan={myLoan}
                      refetch={refetch}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      You have not applied for any loans yet.
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

export default MyLoans;
