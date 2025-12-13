import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaUserFriends,
  FaFileInvoiceDollar,
  FaHandHoldingUsd,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const ManagerStatistics = () => {
  const { data: allLoans = [], isLoading } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/loan-applications`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalApproved = allLoans.filter(
    (loan) => loan.status === "Approved"
  ).length;
  const totalPending = allLoans.filter(
    (loan) => loan.status === "Pending"
  ).length;
  const totalUsers = new Set(allLoans.map((loan) => loan.userEmail)).size;

  const barData = [
    { name: "Approved", count: totalApproved },
    { name: "Pending", count: totalPending },
  ];

  const totalPaid = allLoans.filter(
    (loan) => loan.applicationFeeStatus === "Paid"
  ).length;
  const totalUnpaid = allLoans.filter(
    (loan) => loan.applicationFeeStatus === "Unpaid"
  ).length;

  const pieData = [
    { name: "Paid", value: totalPaid },
    { name: "Unpaid", value: totalUnpaid },
  ];

  const COLORS = ["#22C55E", "#F97316"];

  return (
    <div className="p-6 md:p-8 min-h-screen font-sans bg-base-100 dark:bg-neutral-900 transition-colors duration-300">
      <h1 className="mt-6 md:mt-0 text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">
        Manager Dashboard
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Manage of loan activity and Overview users, applications and payment status.
      </p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Active Loans */}
        <div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-blue-400/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Active Loans
              </p>
              <p className="text-3xl font-extrabold text-green-500">
                {totalApproved}
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">
              <FaHandHoldingUsd size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Loans that have been approved and are currently active.
          </p>
        </div>

        {/* Pending Loans */}
        <div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-amber-400/20 p-5">
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
              <FaFileInvoiceDollar size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Loan applications waiting for review or approval.
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-purple-400/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Total Users
              </p>
              <p className="text-3xl font-extrabold text-blue-500">
                {totalUsers}
              </p>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FaUserFriends size={22} />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Unique users who have submitted loan applications.
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Status Bar Chart */}
        <div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-blue-400/20 p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Loan Status
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9CA3AF" }} // gray-400
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

        {/* Payment Status Pie Chart */}
        <div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-emerald-400/20 p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Payment Status
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "0.5rem",
                    border: "1px solid #374151",
                    color: "#F9FAFB",
                  }}
                  itemStyle={{ color: "#F9FAFB" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
              <span>Paid ({totalPaid})</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="inline-block w-3 h-3 rounded-full bg-orange-500" />
              <span>Unpaid ({totalUnpaid})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerStatistics;