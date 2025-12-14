import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentDetailsModal from "../../Modal/PaymentDetailsModal";
import ApplicationDetailsModal from "../../Modal/ApplicationDetailsModal";

const BorrowerAppliedDataRow = ({ myLoan, refetch }) => {
  const [isOpen, setIsOpen] = useState(false); // payment details
  const [isViewOpen, setIsViewOpen] = useState(false); // application details
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const actionBtnBase =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-lg " +
    "text-xs md:text-sm font-medium transition-colors";

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        loanApplicationId: myLoan._id,
        loanTitle: myLoan.loanTitle,
        quantity: 1,
        image: myLoan.image,
        loanAmount: myLoan.loanAmount,
        loanCategory: myLoan.loanCategory,
        amount: 10,
        currency: "usd",
        borrower: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const { data } = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      window.location.href = data.url;
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment initiation failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const handleCancelLoan = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can cancel only pending loan applications.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await axiosSecure.delete(`/loan-application/${myLoan._id}`);

        Swal.fire({
          position: "top-end",
          background:
            "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "success",
          title: "Your loan request has been cancelled.",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch && refetch();
      } catch (error) {
        console.error("Cancel loan error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to cancel loan",
          text: error.response?.data?.message || error.message,
        });
      }
    });
  };

  const statusColor =
    myLoan.status === "Pending"
      ? "bg-amber-500"
      : myLoan.status === "Approved"
      ? "bg-emerald-500"
      : myLoan.status === "Rejected"
      ? "bg-red-500"
      : "bg-gray-400";

  return (
    <tr className="border-b border-gray-200 dark:border-neutral-800">
      {/* Loan ID */}
      <td className="px-5 py-4 text-left text-sm text-gray-800 dark:text-gray-100">
        {myLoan.loanId}
      </td>

      {/* Loan Info */}
      <td className="px-5 py-4 text-left text-sm">
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          {myLoan.loanTitle}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {myLoan.loanCategory}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        ${myLoan.loanAmount}
      </td>

      {/* Status */}
      <td className="px-5 py-4 text-left text-sm">
        <span
          className={`inline-flex items-center justify-center px-3 py-1 rounded-full 
                      text-xs font-medium text-white ${statusColor}`}
        >
          {myLoan.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4 text-right text-sm">
        <div className="flex justify-end items-center gap-2">
          {/* View Details */}
          <button
            onClick={() => setIsViewOpen(true)}
            className={`${actionBtnBase} bg-blue-600 text-white hover:bg-blue-700`}
          >
            View Details
          </button>

          {/* Cancel (only Pending) */}
          {myLoan.status === "Pending" && (
            <button
              onClick={handleCancelLoan}
              className={`${actionBtnBase} bg-red-600 text-white hover:bg-red-700`}
            >
              Cancel
            </button>
          )}

          {/* Payment / Paid */}
          {myLoan.applicationFeeStatus === "Unpaid" ? (
            <button
              onClick={handlePayment}
              className={`${actionBtnBase} bg-lime-600 text-white hover:bg-lime-700`}
            >
              Pay $10 Fee
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className={`${actionBtnBase} bg-emerald-600 text-white hover:bg-emerald-700`}
            >
              Paid
            </button>
          )}
        </div>

        {/* Modals */}
        {isViewOpen && (
          <ApplicationDetailsModal
            myLoan={myLoan}
            isOpen={isViewOpen}
            closeModal={() => setIsViewOpen(false)}
          />
        )}

        {isOpen && (
          <PaymentDetailsModal
            myLoan={myLoan}
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
          />
        )}
      </td>
    </tr>
  );
};

export default BorrowerAppliedDataRow;