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

const BorrowerStatistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myLoans = [], isLoading } = useQuery({
    queryKey: ["my-loans", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-loans/${user?.email}`);
      return result.data;
    },
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
    <div>
      <h1 className="text-2xl font-bold mb-6">My Loan Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p className="text-gray-500">Total Loans</p>
            <h2 className="text-xl font-bold">{totalLoans}</h2>
          </div>
          <FaFileInvoiceDollar className="text-3xl text-blue-500" />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p className="text-gray-500">Pending Loans</p>
            <h2 className="text-xl font-bold">{totalPending}</h2>
          </div>
          <FaHourglassHalf className="text-3xl text-yellow-500" />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p className="text-gray-500">Approved Loans</p>
            <h2 className="text-xl font-bold">{totalApproved}</h2>
          </div>
          <FaCheckCircle className="text-3xl text-green-500" />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p className="text-gray-500">Paid Fees</p>
            <h2 className="text-xl font-bold">{totalPaid}</h2>
          </div>
          <FaCheckCircle className="text-3xl text-purple-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Loan & Payment Status</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BorrowerStatistics;
