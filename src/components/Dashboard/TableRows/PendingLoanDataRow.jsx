import { useState } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ApplicationDetailsModal from "../../Modal/ApplicationDetailsModal";

const PendingLoanDataRow = ({ loan, refetch }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (status) => {
    try {
      const res = await axiosSecure.patch(`/update-status/${loan._id}`, {
        status,
      });

      if (res.data?.modifiedCount > 0 || res.data?.acknowledged) {
        Swal.fire({
          position: "top-end",
          background:
            "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "success",
          title:
            status === "Approved"
              ? "Loan approved successfully."
              : "Loan rejected successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch && refetch();
      }
    } catch (err) {
      console.error("Update status error:", err);
      Swal.fire({
        position: "top-end",
        background:
          "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: "Failed to update status. Try again.",
        text: err.response?.data?.message || err.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleApprove = () => updateStatus("Approved");
  const handleReject = () => updateStatus("Rejected");
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
            onClick={handleApprove}
            className={`${actionBtnBase} bg-emerald-600 text-white hover:bg-emerald-700`}
          >
            <span className="md:hidden flex items-center justify-center">
              <FaCheck className="w-4 h-4" />
            </span>
            <span className="hidden md:inline">Approve</span>
          </button>

          <button
            onClick={handleReject}
            className={`${actionBtnBase} bg-red-600 text-white hover:bg-red-700`}
          >
            <span className="md:hidden flex items-center justify-center">
              <FaTimes className="w-4 h-4" />
            </span>
            <span className="hidden md:inline">Reject</span>
          </button>

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

export default PendingLoanDataRow;