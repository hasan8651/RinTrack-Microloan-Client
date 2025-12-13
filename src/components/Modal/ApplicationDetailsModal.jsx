import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";

const ApplicationDetailsModal = ({ isOpen, closeModal, myLoan }) => {
  if (!myLoan) return null;

  const statusColor =
    myLoan.status === "Approved"
      ? "bg-green-500"
      : myLoan.status === "Pending"
      ? "bg-yellow-500"
      : myLoan.status === "Rejected"
      ? "bg-red-500"
      : "bg-gray-400";

  const feeColor =
    myLoan.applicationFeeStatus === "Paid"
      ? "bg-emerald-500"
      : myLoan.applicationFeeStatus === "Unpaid"
      ? "bg-orange-500"
      : "bg-gray-400";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95 translate-y-2"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-2"
            >
              <DialogPanel
                className="w-full max-w-2xl rounded-2xl bg-base-100 dark:bg-neutral-900/95 
                           border border-gray-200 dark:border-blue-400/30 
                           shadow-2xl p-6 md:p-7 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 md:mb-5 border-b border-gray-200 dark:border-neutral-800 pb-3">
                  <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Loan & Application Details
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                  {/* Loan info */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Loan Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                      <p>
                        <span className="font-semibold">Loan Title:</span>{" "}
                        {myLoan.loanTitle}
                      </p>
                      <p>
                        <span className="font-semibold">Loan ID:</span>{" "}
                        {myLoan.loanId}
                      </p>
                      <p>
                        <span className="font-semibold">Category:</span>{" "}
                        {myLoan.loanCategory}
                      </p>
                      <p>
                        <span className="font-semibold">Amount:</span> $
                        {myLoan.loanAmount}
                      </p>
                      <p>
                        <span className="font-semibold">Interest Rate:</span>{" "}
                        {myLoan.interestRate}%
                      </p>
                    </div>
                  </div>

                  {/* Borrower info */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Borrower Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {myLoan.firstName} {myLoan.lastName}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {myLoan.userEmail}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {myLoan.phone}
                      </p>
                      <p>
                        <span className="font-semibold">NID/Passport:</span>{" "}
                        {myLoan.nidOrPassport}
                      </p>
                      <p className="md:col-span-2">
                        <span className="font-semibold">Address:</span>{" "}
                        {myLoan.address}
                      </p>
                    </div>
                  </div>

                  {/* Financial info */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Financial Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                      <p>
                        <span className="font-semibold">Income Source:</span>{" "}
                        {myLoan.incomeSource}
                      </p>
                      <p>
                        <span className="font-semibold">Monthly Income:</span>{" "}
                        ${myLoan.monthlyIncome}
                      </p>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                      Additional Details
                    </h3>
                    <p>
                      <span className="font-semibold">Reason:</span>{" "}
                      {myLoan.reason}
                    </p>
                    {myLoan.notes && (
                      <p className="mt-1">
                        <span className="font-semibold">Notes:</span>{" "}
                        {myLoan.notes}
                      </p>
                    )}
                  </div>

                  {/* Status & payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}
                      >
                        {myLoan.status}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">
                        Application Fee Status:
                      </span>
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium text-white ${feeColor}`}
                      >
                        {myLoan.applicationFeeStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                               bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 
                               text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ApplicationDetailsModal;