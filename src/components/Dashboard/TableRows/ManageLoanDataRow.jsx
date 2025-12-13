import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageLoanDataRow = ({ loan, refetch, variants }) => {
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
          Swal.fire({
            position: "top-end",
            background:
              "linear-gradient(to right, #093371, #6E11B0, #093371)",
            color: "white",
            icon: "success",
            title: "Loan deleted successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch && refetch();
        }
      } catch (err) {
        console.error("Error deleting loan:", err);
        Swal.fire({
          position: "top-end",
          background:
            "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          icon: "error",
          title: "Failed to delete loan. Try again.",
          text: err.response?.data?.message || err.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const actionBtnBase =
    "inline-flex items-center justify-center gap-1 px-3 py-1.5 " +
    "rounded-lg text-xs md:text-sm font-medium w-24 transition-colors";

  return (
    <motion.tr
      className="border-b border-gray-200 dark:border-neutral-800"
      variants={variants}
    >
      {/* Image */}
      <td className="px-5 py-4 text-left">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-neutral-700"
        />
      </td>

      {/* Title */}
      <td className="px-5 py-4 text-left text-sm font-medium text-gray-800 dark:text-gray-100">
        {loan.title}
      </td>

      {/* Interest */}
      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        {loan.interestRate}%
      </td>

      {/* Category */}
      <td className="px-5 py-4 text-left text-sm text-gray-700 dark:text-gray-300">
        {loan.category}
      </td>

      {/* Actions */}
      <td className="px-5 py-4 text-right text-sm">
        <div className="flex justify-end items-center gap-2">
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
            className={`${actionBtnBase} bg-red-600 text-white hover:bg-red-700`}
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