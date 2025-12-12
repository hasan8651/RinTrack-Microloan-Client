import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserSuspendModal = ({ isOpen, closeModal, user, refetch }) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleSuspend = async () => {
    if (!reason || !feedback) {
      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: "Please fill out both fields",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const suspendInfo = {
      reason,
      feedback,
      status: "suspended",
      suspendedAt: new Date(),
    };

    try {
      await axiosSecure.patch(`/users/suspend/${user?._id}`, suspendInfo);

      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "success",
        title: "User suspended successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch && refetch();
      closeModal();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Failed to suspend user. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
                className="w-full max-w-lg rounded-2xl bg-base-100 dark:bg-neutral-900/95 
                           border border-gray-200 dark:border-red-400/30 
                           shadow-2xl p-6 md:p-7 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-neutral-800 pb-3 mb-4">
                  <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Suspend User
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* User info */}
                <div className="mb-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p>
                    <span className="font-semibold">Name:</span> {user?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-semibold">Role:</span>{" "}
                    <span className="capitalize">{user?.role}</span>
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Suspend Reason *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter suspend reason"
                      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                                 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                                 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Feedback *
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Explain why you are suspending this user"
                      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                                 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                                 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                               bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 
                               text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSuspend}
                    className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold 
                               shadow-sm hover:bg-red-700 transition-colors"
                  >
                    Confirm Suspend
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

export default UserSuspendModal;