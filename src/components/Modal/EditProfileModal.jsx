import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditProfileModal = ({ isOpen, closeModal, profileInfo, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(profileInfo?.name || "");
  const [photoURL, setPhotoURL] = useState(profileInfo?.image || "");

  // Sync form fields when modal opens or profileInfo changes
  useEffect(() => {
    if (isOpen) {
      setName(profileInfo?.name || "");
      setPhotoURL(profileInfo?.image || "");
    }
  }, [isOpen, profileInfo]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!profileInfo?.email) return;

    try {
      await axiosSecure.patch(`/users/${profileInfo.email}`, {
        name,
        image: photoURL,
      });

      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch?.();
      closeModal();
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: err?.response?.data?.message || "Failed to update profile",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };

  const avatarPreview =
    photoURL ||
    profileInfo?.image ||
    "https://img.icons8.com/windows/64/user.png";

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
                           border border-gray-200 dark:border-blue-400/30 
                           shadow-2xl p-6 md:p-7 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 md:mb-5 border-b border-gray-200 dark:border-neutral-800 pb-3">
                  <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Profile
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="space-y-5">
                  {/* Avatar + Email */}
                  <div className="flex items-center gap-4">
                    <img
                      src={avatarPreview}
                      alt={name || profileInfo?.name || "User avatar"}
                      className="w-16 h-16 rounded-full object-cover border border-gray-200 dark:border-neutral-700"
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-all">
                        {profileInfo?.email}
                      </p>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                                 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  </div>

                  {/* Photo URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/your-photo.jpg"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                                 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 
                                 bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 
                                 text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg text-sm font-semibold text-white 
                                 bg-gradient-to-r from-blue-500 to-sky-600 
                                 hover:from-blue-600 hover:to-sky-700 
                                 shadow-sm shadow-blue-500/30 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;