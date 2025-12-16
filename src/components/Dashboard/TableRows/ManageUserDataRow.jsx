import { useState } from "react";
import { MdBlock, MdDangerous, MdEdit } from "react-icons/md";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import UserSuspendModal from "../../Modal/UserSuspendModal";

const ManageUserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="border-b">
      <td className="px-5 py-4 text-left">{user.name}</td>
      <td className="px-5 py-4 text-left">{user.email}</td>
      <td className="px-5 py-4 text-left capitalize">{user.role}</td>
      <td className="px-5 py-4 text-right">
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
          >
            <span className="md:hidden">
              <MdEdit />
            </span>
            <span className="hidden md:inline md:px-2.5">Update Role</span>
          </button>

          {user.status === "suspended" ? (
            <span className="px-3 py-1 bg-red-500 rounded">
              <span className="md:hidden">
                <MdBlock />
              </span>
              <span className="hidden md:inline md:px-3">Suspended</span>
            </span>
          ) : (
            <button
              onClick={() => setIsViewOpen(true)}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 rounded hover:bg-red-700 cursor-pointer"
            >
              <span className="md:hidden">
                <MdDangerous />
              </span>
              <span className="hidden md:inline md:px-5">Suspend</span>
            </button>
          )}

          <UpdateUserRoleModal
            key={user._id}
            user={user}
            refetch={refetch}
            isOpen={isOpen}
            closeModal={closeModal}
          />

          {isViewOpen && (
            <UserSuspendModal
              user={user}
              isOpen={isViewOpen}
              closeModal={() => setIsViewOpen(false)}
              refetch={refetch}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default ManageUserDataRow;
