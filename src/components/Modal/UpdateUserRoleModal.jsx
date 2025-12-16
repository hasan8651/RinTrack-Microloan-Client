import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showAlert } from "../../utils";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role || "borrower");
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/users", {
        email: user?.email,
        role: updatedRole,
      });

      showAlert({
        icon: "success",
        color: "lime",
        title: "Role updated successfully!",
      });

      refetch();
      closeModal();
    } catch (err) {
      showAlert({
        color: "pink",
        icon: "error",
        title: err?.response?.data?.message || "Failed to update role",
      });
    }
  };

  const safeDate = (value) =>
    value ? new Date(value).toLocaleString() : "N/A";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                           border border-gray-200 dark:border-blue-400/30 
                           shadow-2xl p-6 md:p-7 transition-all"
              >
                <div className="flex justify-between items-center mb-4 md:mb-5 border-b border-gray-200 dark:border-neutral-800 pb-3">
                  <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    User Details & Role Update
                  </DialogTitle>
                </div>

                <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span> {user?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-semibold">Current Role:</span>{" "}
                    <span className="capitalize">{user?.role}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="capitalize">
                      {user?.status || "active"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {safeDate(user?.created_at)}
                  </p>
                  <p>
                    <span className="font-semibold">Last Logged In:</span>{" "}
                    {safeDate(user?.last_loggedIn)}
                  </p>

                  {user?.image && (
                    <div className="mt-3">
                      <span className="font-semibold">Profile Image:</span>
                      <div className="mt-2">
                        <img
                          src={user?.image}
                          alt={user?.name}
                          className="w-24 h-24 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Update Role
                    </label>
                    <select
                      value={updatedRole}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                                 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    >
                      <option value="borrower">Borrower</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                               bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 
                               text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleRoleUpdate}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-sky-600 
                               text-white text-sm font-semibold shadow-sm 
                               hover:from-blue-600 hover:to-sky-700 transition-colors cursor-pointer"
                  >
                    Update Role
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

export default UpdateUserRoleModal;
