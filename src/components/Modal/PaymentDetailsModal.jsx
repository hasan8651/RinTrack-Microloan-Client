import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

const PaymentDetailsModal = ({ isOpen, closeModal, myLoan }) => {
  if (!myLoan) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Payment Details
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Loan Title:</span>{" "}
                    {myLoan.loanTitle}
                  </p>
                  <p>
                    <span className="font-semibold">Loan ID:</span>{" "}
                    {myLoan.loanId}
                  </p>
                  <p>
                    <span className="font-semibold">Borrower Email:</span>{" "}
                    {myLoan.userEmail || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {myLoan.applicationFeeStatus}
                  </p>
                  <p>
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {myLoan.stripePaymentId || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Amount Paid:</span> $10
                  </p>
                  <p>
                    <span className="font-semibold">Paid At:</span>{" "}
                    {myLoan.paidAt
                      ? new Date(myLoan.paidAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
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

export default PaymentDetailsModal;
