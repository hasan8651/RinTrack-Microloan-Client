import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const ManagerMenu = ({linkClass}) => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Add Loan" address="add-loan" linkClass={linkClass} />
      <MenuItem icon={MdHomeWork} label="Manage Loans" address="manage-loans" linkClass={linkClass} />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Pending Applications"
        address="pending-loans"
        linkClass={linkClass}
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Approved Applications"
        address="approved-loans"
        linkClass={linkClass}
      />
    </>
  );
};

export default ManagerMenu;
