import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { showAlert } from "../../../utils";

const ManageLoanDataRow = ({ loan, refetch, variants, adminView = false }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await axiosSecure.delete(`/loans/${id}`);

        if (res.data?.deletedCount > 0) {
          showAlert({
            color: "lime",
            icon: "success",
            title: "Loan deleted successfully.",
          });
          refetch && refetch();
        }
      } catch (err) {
        console.error("Error deleting loan:", err);
        showAlert({
          color: "pink",
          icon: "error",
          title: "Failed to delete loan. Try again.",
          text: err.response?.data?.message || err.message,
        });
      }
    });
  };

  const handleToggleShowOnHome = async () => {
    const newValue = !loan.showOnHome;

    try {
      const res = await axiosSecure.patch(`/loans/${loan._id}`, {
        showOnHome: newValue,
      });

      if (res.data?.modifiedCount > 0 || res.data?.acknowledged) {
        showAlert({
          color: "lime",
          icon: "success",
          title: newValue
            ? "Loan will appear on the Home page."
            : "Loan removed from Home page.",
        });
        refetch && refetch();
      }
    } catch (err) {
      console.error("Toggle showOnHome error:", err);
      showAlert({
        color: "pink",
        icon: "error",
        title: "Failed to update Home visibility.",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  const actionBtnBase =
    "inline-flex items-center justify-center gap-0 md:gap-1 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium w-9 md:w-20 transition-colors";

  return (
    <motion.tr
      className="border-b border-gray-200 dark:border-neutral-800"
      variants={variants}
    >
      <td className="px-5 py-4 text-left">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-neutral-700"
        />
      </td>

      <td className="px-5 py-4 text-left text-sm font-medium text-gray-800 dark:text-gray-100">
        {loan.title}
      </td>

      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        {loan.interestRate}%
      </td>

      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        {loan.category}
      </td>

      {adminView && (
        <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
          {loan.createdBy || "N/A"}
        </td>
      )}

      {adminView && (
        <td className="px-5 py-4 text-center text-sm">
          <button
            type="button"
            onClick={handleToggleShowOnHome}
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              loan.showOnHome
                ? "bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40"
                : "bg-gray-50 text-gray-500 border-gray-300 dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700"
            }`}
          >
            {loan.showOnHome ? "Visible" : "Hidden"}
          </button>
        </td>
      )}

      <td className="px-5 py-4 text-right text-sm">
        <div className="flex md:flex-wrap justify-end items-center gap-2">
          <Link
            to={`/dashboard/update-loan/${loan._id}`}
            className={`${actionBtnBase} bg-blue-600 text-white hover:bg-blue-700`}
          >
            <span className="md:hidden flex items-center justify-center">
              <FaEdit className="w-4 h-4" />
            </span>
            <span className="hidden md:inline">Update</span>
          </Link>

          <button
            onClick={() => handleDelete(loan._id)}
            className={`${actionBtnBase} bg-red-600 text-white hover:bg-red-700 cursor-pointer`}
          >
            <span className="md:hidden flex items-center justify-center">
              <FaTrash className="w-4 h-4" />
            </span>
            <span className="hidden md:inline">Delete</span>
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default ManageLoanDataRow;
