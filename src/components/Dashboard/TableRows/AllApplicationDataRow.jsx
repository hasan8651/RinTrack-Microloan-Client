import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import ApplicationDetailsModal from "../../Modal/ApplicationDetailsModal";

const AllApplicationDataRow = ({ loan }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleView = () => setIsViewOpen(true);

  const actionBtnBase =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-lg " +
    "text-xs md:text-sm font-medium transition-colors";

  const getStatusConfig = (status) => {
    switch (status) {
      case "Approved":
        return {
          color: "bg-green-500",
          Icon: FaCheckCircle,
          label: "Approved",
        };
      case "Pending":
        return {
          color: "bg-yellow-500",
          Icon: FaClock,
          label: "Pending",
        };
      case "Rejected":
        return {
          color: "bg-red-500",
          Icon: FaTimesCircle,
          label: "Rejected",
        };
      default:
        return {
          color: "bg-gray-400",
          Icon: FaQuestionCircle,
          label: status || "Unknown",
        };
    }
  };

  const { color, Icon, label } = getStatusConfig(loan.status);

  return (
    <tr className="border-b border-gray-200 dark:border-neutral-800">
      {/* Loan ID */}
      <td className="px-5 py-4 text-left text-sm text-gray-800 dark:text-gray-100">
        {loan.loanId}
      </td>

      {/* User Info */}
      <td className="px-5 py-4 text-left text-sm">
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          {loan.userEmail}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {loan.firstName} {loan.lastName}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        ${loan.loanAmount}
      </td>

      {/* Status */}
      <td className="px-5 py-4 text-left text-sm">
        <span
          className={`inline-flex items-center justify-center gap-1 rounded-full 
                      text-xs font-medium text-white w-28 h-7 md:h-8 ${color}`}
        >
          {/* Icon only on small screens */}
          <span className="md:hidden flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </span>

          {/* Text on md+ */}
          <span className="hidden md:inline">{label}</span>
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4 text-right text-sm">
        <button
          onClick={handleView}
          className={`${actionBtnBase} bg-blue-600 text-white hover:bg-blue-700`}
        >
          View Details
        </button>

        {isViewOpen && (
          <ApplicationDetailsModal
            myLoan={loan}
            isOpen={isViewOpen}
            closeModal={() => setIsViewOpen(false)}
          />
        )}
      </td>
    </tr>
  );
};

export default AllApplicationDataRow;