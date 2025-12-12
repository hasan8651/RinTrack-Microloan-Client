import { FaUsers, FaClipboardList, FaFileSignature } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUsers} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaClipboardList} label="All Loans" address="all-loan" />
      <MenuItem
        icon={FaFileSignature}
        label="Loan Applications"
        address="loan-applications"
      />
    </>
  );
};

export default AdminMenu;
