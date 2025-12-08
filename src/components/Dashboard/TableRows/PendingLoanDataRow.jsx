import { useState } from "react";
import axios from "axios";
import ApplicationDetailsModal from "../../Modal/ApplicationDetailsModal";

const PendingLoanDataRow = ({ loan, refetch }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const updateStatus = (status) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/update-status/${loan._id}`, {
        status,
      })
      .then((res) => console.log(res));
  };

  const handleApprove = () => {
    updateStatus("Approved");
    refetch();
  };
  const handleReject = () => {
    updateStatus("Rejected");
    refetch();
  };
  const handleView = () => {
    console.log("click");
    setIsViewOpen(true);
  };
  return (
    <tr>
      {/* Loan ID */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>{loan.loanId}</p>
      </td>

      {/* Loan Info (User Email & Name) */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p className="font-semibold">{loan.userEmail}</p>
        <p className="text-gray-600 text-sm">
          {loan.firstName} {loan.lastName}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>${loan.loanAmount}</p>
      </td>

      {/* Date */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>{new Date(loan.createdAt).toLocaleDateString()}</p>
      </td>


      <td className="px-5 py-5 border-b bg-white text-sm space-x-2">
        {/* 1. Approve Button */}
        <button
          onClick={handleApprove}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition duration-150"
        >
          Approve
        </button>

        {/* 2. Reject Button */}
        <button
          onClick={handleReject}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition duration-150"
        >
          Reject
        </button>

        {/* 3. View Button */}
        <button
          onClick={handleView}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition duration-150"
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

export default PendingLoanDataRow;
