import { FaUsers, FaClipboardList, FaFileSignature } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = ({ linkClass }) => {
  return (
    <>
      <MenuItem icon={FaUsers} label="Manage Users" address="manage-users" linkClass={linkClass} />
      <MenuItem icon={FaClipboardList} label="All Loan" address="all-loan" linkClass={linkClass} />
      <MenuItem
        icon={FaFileSignature}
        label="Loan Applications"
        address="loan-applications"
       linkClass={linkClass}
      />
    </>
  );
};

export default AdminMenu;
