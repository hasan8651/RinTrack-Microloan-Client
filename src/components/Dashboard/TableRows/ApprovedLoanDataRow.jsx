import { useState } from "react";
import { FaEye } from "react-icons/fa";
import ApplicationDetailsModal from "../../Modal/ApplicationDetailsModal";

const ApprovedLoanDataRow = ({ loan }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleView = () => setIsViewOpen(true);

  const actionBtnBase =
    "inline-flex items-center justify-center gap-1 px-3 py-1.5 " +
    "rounded-lg text-xs md:text-sm font-medium w-24 transition-colors";

  return (
    <tr className="border-b border-gray-200 dark:border-neutral-800">
      {/* Loan ID */}
      <td className="px-5 py-4 text-left text-sm text-gray-800 dark:text-gray-100">
        {loan.loanId}
      </td>

      {/* User Info */}
      <td className="px-5 py-4 text-left text-sm">
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          {loan.firstName} {loan.lastName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {loan.userEmail}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        ${loan.loanAmount}
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        {new Date(loan.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-5 py-4 text-right text-sm">
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={handleView}
            className={`${actionBtnBase} bg-blue-600 text-white hover:bg-blue-700`}
          >
            <span className="md:hidden flex items-center justify-center">
              <FaEye className="w-4 h-4" />
            </span>
            <span className="hidden md:inline">View</span>
          </button>
        </div>

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

export default ApprovedLoanDataRow;