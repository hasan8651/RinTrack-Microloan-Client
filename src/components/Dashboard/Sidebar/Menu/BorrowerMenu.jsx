import { BsFingerprint } from "react-icons/bs";
import MenuItem from "./MenuItem";

const BorrowerMenu = ({ linkClass }) => {
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Loans"
        address="my-loans"
        linkClass={linkClass}
      />
    </>
  );
};

export default BorrowerMenu;
