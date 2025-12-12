import { useState } from "react";
import { MdBlock, MdDangerous, MdEdit } from "react-icons/md";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import UserSuspendModal from "../../Modal/UserSuspendModal";

const ManageUserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="border-b ">
      <td className="px-5 text-center py-4">{user.name}</td>
      <td className="px-5 text-center py-4">{user.email}</td>
      <td className="px-5 text-center py-4 capitalize">{user.role}</td>
      <td className="px-5 py-4 text-center">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600  rounded hover:bg-blue-700"
          >
            <span className="md:hidden">
              <MdEdit />
            </span>
            <span className="hidden md:inline">Update Role</span>
          </button>

          {user.status === "suspended" ? (
            <span className="px-3 py-1 bg-red-500  rounded">
              <span className="md:hidden">
                <MdBlock />
              </span>
              <span className="hidden md:inline">Suspended</span>
            </span>
          ) : (
            <button
              onClick={() => setIsViewOpen(true)}
              className="flex items-center gap-1 px-3 py-1 bg-red-600  rounded hover:bg-red-700"
            >
              <span className="md:hidden">
                <MdDangerous />
              </span>
              <span className="hidden md:inline">Suspend</span>
            </button>
          )}

          <UpdateUserRoleModal
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
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default ManageUserDataRow;
