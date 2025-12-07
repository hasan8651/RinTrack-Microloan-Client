import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Add Loan" address="add-loan" />
      <MenuItem icon={MdHomeWork} label="Manage Loans" address="manage-loans" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Pending Applications"
        address="pending-loans"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Approved Applications"
        address="approved-loans"
      />
    </>
  );
};

export default SellerMenu;
