import { useQuery } from "@tanstack/react-query";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const BorrowerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myLoans = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-loans/${user?.email}`);
      return result.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const totalLoans = myLoans.length;
  const totalPending = myLoans.filter(
    (loan) => loan.status === "Pending"
  ).length;
  const totalApproved = myLoans.filter(
    (loan) => loan.status === "Approved"
  ).length;
  const totalPaid = myLoans.filter(
    (loan) => loan.applicationFeeStatus === "Paid"
  ).length;
  const totalUnpaid = myLoans.filter(
    (loan) => loan.applicationFeeStatus === "Unpaid"
  ).length;

  const chartData = [
    { name: "Pending", count: totalPending },
    { name: "Approved", count: totalApproved },
    { name: "Paid", count: totalPaid },
    { name: "Unpaid", count: totalUnpaid },
  ];

  return (
    <div className="p-6 md:p-8 min-h-screen font-sans bg-orange-50 dark:bg-transparent transition-colors duration-300">
      <Helmet>
                    <title>RinTrack | Borrower Dashboard</title>
                  </Helmet>

      <h1 className="mt-6 md:mt-0 text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">
        My Loan Overview
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Summary of your loan applications, statuses, and payment activity.
      </p>

      {isFetching && (
        <p className="mb-4 text-xs text-blue-500 dark:text-blue-400">
          Updating your statistics...
        </p>
      )}

      {isError && (
        <p className="mb-4 text-sm text-red-500">
          Failed to load your loan statistics: {error?.message || "Unknown error"}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-blue-400/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Total Loans
              </p>
              <p className="text-3xl font-extrabold text-blue-500">
                {totalLoans}
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FaFileInvoiceDollar size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            All loan applications you have submitted.
          </p>
        </div>

        <div className="bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-amber-400/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Pending Loans
              </p>
              <p className="text-3xl font-extrabold text-amber-500">
                {totalPending}
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <FaHourglassHalf size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Applications waiting for review or approval.
          </p>
        </div>

            <div className="bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-emerald-400/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Approved Loans
              </p>
              <p className="text-3xl font-extrabold text-emerald-500">
                {totalApproved}
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FaCheckCircle size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Loans that have been successfully approved.
          </p>
        </div>

         <div className="bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-purple-400/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Paid Fees
              </p>
              <p className="text-3xl font-extrabold text-purple-500">
                {totalPaid}
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FaCheckCircle size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Loan application fees you have already paid.
          </p>
        </div>
      </div>

      <div className="bg-orange-100 dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-blue-400/20 p-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Loan & Payment Status
        </h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={{ stroke: "#E5E7EB" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  borderRadius: "0.5rem",
                  border: "1px solid #374151",
                  color: "#F9FAFB",
                }}
                itemStyle={{ color: "#F9FAFB" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BorrowerStatistics;