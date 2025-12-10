import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
// import toast from "react-hot-toast";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role);
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/users", {
        email: user?.email,
        role: updatedRole,
      });
      Swal.fire({
        position: "top-end",
        color: "white",
        icon: "success",
        title: "Role Updated!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: `${err?.response?.data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      closeModal();
    }
  };

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
              <DialogPanel className="w-full max-w-lg bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
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
                    <span className="font-semibold">Role:</span> {user?.role}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {user?.status}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(user?.created_at).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Last Logged In:</span>{" "}
                    {new Date(user?.last_loggedIn).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <span className="font-semibold">Profile Image:</span>
                    <div className="mt-1">
                      <img
                        src={user?.image}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="font-semibold">Update Role:</label>
                    <select
                      value={updatedRole}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                      className="w-full my-2 border border-gray-200 rounded-xl px-3 py-2"
                    >
                      <option value="borrower">Borrower</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={handleRoleUpdate}
                    className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-amber-200 text-white font-medium rounded-lg hover:bg-amber-300 transition-colors"
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

export default UpdateUserRoleModal;
