import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageLoanDataRow = ({ loan, refetch }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${import.meta.env.VITE_API_URL}/loans/${id}`
          );

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Loan has been successfully deleted.",
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
            refetch();
          }
        } catch (err) {
          console.error("Error:", err);
                  Swal.fire({
                  icon: "error",
                  title: "Failed to delete loan. Try again.",
                  text: err.response?.data?.message || err.message,
                });
        }
      }
    });
  };

  return (
    <tr className="border-b">
      <td className="px-5 py-4 bg-white text-sm text-center">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-12 h-12 object-cover rounded"
        />
      </td>

      <td className="px-5 py-4 bg-white text-sm font-medium text-center">
        {loan.title}
      </td>

      <td className="px-5 py-4 bg-white text-sm text-center">
        {loan.interestRate}%
      </td>

      <td className="px-5 py-4 bg-white text-sm text-center">
        {loan.category}
      </td>

      <td className="px-5 py-4 bg-white text-sm text-center">
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`/update-loan/${loan._id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </Link>

          <button
            onClick={() => handleDelete(loan._id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageLoanDataRow;
