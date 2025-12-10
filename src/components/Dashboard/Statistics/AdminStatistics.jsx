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

const AdminStatistics = () => {
  const { data: allLoans = [], isLoading } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/loan-applications/statistic`
      );
      return result.data;
    },
  });
  console.log(allLoans);

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

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-6 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-5 text-center">
          <FaHandHoldingUsd className="mx-auto text-blue-500 mb-2" size={30} />
          <h2 className="text-xl font-semibold text-gray-700">Active Loans</h2>
          <p className="text-3xl font-bold text-green-600">{totalApproved}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <FaFileInvoiceDollar
            className="mx-auto text-yellow-500 mb-2"
            size={30}
          />
          <h2 className="text-xl font-semibold text-gray-700">Pending Loans</h2>
          <p className="text-3xl font-bold text-yellow-500">{totalPending}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <FaUserFriends className="mx-auto text-purple-500 mb-2" size={30} />
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Loan Status
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
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
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
